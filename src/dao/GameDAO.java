package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import controllers.DeckController;
import database.PolyNamesDatabase;
import models.Game;

public class GameDAO {

    /**
     * Retourne la game associé à l'id de la game
     * @param idGame l'id de la game
     * @return Une game
     */
    public Game findGameByIdGame(int idGame){
        Game game = null;
        PolyNamesDatabase db = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM game WHERE idGame = ?;");
            ps.setInt(1, idGame);
            ResultSet rs = ps.executeQuery();
            rs.next();
            game = new Game(rs.getInt("idGame"), rs.getInt("score"), DeckController.getDeckByIdGame(idGame));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return game;
    }


    /**
     * Retourne un booleen après avoir créé une game
     * @return un booléen
     */
    public boolean createGame(){
        PolyNamesDatabase db = null;
        boolean result = false;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("INSERT INTO Game (score) VALUES (?);");
            ps.setInt(1, 0);
            result = ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }


    /**
     * Retourne la dernière game entrée en bdd
     * @return Un int l'id de la game
     */
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


    /**
     * Met à jour le deck associé à l'id en paramètre avec la valeur donnée en paramètre 
     * @param idGame l'id de la game
     * @param cardValue la valeur de la card qui doit etre modifée
     * @return un booleen de réussite
     */
    public boolean updateDeck(int idGame, String cardValue){
        PolyNamesDatabase db = null;
        boolean result = false;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("UPDATE Deck NATURAL JOIN Card SET revealed = true WHERE value = ? AND idGame = ?;");
            ps.setString(1, cardValue);
            ps.setInt(2, idGame);
            result = ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    /**
     * Met à jour le score associé à l'id en paramètre avec la valeur donnée en paramètre 
     * @param idGame l'id de la game
     * @param score la valeur du score
     * @return un booleen de réussite
     */
    public boolean updateScore(int idGame, int score){
        PolyNamesDatabase db = null;
        boolean result = false;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("UPDATE Game SET score = score + ? WHERE idGame = ?;");
            ps.setInt(1, score);
            ps.setInt(2, idGame);
            result = ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }
}
