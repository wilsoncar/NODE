const comprasApi = require('./compras');
const IsActiveAPI = require('./IsActive');
const loginAPI = require('./login');
const luhnApi = require('./luhn');
const oracleApi = require('./oracle');
const RegistroApi = require('./registro');

function controllers(app) {
    luhnApi(app);
    comprasApi(app);
    oracleApi(app);
    RegistroApi(app);
    IsActiveAPI(app);
    loginAPI(app);
}

module.exports = controllers;