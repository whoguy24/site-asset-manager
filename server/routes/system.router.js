const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `
        SELECT "system"."building_id", "system"."id", "system"."name" FROM "system" 
        JOIN "building" ON "system"."building_id"="building"."id"
        JOIN "site" ON "building"."site_id"="site"."id"
        WHERE "site_id"='1';
    `;
    pool.query(queryText)
    .then((result) => { 
        console.log(result.rows);
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
