const MongoLib = require('../lib/mongo');

class RegistroService {
    
    constructor () {
        this.collection='registro';
        this.mongoDB = new MongoLib();
    }

    async createRegistro(n) {
        const registroCreated = await this.mongoDB.create(this.collection, n);
        return registroCreated;
    }

}

module.exports = RegistroService;