const oracledb = require ('oracledb');

class Oraclelib{
    db = {
        user: 'system',
        password: 'wil.aguirre10',
        connectString: 'localhost:1521'
    }
    
    async open(sql,binds, autoComit){
        let con = await oracledb.getConnection(this.db);
        let result = await con.execute(sql,binds,{autoComit});
        con.release();
        return result;
    
    }
}


module.exports = Oraclelib;