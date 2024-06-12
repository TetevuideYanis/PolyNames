package dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import database.PolyNamesDatabase;

public class InstanceDAO {
    
    public boolean createInstance(String code){
        PolyNamesDatabase db = null;
        boolean result = false;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("INSERT INTO Instance (code) VALUES (?);");
            ps.setString(1, code);
            result = ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    public boolean getInstance(String code){
        PolyNamesDatabase db = null;
        boolean result = false;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM instance WHERE code = ?;");
            ps.setString(1, code);
            result = ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    public boolean createInitialize(String code, int idGame){
        PolyNamesDatabase db = null;
        boolean result = false;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("INSERT INTO Initialize VALUES (?, ?);");
            ps.setInt(2, idGame);
            ps.setString(1, code);
            result = ps.execute();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }
}
