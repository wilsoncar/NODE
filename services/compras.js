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

    async updateCompras(data) {
        const compraUpdated = await this.mongoDB.updateCompras(this.collection, data.id, data);
        console.log('Compra Updated', compraUpdated);
        return compraUpdated || {};
    }

    async deleteCompras(id) {
        const compraDeleted = await this.mongoDB.delete(this.collection, id);
        console.log('Compra deleted', compraDeleted);
        return compraDeleted || {};
    }
}

module.exports = comprasService;