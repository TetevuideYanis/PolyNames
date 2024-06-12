package models;

public record Deck(
    int idGame,
    Card card,
    boolean revealed,
    String color
) {}
