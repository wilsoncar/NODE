const MongoLib = require('../lib/mongo');

class loginService {
    
    constructor () {
        this.collection='registro';
        this.mongoDB = new MongoLib();
    }

    async getUsername (n){
        const user = await this.mongoDB.getRegistroUsername(this.collection, n.username);
        return user;
    }

    async verificarlogin (n){
        let verificado = "";
        try {
            const User = await this.getUsername(n);
            if ( User.isActive == true ) {
                console.log("password user:",User.password,"password enviada",n.password);
                try {
                    if (User.password == n.password){
                        verificado = 1;
                    }
                    else{
                        verificado = 0;
                    }
                } catch(err) {
                    console.log("Error");
                }
                
            } else {
                verificado = 3;
            }

        } catch (error) {
            verificado = 2;
        }
        return verificado;

    }

}

module.exports = loginService;

