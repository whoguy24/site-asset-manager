const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    console.log('IN GET ROUTE BY RECORD');
    console.log(req.params.id);
    const sqlValues = [id]
    const queryText = `
        SELECT * FROM "site"
        WHERE "site"."id" =$1;
    `;
    pool.query(queryText, sqlValues)
    .then((result) => { 
      let site = result.rows[0]
      const queryValues = [site.id];
      const queryText = `
          SELECT * FROM "building"
          WHERE "building"."site_id" = $1
          ORDER BY "building"."id" ASC
      ;`
      pool.query(queryText, queryValues)
      .then((result) => { 
        site.buildings = result.rows
        res.send(site);
      })
      .catch((error) => { 
        console.log('INSERT database error', error);
        res.sendStatus(500);
      });
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
      INSERT INTO site 
        (name)
        VALUES 
        ($1);
    `;
    const sqlValues = [
      req.body.name
    ];
    pool.query(sqlText, sqlValues)
      .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('INSERT database error', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
      DELETE FROM site
        WHERE id = $1
    `
    const sqlValues = [
      req.params.id
    ]
  
    pool.query(sqlText, sqlValues)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error('DELETE database error', error)
        res.sendStatus(500);
      })
  })

  router.put('/:id', rejectUnauthenticated, (req, res) => {

    console.log(req.body);
    
    const sqlText = `
      UPDATE "site" 
        SET 
          "name" = $2,
          "address" = $3,
          "city" = $4,
          "state" = $5,
          "zip" = $6,
          "description" = $7,
          "comments" = $8
        WHERE "id" = $1;
    `;
    const sqlValues = [
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.zip,
      req.body.description,
      req.body.comments
    ];
    
    pool.query(sqlText, sqlValues)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('UPDATE database error', error);
        res.sendStatus(500);
      });
  });

module.exports = router;
