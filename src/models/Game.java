package models;

public record Game(
    int idGame,
    String redSpymaster,
    String redOperative,
    int	redScore,
    String blueSpymaster,
    String blueOperative,
    int blueScore	
) {}
