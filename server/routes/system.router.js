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
        SELECT * FROM "system"
        WHERE "system"."id" =$1;
    `;
    pool.query(queryText, sqlValues)
    .then((result) => { 
      let system = result.rows[0]
      const queryValues = [system.id];
      const queryText = `
          SELECT * FROM "equipment"
          WHERE "equipment"."system_id" = $1
          ORDER BY "equipment"."id" ASC
      ;`
      pool.query(queryText, queryValues)
      .then((result) => { 
        system.equipment = result.rows
        res.send(system);
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
      INSERT INTO system 
        (building_id, name)
        VALUES 
        ($1, $2);
    `;
    const sqlValues = [
      req.body.building_id,
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
      DELETE FROM system
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
      UPDATE "system" 
        SET 
          "name" = $2,
          "operating_hours" = $3,
          "sequence_of_operation" = $4,
          "performance_metrics" = $5,
          "recommended_set_points" = $6,
          "description" = $7,
          "comments" = $8
        WHERE "id" = $1;
    `;
    const sqlValues = [
      req.body.id,
      req.body.name,
      req.body.operating_hours,
      req.body.sequence_of_operation,
      req.body.performance_metrics,
      req.body.recommended_set_points,
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
