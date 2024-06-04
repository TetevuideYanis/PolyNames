package database;

import java.sql.SQLException;

public class PolyNamesDatabase extends MySQLDatabase{

    public PolyNamesDatabase()
            throws SQLException {
        super("localhost", 3306, "poly_names", "root", "");
    }    
}
