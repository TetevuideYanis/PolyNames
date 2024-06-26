package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import controllers.CardController;
import database.PolyNamesDatabase;
import models.Deck;

public class DeckDAO {
    
    /**
     * Retourne les decks associés à l'id de game
     * @param idGame l'id de la game
     * @return Un arraylist de deck
     */
    public ArrayList<Deck> getDeckByIdGame(int idGame){
        ArrayList<Deck> decks = new ArrayList<Deck>();
        PolyNamesDatabase db = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM deck WHERE idGame = ?;");
            ps.setInt(1, idGame);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                decks.add(new Deck(rs.getInt("idGame"), CardController.getCardById(rs.getInt("idCard")), rs.getBoolean("revealed"), rs.getString("color")));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return decks;
    }

    /**
     * Créer un deck avec les paramètres donnés
     * @param idGame l'id de la game
     * @param idCard l'id de la card
     * @param color la couleur de la card
     * @return un booleen
     */
    public boolean createDeck(int idGame, int idCard, String color){
        PolyNamesDatabase db = null;
        boolean result = false;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("INSERT INTO Deck VALUES (?, ?, ?, ?);");
            ps.setInt(1, idGame);
            ps.setInt(2, idCard);
            ps.setInt(3, 0);
            ps.setString(4, color);
            result = ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }
}
