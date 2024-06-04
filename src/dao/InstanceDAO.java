package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import database.PolyNamesDatabase;
import models.Instance;

public class InstanceDAO {
    
    public Instance findInstanceByCode(int code){
        Instance instance = null;
        PolyNamesDatabase db = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM instance WHERE code = ?;");
            ps.setInt(1, code);
            ResultSet rs = ps.executeQuery();
            rs.next();
            instance = new Instance(rs.getString("code"), rs.getString("player1"), rs.getString("player2"));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return instance;
    }
}
