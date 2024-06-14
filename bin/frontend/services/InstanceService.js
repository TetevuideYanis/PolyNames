export class InstanceService{

    /**
     * demande u serveur la création d'une instance
     * @returns une instance
     */
    static async createInstance() {
        let data = null;
        const response = await fetch("http://localhost:8080/createInstance");
        if(response.status === 200)
        {
            data = await response.json();
        }
        return data;
    }

    /**
     * demande une instance au serveur
     * @param {int} code le code de l'instance
     * @returns un booleen
     */
    static async getInstance(code) {
        let data = null;
        const response = await fetch("http://localhost:8080/getInstance/"+code);
        if(response.status === 200)
        {
            data = await response.json();
        }
        return data;
    }

    /**
     * demande au serveur de changer les roles
     * @param {int} code le code du lobby
     * @returns la reponse du serveur
     */
    static async changeRoles(code){
        let data = null;
        let url = "http://localhost:8080/changeRoles/" + code;
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
     * demande au serveur de creer une game
     * @param {int} code le code du lobby
     * @returns la reponse du serveur
     */
    static async createGame(code){
        let data = null;
        let url = "http://localhost:8080/play/" + code;
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