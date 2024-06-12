export class GameView{
    constructor(){}

    displayGame(data){
        const parseData = JSON.parse(data);
        localStorage.setItem("game", parseData["idGame"]);
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
            let color = "#ffffff";
            if(sessionStorage.getItem("role") === "operateur" || deck["revealed"] == true){
                color = deck["color"];
            }
            card.style.backgroundColor = color;
            card.classList.add("card");
            cards.appendChild(card);
        }
        if(sessionStorage.getItem("role") === "operateur"){
            let hintContainer = document.getElementById("hintContainer");
            if(hintContainer == null) {
                hintContainer = document.createElement('div');
                hintContainer.id = 'hintContainer';
                const body = document.getElementsByTagName("body")[0];
                body.appendChild(hintContainer);
                const hintInput = document.createElement('input');
                hintInput.placeholder = "Ecrire un indice";
                hintInput.id = 'hintInput';
                hintContainer.appendChild(hintInput);
                const hintSubmit = document.createElement('submit
            }

        }
    }    
}