import controllers.CardController;
import controllers.InstanceController;
import webserver.WebServer;
import webserver.WebServerContext;

public class App {
    public static void main(String[] args) throws Exception {
        //Utilisation de WebServer
        WebServer webserver = new WebServer();
        webserver.listen(8080);

        //Créer une route GET
        webserver.getRouter().get(
        "/createInstance",
        (WebServerContext context) -> { InstanceController.createInstance(context); }
        );

    }
}
