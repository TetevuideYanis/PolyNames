package models;

import java.util.ArrayList;

public record Game(
    int idGame,
    String spymaster,
    String operative,
    int score,
    ArrayList<Deck> deck
) {}
