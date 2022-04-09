const MongoLib = require('../lib/mongo');

class comprasService {
    
    constructor () {
        this.collection='compras';
        this.mongoDB = new MongoLib();
    }

    async createCompras(n) {
        const comprasCreated = await this.mongoDB.create(this.collection, n);
        return comprasCreated;
    }

    async getCompras(n) {
        const compra = await this.mongoDB.get(this.collection, n);
        console.log('\ncompra from services :', compra);
        return compra || {};
    }
}

module.exports = comprasService;