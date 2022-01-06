const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `
        SELECT "equipment"."system_id", "equipment"."id", "equipment"."name" FROM "equipment" 
        JOIN "system" ON "equipment"."system_id"="system"."id"
        JOIN "building" ON "system"."building_id"="building"."id"
        JOIN "site" ON "building"."site_id"="site"."id"
        WHERE "site_id"='1';
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
