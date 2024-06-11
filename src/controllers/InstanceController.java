package controllers;

import java.util.Random;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import dao.InstanceDAO;
import models.Instance;
import webserver.WebServerContext;

public class InstanceController {
    
    public static void createInstance(WebServerContext context){
        InstanceDAO instanceDAO = new InstanceDAO();
        String code = InstanceController.generateRandomString();
        boolean rs;
        try {
            rs = instanceDAO.createInstance(code);
            if(!rs){
                context.getResponse().json(code);
            }
        } catch (Exception e) {
            context.getResponse().serverError(e.toString());
        } 
    }

        // Méthode pour générer une chaîne de caractères aléatoire
    public static String generateRandomString() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(25);
        for (int i = 0; i < 25; i++) {
            char randomChar = characters.charAt(random.nextInt(characters.length()));
            sb.append(randomChar);
        }
        return sb.toString();
    }

    public static void incrementPlayerNumber(WebServerContext context){
        InstanceDAO instanceDAO = new InstanceDAO();
        try {
            String code = context.getRequest().getParam("code");
            boolean rs = !instanceDAO.incrementPlayerNumber(code);
            if(rs) context.getResponse().ok("Succès");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }  
    }
}

