package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import database.PolyNamesDatabase;
import models.Deck;

public class DeckDAO {
    
    public ArrayList<Deck> getDeckByIdGame(int idGame){
        ArrayList<Deck> decks = new ArrayList<Deck>();
        PolyNamesDatabase db = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM deck WHERE idGame = ?;");
            ps.setInt(1, idGame);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                decks.add(new Deck(rs.getInt("idGame"), rs.getInt("idCard"), rs.getBoolean("revealed"), rs.getString("color")));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return decks;
    }
}
