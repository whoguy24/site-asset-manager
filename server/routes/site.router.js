const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT * FROM "site";`;
    pool.query(queryText)
    .then((result) => { 
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
  });

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    console.log('IN GET ROUTE BY RECORD');
    console.log(req.params.id);
    
    
    sqlValues = [id]
    queryText = `
        SELECT * FROM "site"
        WHERE "site"."id" =$1;
    `;
    pool.query(queryText, sqlValues)
    .then((result) => { 
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
});

module.exports = router;
