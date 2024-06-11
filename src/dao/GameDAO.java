package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import database.PolyNamesDatabase;
import models.Game;

public class GameDAO {
    
    public Game findGameByIdGame(int idGame){
        Game game = null;
        PolyNamesDatabase db = null;
        DeckDAO deckDAO = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM game WHERE idGame = ?;");
            ps.setInt(1, idGame);
            ResultSet rs = ps.executeQuery();
            rs.next();
            deckDAO = new DeckDAO();
            game = new Game(rs.getInt("idGame"), rs.getInt("score"), rs.getString("turn"), deckDAO.getDeckByIdGame(idGame));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return game;
    }
}
