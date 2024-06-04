package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import database.PolyNamesDatabase;
import models.Card;

public class CardDAO {

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
}
