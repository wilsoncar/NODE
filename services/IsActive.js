
const jsonwebtoken = require('jsonwebtoken');
const MongoLib = require('../lib/mongo');

class isActiveService {
    
    constructor () {
        this.collection='registro';
        this.mongoDB = new MongoLib();
    }

    async getUsername (n){
        const user = await this.mongoDB.getRegistroUsername(this.collection, n.username);
        return user;
    }

    async verificarToken(n) {
        let verificado = 1;
        const User = await this.getUsername(n);
        try {
            jsonwebtoken.verify(User.Token, n.token);
        } catch(err){
            verificado = 0;
        }
        if (verificado==1){
            const user = await this.mongoDB.updateIsActive(this.collection, n.username);
            console.log("username:",user);
            
        }
        return verificado;
    }

}

module.exports = isActiveService;