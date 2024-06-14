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


    /**
     * Créer des decks de cards associé à un id de game
     * @param idGame L'id de la game à la quelle les decks appartiendront
     */
    public static void createDeck(int idGame){
        ArrayList<Card> cards = new ArrayList<Card>();
        cards = CardController.pickRandomCards();
        //On tire 10 cartes pour lesquelles les couleurs seront différentes
        List<Integer> colors = DeckController.colors();
        int n = 0;
        DeckDAO deckDAO = new DeckDAO();
        //On prend 25 cartes
        for(int i = 1; i < 26; i++) {
            String color;
            //si la carte est dans la liste alors elle est bleue
            if(colors.contains(i) && n < 8){
                color = "#3498DB";
                n+=1;
            } 
            //si elle fait partie des deux dernières alors elle est noire
            else if(colors.contains(i) && n < 10){
                color = "#17202A";
                n+=1;
            }
            //sinon couleur par défaut
            else{
                color = "#FAD7A0";
            }
            try {
                deckDAO.createDeck(idGame, cards.get(i-1).idCard(), color);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * fonction qui retourne 10 nombres aléatoire
     * @return Une liste de 10 Integer
     */
    public static List<Integer> colors() {
        Random random = new Random();
        Set<Integer> uniqueNumbers = new HashSet<>();
        while (uniqueNumbers.size() < 10) {
            int randomNumber = 1 + random.nextInt(25); 
            uniqueNumbers.add(randomNumber); 
        }
        List<Integer> numbers = new ArrayList<>(uniqueNumbers);
        return numbers;
    }


    /**
     * Retourne un tableau de deck correspondant a l'id
     * @param idGame L'id des decks
     * @return Le tableau de deck
     */
    public static ArrayList<Deck> getDeckByIdGame(int idGame){
        DeckDAO deckDAO = new DeckDAO();
        ArrayList<Deck> decks = new ArrayList<>();
        decks = deckDAO.getDeckByIdGame(idGame);
        return decks;
    }
}
