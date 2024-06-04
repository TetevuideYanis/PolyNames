package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import database.PolyNamesDatabase;
import models.Initialize;

public class InitializeDAO {
    
    public Initialize findInitializeByCode(int code){
        Initialize initialize = null;
        PolyNamesDatabase db = null;
        try {
            db = new PolyNamesDatabase();
            PreparedStatement ps = db.prepareStatement("SELECT * FROM initialize WHERE code = ?;");
            ps.setInt(1, code);
            ResultSet rs = ps.executeQuery();
            rs.next();
            initialize = new Initialize(rs.getString("code"), rs.getInt("idGame"));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return initialize;
    }
}
