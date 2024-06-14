package controllers;

import java.util.ArrayList;

import dao.CardDAO;
import models.Card;

public class CardController {
    /**
     * Initialise un tableau de cards qui viennent de la bdd
     * @return Un tableau de cards
     */
    public static ArrayList<Card> pickRandomCards(){
        CardDAO cardDAO = new CardDAO();
        ArrayList<Card> cards = new ArrayList<Card>();
        cards = cardDAO.pickRandomCards();
        return cards;
    }


    /**
     * Cherche une card dans la bdd avec l'id donnée en paramètre
     * @param idCard La card à trouver
     * @return La card trouvée
     */
    public static Card getCardById(int idCard){
        CardDAO cardDAO = new CardDAO();
        Card card = cardDAO.getCardById(idCard);
        return card;
    }
}
