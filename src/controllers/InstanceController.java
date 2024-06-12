package controllers;

import java.util.Random;

import dao.InstanceDAO;
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

    public static void getInstance(WebServerContext context){
        InstanceDAO instanceDAO = new InstanceDAO();
        boolean rs;
        String code = context.getRequest().getParam("code");
        try {
            rs = instanceDAO.getInstance(code);
            if(rs){
                context.getResponse().json(rs);
            }
        } catch (Exception e) {
            context.getResponse().serverError(e.toString());
        } 
    }

    public static void changeRoles(WebServerContext context){
        try {
            String code = context.getRequest().getParam("code");
            context.getSSE().emit("role" + code, "");
            context.getResponse().ok("Changement de roles");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        } 
    }

    public static void createInitialize(String code, int idGame){
        try {
            InstanceDAO instanceDAO = new InstanceDAO();
            instanceDAO.createInitialize(code, idGame);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

