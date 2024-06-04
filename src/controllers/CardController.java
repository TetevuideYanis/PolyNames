package controllers;

import java.util.ArrayList;

import dao.CardDAO;
import models.Card;
import webserver.WebServerContext;

public class CardController {
    
    public static ArrayList<Card> findAll(WebServerContext context){
        CardDAO cardDAO = new CardDAO();
        ArrayList<Card> cards = cardDAO.findAll();
        context.getResponse().json(cards);
        return cards;
    }
}
