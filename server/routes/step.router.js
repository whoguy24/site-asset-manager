const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
      INSERT INTO step 
        (activity_id, step, user_id)
        VALUES 
        ($1, $2, $3);
    `;
    const sqlValues = [
      req.body.activity_id,
      req.body.step,
      req.body.user_id
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
      DELETE FROM step
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
      UPDATE "step" 
        SET 
          "complete" = $2,
          "step" = $3,
          "comments" = $4
        WHERE "id" = $1;
    `;
    const sqlValues = [
      req.body.id,
      req.body.complete,
      req.body.step,
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
