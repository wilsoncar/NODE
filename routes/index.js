const comprasApi = require('./compras');
const luhnApi = require('./luhn');

function controllers(app) {
    luhnApi(app);
    comprasApi(app);
}

module.exports = controllers;