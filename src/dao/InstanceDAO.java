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
            instance = new Instance(rs.getString("code"));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return instance;
    }

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
}
