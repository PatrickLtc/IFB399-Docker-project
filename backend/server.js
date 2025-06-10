const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const app = express();
app.use(cors());
//app.use(express.json());

const config = {
    user: 'sa',
    password: 'Password123!',
    //server: '0.0.0.0',
    //server: 'host.docker.internal',  //silly_faraday is the SQL container name
    server: 'backend-mysql-container-1', 
    database: 'MyDatabase',
    options: {
        encrpty: false,
        trustServerCertificate: true // For development purposes only
    }
};

console.log("DB config is ${config}")

app.get('/api',function(req,res) {
    console.log('Called');
    res.send({result:'Hellooooo'});
})

app.get('/api/data', async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        console.log("DB pool is ${pool}");
        const result = await pool.request().query('select distinct LookupType from glb_Lookups');
        res.json(result.recordset);
        console.log(result.recordset)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    } finally {
        mssql.close();
    }
});



app.get('/api/detailsData', async (req, res) => {
    try {
        const pool = await mssql.connect(config);
        console.log("req", req.query.id);
        let lookupid = req.query.id
        let sqlString = 'select LookupID, LookupType, LookupCode, Description from glb_Lookups where LookupType =\''+lookupid+'\''
        console.log ("sqlstring", sqlString)
        //const result = await pool.request().query('select LookupID, LookupType, LookupCode, Description from glb_Lookups where LookupType = \'ContactType\'');
        const result = await pool.request().query(sqlString);
        res.json(result.recordset);
        console.log(result.recordset)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    } finally {
        mssql.close();
    } 
});


const port = 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));

