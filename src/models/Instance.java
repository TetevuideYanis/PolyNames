package models;

import java.util.ArrayList;

public record Instance(
    String code,
    ArrayList<Game> games
) {}
