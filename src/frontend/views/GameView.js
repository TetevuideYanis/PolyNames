import { GameService } from "../services/GameService.js";
export class GameView{
    constructor(){}

    displayGame(data){
        const parseData = JSON.parse(data);
        sessionStorage.setItem("idGame", parseData["idGame"]);
        let cards = document.getElementById("cards");
        if(cards == null) {
            cards = document.createElement('div');
            cards.id = 'cards';
            const body = document.getElementsByTagName("body")[0];
            body.appendChild(cards);
        }else{
            cards.innerHTML = '';
        }
        for(let i=0; i<25; i++){
            const deck = parseData["decks"][i];
            const card = document.createElement('div');
            card.innerHTML = deck["card"]["value"];
            let color = "#FAD7A0";
            if(sessionStorage.getItem("role") === "operateur" || deck["revealed"] == true){
                color = deck["color"];
            }
            card.style.backgroundColor = color;
            card.classList.add("card");
            cards.appendChild(card);
        }

        const body = document.getElementsByTagName("body")[0];
        let hintLabel = document.getElementById('hintLabel');
        if(hintLabel == null) {
            hintLabel = document.createElement('h3');
            hintLabel.id = "hintLabel";
            body.appendChild(hintLabel);
        }

        if(sessionStorage.getItem("role") === "espion"){
            if(sessionStorage.getItem("turn") == "true"){
                hintLabel.classList.remove("hidden");
            }
            else{
                hintLabel.classList.add("hidden");
            }
        }

        if(sessionStorage.getItem("role") === "operateur"){
            let hintInput = document.getElementById('hintInput');
            if(hintInput == null) {
                hintInput = document.createElement('input');
                hintInput.placeholder = "Ecrire un indice";
                hintInput.id = 'hintInput';
                body.appendChild(hintInput);
            }
            let hintButton = document.getElementById('hintButton');
            if(hintButton == null) {
                hintButton = document.createElement('button');
                hintButton.textContent = "Valider";
                hintButton.id = 'hintButton'; 
                hintButton.addEventListener('click', async () => {
                    await GameService.changeTurn(sessionStorage.getItem("idGame"), hintInput.value);
                });           
                body.appendChild(hintButton);
            }

            if(sessionStorage.getItem("turn") == "false"){
                hintButton.classList.add("hidden");
                hintInput.classList.add("hidden");
            }
            else {
                hintInput.value = "";
                hintLabel.innerText = "";
                hintButton.classList.remove("hidden");
                hintInput.classList.remove("hidden");
            }
        }
    }    

    updateTurn(data){
        console.log(data);
        const hintLabel = document.getElementById('hintLabel');

        if(sessionStorage.getItem("role") === "espion"){
            if(sessionStorage.getItem("turn") === "true"){
                hintLabel.classList.remove("hidden");
                hintLabel.innerText = data;
            }
            else{
                hintLabel.classList.add("hidden");
            }
        }
        else{
            const hintInput = document.getElementById('hintInput');
            const hintButton = document.getElementById('hintButton');

            if(sessionStorage.getItem("turn") === "false"){
                hintButton.classList.add("hidden");
                hintInput.classList.add("hidden");
                hintLabel.classList.remove("hidden");
                hintLabel.innerText = data;
            }
            else {
                hintInput.value = "";
                hintLabel.innerText = "";
                hintButton.classList.remove("hidden");
                hintInput.classList.remove("hidden");
            }
        }
    }
}