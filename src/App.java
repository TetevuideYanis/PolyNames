import controllers.CardController;
import webserver.WebServer;
import webserver.WebServerContext;

public class App {
    public static void main(String[] args) throws Exception {
        //Utilisation de WebServer
        WebServer webserver = new WebServer();
        webserver.listen(8080);

        //Créer une route GET
        webserver.getRouter().get(
        "/cardController",
        (WebServerContext context) -> { CardController.findAll(context); }
        );

    }
}
