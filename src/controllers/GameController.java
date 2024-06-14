package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import dao.GameDAO;
import models.Game;
import webserver.WebServerContext;

public class GameController {
    
    /**
     * Créer une game
     * @param context Le context
     */
    public static void createGame(WebServerContext context){
        try {
            String code = context.getRequest().getParam("code");
            GameDAO gameDAO = new GameDAO();
            gameDAO.createGame();
            int idGame = gameDAO.getLastGame();
            InstanceController.createInitialize(code, idGame);
            DeckController.createDeck(idGame);
            Game game = gameDAO.findGameByIdGame(idGame);
            final GsonBuilder builder = new GsonBuilder();
            final Gson gson = builder.create();
            //retourne la game en json
            context.getSSE().emit("gameCharged" + code, gson.toJson(game));
            context.getResponse().json(idGame);
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        } 
    }

    /**
     * Notifie les changement de la game
     * @param context Le context
     */
    public static void gameChanged(WebServerContext context){
        try {
            int idGame = Integer.parseInt(context.getRequest().getParam("idGame"));
            GameDAO gameDAO = new GameDAO();
            Game game = gameDAO.findGameByIdGame(idGame);
            final GsonBuilder builder = new GsonBuilder();
            final Gson gson = builder.create();
            //retourne la game en json
            context.getSSE().emit("gameChanged" + idGame, gson.toJson(game));
            context.getResponse().json(idGame);
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        } 
    }

    /**
     * Change les paramètres liés à l'opérateur
     * @param context Le context
     */
    public static void changeTurnOperateur(WebServerContext context){
        try {
            int idGame = Integer.parseInt(context.getRequest().getParam("idGame"));
            String hint = context.getRequest().getParam("hint");
            int nombreCarte = Integer.parseInt(context.getRequest().getParam("nombreCarte"));
            String json = "{\"hint\":\""+hint+"\",\n\"nombreCarte\":"+nombreCarte+"}";
            //retourne l'indice et le nombre de mots en json
            context.getSSE().emit("turn" + idGame, json);
            context.getResponse().ok("Changement de tour");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        } 
    }

    /**
     * Notifie la fin de la game
     * @param context Le context
     */
    public static void endGame(WebServerContext context){
        try {
            String code = context.getRequest().getParam("code");
            context.getSSE().emit("endGame" + code, "");
            context.getResponse().ok("Partie finie");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        } 
    }

    /**
     * Change les paramètres liés à l'espion
     * @param context Le context
     */
    public static void changeTurnEspion(WebServerContext context){
        try {
            int idGame = Integer.parseInt(context.getRequest().getParam("idGame"));
            int score = Integer.parseInt(context.getRequest().getParam("score"));
            GameDAO gameDAO = new GameDAO();
            gameDAO.updateScore(idGame, score);
            //met le score à jour
            context.getSSE().emit("turn" + idGame, "");
            context.getResponse().ok("Changement de tour");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        } 
    }

    /**
     * Change le statu de la card
     * @param context Le context
     */
    public static void turnCard(WebServerContext context){
        try {
            int idGame = Integer.parseInt(context.getRequest().getParam("idGame"));
            String cardvalue = context.getRequest().getParam("cardValue");
            GameDAO gameDAO = new GameDAO();
            gameDAO.updateDeck(idGame, cardvalue);
            Game game = gameDAO.findGameByIdGame(idGame);
            final GsonBuilder builder = new GsonBuilder();
            final Gson gson = builder.create();
            //Retourne la game modifiée
            context.getSSE().emit("gameChanged" + idGame, gson.toJson(game));
            context.getResponse().ok("Carte retournée");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        } 
    }
}
