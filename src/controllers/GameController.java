package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import dao.GameDAO;
import models.Game;
import webserver.WebServerContext;

public class GameController {
    
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
            context.getSSE().emit("gameChanged" + code, gson.toJson(game));
            context.getResponse().json(idGame);
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        } 
    }

    public static void changeTurn(WebServerContext context){
        try {
            int idGame = Integer.parseInt(context.getRequest().getParam("idGame"));
            String hint = context.getRequest().extractBody(String.class);
            context.getSSE().emit("turn" + idGame, hint);
            context.getResponse().ok("Changement de tour");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        } 
    }
}
