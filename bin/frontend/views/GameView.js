import { GameService } from "../services/GameService.js";
import { InstanceView } from "./InstanceView.js";
export class GameView{
    constructor(){}

    //fonction qui affiche le jeu avec les données reçues 
    displayGame(data){                
        const body = document.getElementsByTagName("body")[0];
        const parseData = JSON.parse(data);
        sessionStorage.setItem("idGame", parseData["idGame"]);

        //on créé un affichage du score
        let score = document.getElementById("score");
        if(score == null){
            score = document.createElement('h3');
            score.id = "score";
            body.appendChild(score);
        }
        score.innerText = "Score : " + parseData["score"]

        //on créé un conteneur pour les cartes
        let cards = document.getElementById("cards");
        if(cards == null) {
            cards = document.createElement('div');
            cards.id = 'cards';
            body.appendChild(cards);
        }else{
            //s'il existait déjà, on le vide
            cards.innerHTML = '';
        }
        //on fait les 25 cartes
        for(let i=0; i<25; i++){
            //on les définit par défaut comme si on était espion pour ne pas les voir
            const deck = parseData["decks"][i];
            const card = document.createElement('div');
            card.innerHTML = deck["card"]["value"];
            let color = "#FF0000";
            //on leur met leur couleur si on est operateur ou que l'attribut revealed est vrai
            if(sessionStorage.getItem("role") === "operateur" || deck["revealed"] == true){
                color = deck["color"];
            }
            card.style.backgroundColor = color;
            card.classList.add("card");

            //on ajoute les events au click
            card.addEventListener("click", async () =>{
                //il se passe quelque chose uniquement si on est espion, que la carte n'est pas déja retournée et que c'est notre tour
                if(sessionStorage.getItem("role") === "espion" && sessionStorage.getItem("turn") === "true" && deck["revealed"] == false){
                    //on demande de la retourner
                    await GameService.turnCard(card.innerHTML, sessionStorage.getItem("idGame"));
                    //on récupère le bouton pour mettre fin au tour
                    const endTurnButton = document.getElementById("endTurnButton");
                    //si la carte cliquée est noire, on cache le bouton et on alert que c'est perdu
                    if(deck["color"] == "#17202A"){                        
                        if(endTurnButton != null){
                            endTurnButton.classList.add("hidden");
                        }
                        alert("Perdu");
                        //on demande la fin de la partie
                        await GameService.endGame(parseInt(sessionStorage.getItem("code"), 10));
                    }
                    //si la carte est grise
                    else if(deck["color"] == "#FAD7A0"){
                        //on demande la fin du tour
                        await GameService.changeTurnEspion(sessionStorage.getItem("idGame"), sessionStorage.getItem("scoreManche"));
                    }
                    //si elle est bleue
                    else{
                        //on augmente de 1 le nombre de cartes retournées cette manche
                        sessionStorage.setItem("nombreCartesRetournees", parseInt(sessionStorage.getItem("nombreCartesRetournees"), 10) + 1);
                        //on augmente de 1 le nombre de cartes bleus retournées 
                        sessionStorage.setItem("nombreCartesBleues", parseInt(sessionStorage.getItem("nombreCartesBleues"), 10) + 1);
                        //si ca fait 8
                        if(parseInt(sessionStorage.getItem("nombreCartesBleues"), 10) == 8){
                            if(endTurnButton != null){
                                endTurnButton.classList.add("hidden");
                            }
                            //on alert que c'est fini et on demande la fin de la partie
                            alert("Terminé!");
                            await GameService.endGame(parseInt(sessionStorage.getItem("code"), 10));
                        }
                        //si on a retourné moins de carte que ce qu'a donnée l'operateur
                        if(parseInt(sessionStorage.getItem("nombreCartesRetournees"), 10) <= parseInt(sessionStorage.getItem("nombreCarte"), 10)){
                            //on ajoute le score normal
                            sessionStorage.setItem("scoreManche", parseInt(sessionStorage.getItem("scoreManche"), 10) + parseInt(sessionStorage.getItem("nombreCartesRetournees"), 10)); 
                        }
                        //si on est à la n+1 carte, on ajoute le carré et on demande la fin du tour avec une mise à jour
                        else if(parseInt(sessionStorage.getItem("nombreCartesRetournees"), 10) == (parseInt(sessionStorage.getItem("nombreCarte"), 10) + 1)){
                            sessionStorage.setItem("scoreManche", parseInt(sessionStorage.getItem("scoreManche"), 10) + parseInt(sessionStorage.getItem("nombreCartesRetournees"), 10) * parseInt(sessionStorage.getItem("nombreCartesRetournees"), 10)); 
                            await GameService.changeTurnEspion(sessionStorage.getItem("idGame"), sessionStorage.getItem("scoreManche"));
                            await GameService.gameChanged(sessionStorage.getItem("idGame"));
                        }
                        //sinon on demande la fin du tour et la mise à jour
                        else{
                            await GameService.changeTurnEspion(sessionStorage.getItem("idGame"), sessionStorage.getItem("scoreManche"));
                            await GameService.gameChanged(sessionStorage.getItem("idGame"));
                        }
                    }
                }
            });
            //on ajoute les cartes au conteneur
            cards.appendChild(card);
        }
        //on ajoute un titre pour l'indice
        let hintLabel = document.getElementById('hintLabel');
        if(hintLabel == null) {
            hintLabel = document.createElement('h3');
            hintLabel.id = "hintLabel";
            body.appendChild(hintLabel);
        }

        //pareil pour le nombre de cartes à deviner
        let nombreCarte = document.getElementById('nombreCarte'); 
        if(nombreCarte == null) {
            nombreCarte = document.createElement('h3');
            nombreCarte.id = "nombreCarte";
            body.appendChild(nombreCarte);
        }

        //si on est espion on ajoute un bouton de fin de tour
        if(sessionStorage.getItem("role") === "espion"){
            let endTurnButton = document.getElementById("endTurnButton");
            if(endTurnButton == null){
                endTurnButton = document.createElement("button");
                endTurnButton.textContent = "Fin du tour";
                endTurnButton.id = "endTurnButton";
                endTurnButton.addEventListener("click", async () => {
                    //si on lie clique, on demande la fin du tour et une mise à jour
                    await GameService.changeTurnEspion(sessionStorage.getItem("idGame"), sessionStorage.getItem("scoreManche"));
                    await GameService.gameChanged(sessionStorage.getItem("idGame"));
                });
                body.appendChild(endTurnButton);
            }
            //on le cache si c'est pas le tour de l'espion
            if(sessionStorage.getItem("turn") === "false"){
                endTurnButton.classList.add("hidden");
                hintLabel.classList.add("hidden");
                nombreCarte.classList.add("hidden");
            }
            //on le montre sinon
            else {
                nombreCarte.classList.remove("hidden");
                hintLabel.classList.remove("hidden");
                endTurnButton.classList.remove("hidden");
            }
        }

        //si on est opérateur, on ajoute deux input pour l'indice et le nombre de cartes
        if(sessionStorage.getItem("role") === "operateur"){
            let hintInput = document.getElementById('hintInput');
            if(hintInput == null) {
                hintInput = document.createElement('input');
                hintInput.placeholder = "Ecrire un indice";
                hintInput.id = 'hintInput';
                body.appendChild(hintInput);
            }
            let inputNumber = document.getElementById('inputNumber');
            if(inputNumber == null) {
                inputNumber = document.createElement('input');
                inputNumber.id = 'inputNumber';
                inputNumber.setAttribute("min", 1);
                inputNumber.setAttribute("max", 7);
                inputNumber.setAttribute('type', 'number');
                body.appendChild(inputNumber);
            }
            //et un bouton de validation
            let hintButton = document.getElementById('hintButton');
            if(hintButton == null) {
                hintButton = document.createElement('button');
                hintButton.textContent = "Valider";
                hintButton.id = 'hintButton'; 
                hintButton.addEventListener('click', async () => {
                    //au click, on demande la fin du tour et on envoi les infos
                    await GameService.changeTurnOperateur(sessionStorage.getItem("idGame"), hintInput.value, inputNumber.value);
                });           
                body.appendChild(hintButton);
            }

            //on cache tout si c'est pas le tour de l'opérateur
            if(sessionStorage.getItem("turn") == "false"){
                hintButton.classList.add("hidden");
                hintInput.classList.add("hidden");
                inputNumber.classList.add("hidden");
                nombreCarte.classList.remove("hidden");
            }
            //sinon on montre tout
            else {
                hintInput.value = "";
                hintLabel.innerText = "";
                inputNumber.value = 0;
                hintButton.classList.remove("hidden");
                hintInput.classList.remove("hidden");
                inputNumber.classList.remove("hidden");
                nombreCarte.classList.add("hidden");
            }
        }
    }    

    //fonction qui met a jour les infos du tour
    updateTurn(data){
        //à cahque tour, on réinitialise ces variables
        sessionStorage.setItem("nombreCartesRetournees", 0);
        sessionStorage.setItem("scoreManche", 0);

        let parseData;
        if(data != "") 
            parseData = JSON.parse(data);
        const hintLabel = document.getElementById('hintLabel');
        const nombreCarte = document.getElementById('nombreCarte');

        //meme mécanisme qu'avant mais on ajoute les données reçues pour l'indice et le nombre de cartes
        if(sessionStorage.getItem("role") === "espion"){
            const endTurnButton = document.getElementById('endTurnButton');
            if(sessionStorage.getItem("turn") === "true"){
                sessionStorage.setItem("nombreCarte", parseData["nombreCarte"]);
                hintLabel.classList.remove("hidden");
                hintLabel.innerText = "Indice : " + parseData["hint"];
                endTurnButton.classList.remove("hidden");
                nombreCarte.classList.remove("hidden");
                nombreCarte.innerText = "Nombre de cartes : " + parseData["nombreCarte"];
            }
            else{
                hintLabel.classList.add("hidden");
                endTurnButton.classList.add("hidden");
                nombreCarte.classList.add("hidden");
            }
        }
        else{
            const hintInput = document.getElementById('hintInput');
            const hintButton = document.getElementById('hintButton');
            const inputNumber = document.getElementById('inputNumber');

            if(sessionStorage.getItem("turn") === "false"){
                hintButton.classList.add("hidden");
                hintInput.classList.add("hidden");
                hintLabel.classList.remove("hidden");
                inputNumber.classList.add("hidden");
                hintLabel.innerText = "Indice : " + parseData["hint"];
                nombreCarte.classList.remove("hidden");
                nombreCarte.innerText = "Nombre de cartes : " + parseData["nombreCarte"];
            }
            else {
                hintInput.value = "";
                hintLabel.innerText = "";
                inputNumber.value = 0;
                hintButton.classList.remove("hidden");
                hintInput.classList.remove("hidden");
                inputNumber.classList.remove("hidden");
                nombreCarte.classList.add("hidden");
            }
        }
    }
}