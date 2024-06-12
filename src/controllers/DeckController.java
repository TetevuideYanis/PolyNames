package controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import dao.DeckDAO;
import models.Card;
import models.Deck;

public class DeckController {
    public static void createDeck(int idGame){
        ArrayList<Card> cards = new ArrayList<Card>();
        cards = CardController.pickRandomCards();
        List<Integer> colors = DeckController.colors();
        int n = 0;
        DeckDAO deckDAO = new DeckDAO();
        for(int i = 1; i < 26; i++) {
            String color;
            if(colors.contains(i) && n < 8){
                color = "#0000ff";
                n+=1;
            } 
            else if(colors.contains(i) && n == 8){
                color = "#000000";
                n+=1;
            }
            else{
                color = "#ffffff";
            }
            try {
                deckDAO.createDeck(idGame, cards.get(i-1).idCard(), color);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static List<Integer> colors() {
        Random random = new Random();
        Set<Integer> uniqueNumbers = new HashSet<>();
        while (uniqueNumbers.size() < 9) {
            int randomNumber = 1 + random.nextInt(25); 
            uniqueNumbers.add(randomNumber); 
        }
        List<Integer> numbers = new ArrayList<>(uniqueNumbers);
        return numbers;
    }

    public static ArrayList<Deck> getDeckByIdGame(int idGame){
        DeckDAO deckDAO = new DeckDAO();
        ArrayList<Deck> decks = new ArrayList<>();
        decks = deckDAO.getDeckByIdGame(idGame);
        return decks;
    }
}
