export class GameService{
    /**
     * demande la creation d'une game au serveur
     * @param {string} code le code du lobby
     * @returns une game
     */
    static async createGame(code) {
        let data = null;
        const response = await fetch("http://localhost:8080/createGame/"+code);
        if(response.status === 200)
        {
            data = await response.json();
        }
        return data;
    }

    /**
     * change le tour
     * @param {int} idGame 
     * @param {string} hint 
     * @param {int} nombreCarte 
     * @returns la reponse du serveur
     */
    static async changeTurnOperateur(idGame, hint, nombreCarte){
        let data = null;
        let url = "http://localhost:8080/changeTurnOperateur/" + idGame + "/" + hint + "/" + nombreCarte;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                data = await response.ok;
            }
        } catch (error) {
            console.log(error);
        }
        return data;
    }

    /**
     * envoi au serveur le nouveau score
     * @param {int} idGame l'id de la game
     * @param {int} score le score
     * @returns la reponse du serveur
     */
    static async changeTurnEspion(idGame, score){
        let data = null;
        let url = "http://localhost:8080/changeTurnEspion/" + idGame + "/" + score;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                data = await response.ok;
            }
        } catch (error) {
            console.log(error);
        }
        return data;
    }

    /**
     * demande au serveur la mise a jour de la carte
     * @param {string} cardValue la carte
     * @param {int} idGame l'id de la game
     * @returns la reponse du serveur
     */
    static async turnCard(cardValue, idGame){
        let data = null;
        let url = "http://localhost:8080/turnCard/" + idGame + "/" + cardValue;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                data = await response.ok;
            }
        } catch (error) {
            console.log(error);
        }
        return data;
    }

    /**
     * envoi au serveur que la game a changée
     * @param {int} idGame l'id de la game
     * @returns la réponse du serveur
     */
    static async gameChanged(idGame) {
        let data = null;
        const response = await fetch("http://localhost:8080/gameChanged/"+idGame);
        if(response.status === 200)
        {
            data = await response.json();
        }
        return data;
    }

    /**
     * demande au serveur de mettre fin a la game
     * @param {int} code le code du lobby
     * @returns la réponse du serveur
     */
    static async endGame(code){
        let data = null;
        let url = "http://localhost:8080/endGame/" + code;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                data = await response.ok;
            }
        } catch (error) {
            console.log(error);
        }
        return data;
    }
}