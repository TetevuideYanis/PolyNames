import java.util.ArrayList;

import dao.CardDAO;
import models.Card;

public class App {
    public static void main(String[] args) throws Exception {
        CardDAO cardDAO = new CardDAO();
        ArrayList<Card> cards = cardDAO.findAll();
        for (Card card : cards) {
            System.out.println(card.idCard() + " " + card.value());
        }
    }
}
