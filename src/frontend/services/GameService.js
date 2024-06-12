export class GameService{
    static async createGame(code) {
        let data = null;
        const response = await fetch("http://localhost:8080/createGame/"+code);
        if(response.status === 200)
        {
            data = await response.json();
        }
        return data;
    }

    static async changeTurn(idGame, hint){
        let data = hint;
        let url = "http://localhost:8080/changeTurn/" + idGame;
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