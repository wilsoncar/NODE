const express = require('express');
const DB = require('../lib/oracle');

function oracleApi(app) {
    const router = express.Router();
    app.use("/oracle", router);
    const oracle = new DB();

    router.get("/", async function (req, res,next){
        const { body: query } = req;
        console.log('Consulta', query);
        try {
            const sql = query.query;
            const result = await oracle.open(sql,[],false);
            const nombrecolumna = result.metaData;
            const filas = result.rows;
            res.status(200).json({
                Columnas: nombrecolumna,
                Filas: filas,
                message: "Consulta completada"
            });
        } catch (err) {
            res.status(200).json({
                message: 'Error - la tabla o vista no existe'
            });
            next(err);
        }
    });

}

module.exports = oracleApi;
