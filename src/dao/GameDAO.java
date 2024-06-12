package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import controllers.DeckController;
import database.PolyNamesDatabase;
import models.Game;

public class GameDAO {
    
    public Game findGameByIdGame(int idGame){
        Game game = null;
        PolyNamesDatabase db = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM game WHERE idGame = ?;");
            ps.setInt(1, idGame);
            ResultSet rs = ps.executeQuery();
            rs.next();
            game = new Game(rs.getInt("idGame"), rs.getInt("score"), rs.getString("turn"), DeckController.getDeckByIdGame(idGame));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return game;
    }

    public boolean createGame(){
        PolyNamesDatabase db = null;
        boolean result = false;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("INSERT INTO Game (score, turn) VALUES (?, ?);");
            ps.setInt(1, 0);
            ps.setString(2, "operateur");
            result = ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    public int getLastGame(){
        PolyNamesDatabase db = null;
        ResultSet rs;
        int result = 0;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT idGame FROM Game ORDER BY idGame DESC LIMIT 1;");
            rs = ps.executeQuery();
            if(rs.next()) result = rs.getInt(1);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }
}
