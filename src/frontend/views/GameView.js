export class GameView{
    displayGame(data){
        console.log(data);
        this.deleteMenu();
        const cards = document.createElement('div');
        cards.id = 'cards';
        
    }

    deleteMenu(){
        const body = document.getElementsByTagName("body")[0];
        body.removeChild(document.getElementById("changeRoles"));
        body.removeChild(document.getElementById("play"));
    }
}