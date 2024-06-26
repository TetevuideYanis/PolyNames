import controllers.GameController;
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

        webserver.getRouter().get(
        "/getInstance/:code",
            (WebServerContext context) -> { InstanceController.getInstance(context); }
        );

        webserver.getRouter().post(
        "/changeRoles/:code",
            (WebServerContext context) -> { InstanceController.changeRoles(context); }
        );

        webserver.getRouter().get(
        "/createGame/:code",
            (WebServerContext context) -> { GameController.createGame(context); }
        );

        webserver.getRouter().get(
        "/gameChanged/:idGame",
            (WebServerContext context) -> { GameController.gameChanged(context); }
        );

        webserver.getRouter().post(
        "/changeTurnOperateur/:idGame/:hint/:nombreCarte",
            (WebServerContext context) -> { GameController.changeTurnOperateur(context); }
        );

        webserver.getRouter().post(
        "/changeTurnEspion/:idGame/:score",
            (WebServerContext context) -> { GameController.changeTurnEspion(context); }
        );

        webserver.getRouter().post(
        "/turnCard/:idGame/:cardValue",
            (WebServerContext context) -> { GameController.turnCard(context); }
        );

        webserver.getRouter().post(
        "/endGame/:code",
            (WebServerContext context) -> { GameController.endGame(context); }
        );
    }
}
