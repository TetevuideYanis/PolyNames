package models;

import java.util.ArrayList;

public record Game(
    int idGame,
    int score,
    ArrayList<Deck> decks
) {}
