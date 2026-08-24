package obs.rpkg;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.concurrent.*;

final class WindowsNotifier {
    private static final ScheduledExecutorService CLEANUP=Executors.newSingleThreadScheduledExecutor(r->{Thread t=new Thread(r,"obs-rpkg-notification-cleanup");t.setDaemon(true);return t;});
    private WindowsNotifier(){}

    static boolean available(){return SystemTray.isSupported();}

    static void show(String title,String message,boolean failure,Runnable onClick){
        if(!SystemTray.isSupported())return;
        EventQueue.invokeLater(()->{
            TrayIcon icon=null;
            try{
                SystemTray tray=SystemTray.getSystemTray();icon=new TrayIcon(image(),"Replacement Package App");icon.setImageAutoSize(true);
                TrayIcon active=icon;if(onClick!=null)icon.addActionListener(e->{try{onClick.run();}finally{tray.remove(active);}});
                tray.add(icon);icon.displayMessage(title,message==null?"":message,failure?TrayIcon.MessageType.ERROR:TrayIcon.MessageType.INFO);
                CLEANUP.schedule(()->EventQueue.invokeLater(()->tray.remove(active)),120,TimeUnit.SECONDS);
            }catch(Throwable ignored){if(icon!=null)try{SystemTray.getSystemTray().remove(icon);}catch(Throwable ignored2){}}
        });
    }

    private static Image image(){BufferedImage image=new BufferedImage(16,16,BufferedImage.TYPE_INT_ARGB);Graphics2D g=image.createGraphics();try{g.fillOval(1,1,14,14);g.setColor(Color.WHITE);g.drawString("O",4,12);}finally{g.dispose();}return image;}
}
