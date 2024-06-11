package models;

import java.util.ArrayList;

public record Game(
    int idGame,
    int score,
    String turn,
    ArrayList<Deck> deck
) {}
