export class InstanceService{
    static async createInstance() {
        let data = null;
        const response = await fetch("http://localhost:8080/createInstance");
        if(response.status === 200)
        {
            data = await response.json();
        }
        return data;
    }

    static async getInstance(code) {
        let data = null;
        const response = await fetch("http://localhost:8080/getInstance/"+code);
        if(response.status === 200)
        {
            data = await response.json();
        }
        return data;
    }

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
}