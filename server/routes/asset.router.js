const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `
        SELECT * FROM "asset" WHERE "site_id"='1'
        ORDER BY 
            "site_id" ASC,
            "building" ASC, 
            "system" ASC, 
            "location" ASC, 
            "name" ASC
        ;
    `;
    pool.query(queryText)
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
