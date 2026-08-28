package obs.rpkg;

import com.sun.net.httpserver.*;
import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.*;
import java.util.concurrent.*;

final class ChatBridgeServer implements AutoCloseable {
    private final ChatBridgeService service;
    private final HttpServer server;

    private ChatBridgeServer(ChatBridgeService service,HttpServer server){this.service=service;this.server=server;}
    static ChatBridgeServer start(ChatBridgeService service)throws IOException{HttpServer server=HttpServer.create(new InetSocketAddress("127.0.0.1",ChatBridgeService.PORT),0);ChatBridgeServer out=new ChatBridgeServer(service,server);server.createContext("/v1/",out::handle);server.setExecutor(Executors.newCachedThreadPool(r->{Thread t=new Thread(r,"obs-chat-bridge-http");t.setDaemon(true);return t;}));server.start();return out;}

    private void handle(HttpExchange x)throws IOException{
        try{
            String path=x.getRequestURI().getPath();
            if("OPTIONS".equalsIgnoreCase(x.getRequestMethod())){cors(x);send(x,204,new byte[0],"text/plain");return;}
            if(path.equals("/v1/health")){auth(x);sendJson(x,200,Map.of("ok",true,"port",ChatBridgeService.PORT,"bridgeProtocolVersion",ChatBridgeService.BRIDGE_PROTOCOL_VERSION));return;}
            if(path.equals("/v1/inventory")&&"POST".equalsIgnoreCase(x.getRequestMethod())){auth(x);Map<String,Object> body=objectBody(x);requireBridgeProtocol(body);List<Map<String,Object>> convs=new ArrayList<>();Object raw=body.get("conversations");if(raw instanceof List<?> l)for(Object item:l)if(item instanceof Map<?,?> m)convs.add(cast(m));service.replaceInventory(convs);sendJson(x,200,Map.of("ok",true));return;}
            if(path.equals("/v1/tasks/claim")&&"POST".equalsIgnoreCase(x.getRequestMethod())){auth(x);Map<String,Object> body=objectBody(x);requireBridgeProtocol(body);String key=Core.str(body.get("conversationKey"));int tab=num(body.get("tabId"));Map<String,Object> task=service.claim(key,tab);Map<String,Object> response=new LinkedHashMap<>();response.put("task",task.isEmpty()?null:task);sendJson(x,200,response);return;}
            if(path.equals("/v1/tabs/release")&&"POST".equalsIgnoreCase(x.getRequestMethod())){auth(x);Map<String,Object> body=objectBody(x);service.releaseTab(num(body.get("tabId")),Core.str(body.get("message")));sendJson(x,200,Map.of("ok",true));return;}
            if(path.startsWith("/v1/tasks/")){handleTask(x,path);return;}
            sendJson(x,404,Map.of("error","not_found"));
        }catch(Core.ObsException e){sendJson(x,409,Map.of("error",e.code,"message",e.getMessage()));}catch(SecurityException e){sendJson(x,403,Map.of("error","forbidden"));}catch(Exception e){sendJson(x,500,Map.of("error","internal","message",e.getMessage()==null?e.toString():e.getMessage()));}
    }

    private void handleTask(HttpExchange x,String path)throws IOException{
        String rest=path.substring("/v1/tasks/".length());int slash=rest.indexOf('/');if(slash<=0){sendJson(x,404,Map.of("error","not_found"));return;}String id=rest.substring(0,slash),action=rest.substring(slash+1);
        if(action.equals("payload")&&"GET".equalsIgnoreCase(x.getRequestMethod())){String ticket=query(x.getRequestURI().getRawQuery(),"ticket");ChatBridgeService.PayloadSource source=service.verifiedPayloadSource(id,ticket);cors(x);x.getResponseHeaders().set("Content-Disposition","attachment; filename=\""+source.fileName().replaceAll("[\r\n\"]","")+"\"");x.getResponseHeaders().set("X-OBS-Artifact-SHA256",source.sha256());x.getResponseHeaders().set("Cache-Control","no-store");x.getResponseHeaders().set("Content-Type",source.contentType());x.sendResponseHeaders(200,source.size());try(InputStream in=Files.newInputStream(source.path());OutputStream out=x.getResponseBody()){in.transferTo(out);}return;}
        auth(x);Map<String,Object> body=objectBody(x);int tab=num(body.get("tabId"));String conversationKey=Core.str(body.get("conversationKey"));
        if(action.equals("heartbeat")&&"POST".equalsIgnoreCase(x.getRequestMethod())){String status=service.heartbeat(id,tab,conversationKey);sendJson(x,200,Map.of("ok",true,"status",status));return;}
        if(action.equals("release")&&"POST".equalsIgnoreCase(x.getRequestMethod())){String status=service.release(id,tab,conversationKey,Core.str(body.get("message")));sendJson(x,200,Map.of("ok",true,"status",status));return;}
        if(action.equals("stage")&&"POST".equalsIgnoreCase(x.getRequestMethod())){String stage=Core.str(body.get("stage"));if("Preparing".equals(stage))service.stagePreparing(id,tab,conversationKey);else if("SendArmed".equals(stage))service.stageSendArmed(id,tab,conversationKey);else if("SendNotClicked".equals(stage))service.stageSendNotClicked(id,tab,conversationKey);else if("SendClicked".equals(stage))service.stageSendClicked(id,tab,conversationKey);else throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"Unsupported task stage.");sendJson(x,200,Map.of("ok",true));return;}
        if(action.equals("result")&&"POST".equalsIgnoreCase(x.getRequestMethod())){service.result(id,tab,conversationKey,Core.str(body.get("status")),Core.str(body.get("message")));sendJson(x,200,Map.of("ok",true));return;}
        sendJson(x,404,Map.of("error","not_found"));
    }

    private void auth(HttpExchange x){String got=x.getRequestHeaders().getFirst("X-OBS-Bridge-Token");if(got==null||!constantTime(got,service.pairingToken()))throw new SecurityException("Invalid pairing token");}
    private static void requireBridgeProtocol(Map<String,Object> body){Object raw=body.get("bridgeProtocolVersion");int got=raw instanceof Number n?n.intValue():-1;if(got!=ChatBridgeService.BRIDGE_PROTOCOL_VERSION)throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"ChatGPT Bridge protocol mismatch. Extension protocol "+ChatBridgeService.BRIDGE_PROTOCOL_VERSION+" is required; update/reload the extension and restart the app if needed.");}
    private static boolean constantTime(String a,String b){if(a.length()!=b.length())return false;int d=0;for(int i=0;i<a.length();i++)d|=a.charAt(i)^b.charAt(i);return d==0;}
    private static void cors(HttpExchange x){String origin=x.getRequestHeaders().getFirst("Origin");if("https://chatgpt.com".equals(origin))x.getResponseHeaders().set("Access-Control-Allow-Origin",origin);x.getResponseHeaders().set("Vary","Origin");x.getResponseHeaders().set("Access-Control-Allow-Methods","GET,POST,OPTIONS");x.getResponseHeaders().set("Access-Control-Allow-Headers","Content-Type,X-OBS-Bridge-Token");x.getResponseHeaders().set("Access-Control-Allow-Private-Network","true");}
    private static Map<String,Object> objectBody(HttpExchange x)throws IOException{byte[] b=readLimited(x.getRequestBody(),1_048_576);Object v=Json.parse(new String(b,StandardCharsets.UTF_8));if(!(v instanceof Map<?,?> m))throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"Bridge request body must be JSON object.");return cast(m);}
    @SuppressWarnings("unchecked") private static Map<String,Object> cast(Map<?,?> m){return(Map<String,Object>)m;}
    private static int num(Object o){if(o instanceof Number n)return n.intValue();throw new Core.ObsException(Core.CHAT_BRIDGE_FAILED,"tabId is required.");}
    private static byte[] readLimited(InputStream in,int max)throws IOException{ByteArrayOutputStream out=new ByteArrayOutputStream();byte[] buf=new byte[8192];for(int n;(n=in.read(buf))>=0;){if(n==0)continue;if(out.size()+n>max)throw new IOException("request too large");out.write(buf,0,n);}return out.toByteArray();}
    private static String query(String raw,String key){if(raw==null)return null;for(String part:raw.split("&")){int eq=part.indexOf('=');String k=eq<0?part:part.substring(0,eq),v=eq<0?"":part.substring(eq+1);if(URLDecoder.decode(k,StandardCharsets.UTF_8).equals(key))return URLDecoder.decode(v,StandardCharsets.UTF_8);}return null;}
    private static void sendJson(HttpExchange x,int status,Map<String,Object> m)throws IOException{cors(x);send(x,status,(Json.stringify(m)+"\n").getBytes(StandardCharsets.UTF_8),"application/json; charset=utf-8");}
    private static void send(HttpExchange x,int status,byte[] body,String contentType)throws IOException{x.getResponseHeaders().set("Content-Type",contentType);x.getResponseHeaders().set("Cache-Control","no-store");x.sendResponseHeaders(status,body.length);try(OutputStream o=x.getResponseBody()){if(body.length>0)o.write(body);}}
    @Override public void close(){server.stop(0);}
}
