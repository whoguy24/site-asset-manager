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
        SELECT * FROM "building"
        WHERE "building"."id" =$1;
    `;
    pool.query(queryText, sqlValues)
    .then((result) => { 
      let building = result.rows[0]
      const queryValues = [building.id];
      const queryText = `
          SELECT * FROM "system"
          WHERE "system"."building_id" = $1
          ORDER BY "system"."id" ASC
      ;`
      pool.query(queryText, queryValues)
      .then((result) => { 
        building.systems = result.rows
        res.send(building);
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

router.post('/', (req, res) => {
    console.log(req.body);
    
    
    const sqlText = `
      INSERT INTO building 
        (site_id, name)
        VALUES 
        ($1, $2);
    `;
    const sqlValues = [
      req.body.site_id,
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

router.delete('/:id', (req, res) => {
    const sqlText = `
      DELETE FROM building
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

  router.put('/:id', (req, res) => {
    console.log(req.body);
    const sqlText = `
      UPDATE "building" 
        SET 
          "name" = $2,
          "type" = $3,
          "operating_hours" = $4,
          "year_built" = $5,
          "floors" = $6,
          "description" = $7,
          "comments" = $8
        WHERE "id" = $1;
    `;
    const sqlValues = [
      req.body.id,
      req.body.name,
      req.body.type,
      req.body.operating_hours,
      req.body.year_built,
      req.body.floors,
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
