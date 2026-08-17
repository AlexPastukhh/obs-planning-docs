package obs.rpkg;

import java.util.*;

final class Json {
    private Json() {}

    static Object parse(String text) {
        Parser p = new Parser(text);
        Object value = p.value();
        p.ws();
        if (!p.end()) throw new IllegalArgumentException("Trailing JSON content at " + p.i);
        return value;
    }

    @SuppressWarnings("unchecked")
    static Map<String,Object> object(String text) {
        Object v = parse(text);
        if (!(v instanceof Map<?,?>)) throw new IllegalArgumentException("Expected JSON object");
        return (Map<String,Object>) v;
    }

    static String stringify(Object value) {
        StringBuilder b = new StringBuilder();
        write(b, value, 0);
        return b.toString();
    }

    private static void write(StringBuilder b, Object v, int depth) {
        if (v == null) { b.append("null"); return; }
        if (v instanceof String s) { string(b, s); return; }
        if (v instanceof Boolean || v instanceof Number) { b.append(v); return; }
        if (v instanceof Map<?,?> m) {
            b.append("{\n");
            int n = 0;
            for (Map.Entry<?,?> e : m.entrySet()) {
                if (n++ > 0) b.append(",\n");
                indent(b, depth + 1); string(b, String.valueOf(e.getKey())); b.append(": "); write(b, e.getValue(), depth + 1);
            }
            b.append('\n'); indent(b, depth); b.append('}'); return;
        }
        if (v instanceof Iterable<?> it) {
            b.append("[");
            int n = 0;
            for (Object x : it) { if (n++ > 0) b.append(", "); write(b, x, depth + 1); }
            b.append(']'); return;
        }
        throw new IllegalArgumentException("Unsupported JSON value: " + v.getClass());
    }

    private static void indent(StringBuilder b, int n) { b.append("  ".repeat(Math.max(0, n))); }
    private static void string(StringBuilder b, String s) {
        b.append('"');
        for (int i=0;i<s.length();i++) {
            char c=s.charAt(i);
            switch (c) {
                case '"' -> b.append("\\\"");
                case '\\' -> b.append("\\\\");
                case '\b' -> b.append("\\b");
                case '\f' -> b.append("\\f");
                case '\n' -> b.append("\\n");
                case '\r' -> b.append("\\r");
                case '\t' -> b.append("\\t");
                default -> { if (c < 0x20) b.append(String.format("\\u%04x", (int)c)); else b.append(c); }
            }
        }
        b.append('"');
    }

    private static final class Parser {
        final String s; int i;
        Parser(String s) { this.s=Objects.requireNonNull(s); }
        boolean end(){ return i>=s.length(); }
        void ws(){ while(!end() && Character.isWhitespace(s.charAt(i))) i++; }
        Object value(){
            ws(); if(end()) throw err("Unexpected end");
            char c=s.charAt(i);
            return switch(c){
                case '{' -> object();
                case '[' -> array();
                case '"' -> string();
                case 't' -> literal("true", Boolean.TRUE);
                case 'f' -> literal("false", Boolean.FALSE);
                case 'n' -> literal("null", null);
                default -> { if(c=='-' || Character.isDigit(c)) yield number(); throw err("Unexpected character " + c); }
            };
        }
        Map<String,Object> object(){
            expect('{'); ws(); Map<String,Object> m=new LinkedHashMap<>();
            if(peek('}')) { i++; return m; }
            while(true){
                ws(); if(!peek('"')) throw err("Expected object key"); String k=string();
                ws(); expect(':'); Object v=value();
                if(m.putIfAbsent(k,v)!=null) throw err("Duplicate object key: "+k);
                ws(); if(peek('}')){i++;return m;} expect(',');
            }
        }
        List<Object> array(){
            expect('['); ws(); List<Object> a=new ArrayList<>();
            if(peek(']')){i++;return a;}
            while(true){ a.add(value()); ws(); if(peek(']')){i++;return a;} expect(','); }
        }
        String string(){
            expect('"'); StringBuilder b=new StringBuilder();
            while(!end()){
                char c=s.charAt(i++); if(c=='"') return b.toString();
                if(c!='\\'){ if(c<0x20) throw err("Control in string"); b.append(c); continue; }
                if(end()) throw err("Bad escape"); char e=s.charAt(i++);
                switch(e){
                    case '"','\\','/' -> b.append(e);
                    case 'b' -> b.append('\b'); case 'f' -> b.append('\f'); case 'n' -> b.append('\n'); case 'r' -> b.append('\r'); case 't' -> b.append('\t');
                    case 'u' -> { if(i+4>s.length()) throw err("Bad unicode escape"); b.append((char)Integer.parseInt(s.substring(i,i+4),16)); i+=4; }
                    default -> throw err("Bad escape: "+e);
                }
            }
            throw err("Unterminated string");
        }
        Object number(){
            int start=i; if(peek('-'))i++; while(!end()&&Character.isDigit(s.charAt(i)))i++;
            boolean decimal=false;
            if(!end()&&s.charAt(i)=='.'){decimal=true;i++;while(!end()&&Character.isDigit(s.charAt(i)))i++;}
            if(!end()&&(s.charAt(i)=='e'||s.charAt(i)=='E')){decimal=true;i++;if(!end()&&(s.charAt(i)=='+'||s.charAt(i)=='-'))i++;while(!end()&&Character.isDigit(s.charAt(i)))i++;}
            String n=s.substring(start,i); return decimal?Double.parseDouble(n):Long.parseLong(n);
        }
        Object literal(String word,Object value){ if(!s.startsWith(word,i))throw err("Expected "+word);i+=word.length();return value; }
        boolean peek(char c){ return !end()&&s.charAt(i)==c; }
        void expect(char c){ ws(); if(end()||s.charAt(i)!=c)throw err("Expected "+c);i++; }
        IllegalArgumentException err(String m){ return new IllegalArgumentException(m+" at "+i); }
    }
}
