package models;

public record Deck(
    int idGame,
    int idCard,
    boolean revealed,
    String color
) {}
