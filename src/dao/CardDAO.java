package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import database.PolyNamesDatabase;
import models.Card;

public class CardDAO {

    /**
     * Retourne toutes les card de la bdd
     * @return Un arraylist de carx
     */
    public ArrayList<Card> findAll(){
        ArrayList<Card> cards = new ArrayList<Card>();
        PolyNamesDatabase db = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM card;");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                cards.add(new Card(rs.getInt("idCard"), rs.getString("value")));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return cards;
    }


    /**
     * Retourne 25 card aléatoires
     * @return Un arraylist de card
     */
    public ArrayList<Card> pickRandomCards(){
        ArrayList<Card> cards = new ArrayList<Card>();
        PolyNamesDatabase db = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM Card ORDER BY RAND() LIMIT 25;");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                cards.add(new Card(rs.getInt("idCard"), rs.getString("value")));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return cards;
    }


    /**
     * Retourne une card avec son id
     * @param idCard l'id de la card
     * @return Une card
     */
    public Card getCardById(int idCard){
        Card card = null;
        PolyNamesDatabase db = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM card WHERE idCard = ?;");
            ps.setInt(1, idCard);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                card = new Card(rs.getInt("idCard"), rs.getString("value"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return card;
    }
}
