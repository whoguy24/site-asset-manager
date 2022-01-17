const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
      INSERT INTO issue 
        (equipment_id, issue, user_id)
        VALUES 
        ($1, $2, $3);
    `;
    const sqlValues = [
      req.body.equipment_id,
      req.body.issue,
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
      DELETE FROM issue
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
      UPDATE "issue" 
        SET 
          "issue" = $2,
          "resolution" = $3,
          "date_identified" = $4,
          "comments" = $5,
          "status" = $6
        WHERE "id" = $1;
    `;
    const sqlValues = [
      req.body.id,
      req.body.issue,
      req.body.resolution,
      req.body.date_identified,
      req.body.comments,
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
