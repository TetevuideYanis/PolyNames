package controllers;

import java.util.ArrayList;

import dao.CardDAO;
import models.Card;

public class CardController {
    public static ArrayList<Card> pickRandomCards(){
        CardDAO cardDAO = new CardDAO();
        ArrayList<Card> cards = new ArrayList<Card>();
        cards = cardDAO.pickRandomCards();
        return cards;
    }

    public static Card getCardById(int idCard){
        CardDAO cardDAO = new CardDAO();
        Card card = cardDAO.getCardById(idCard);
        return card;
    }
}
