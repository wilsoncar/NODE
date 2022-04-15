const comprasApi = require('./compras');
const luhnApi = require('./luhn');
const oracleApi = require('./oracle');

function controllers(app) {
    luhnApi(app);
    comprasApi(app);
    oracleApi(app);
}

module.exports = controllers;