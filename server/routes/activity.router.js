const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
      INSERT INTO activity 
        (equipment_id, activity)
        VALUES 
        ($1, $2);
    `;
    const sqlValues = [
      req.body.equipment_id,
      req.body.activity
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
      DELETE FROM activity
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
    const sqlText = `
      UPDATE "activity" 
        SET 
          "activity" = $2,
          "description" = $3,
          "due_date" = $4,
          "status" = $5
        WHERE "id" = $1;
    `;
    const sqlValues = [
      req.body.id,
      req.body.activity,
      req.body.description,
      req.body.due_date,
      req.body.status,
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
