const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    console.log('IN GET ROUTE BY RECORD');
    console.log(req.params.id);
    
    
    sqlValues = [id]
    queryText = `
        SELECT * FROM "equipment"
        WHERE "equipment"."id" =$1;
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

// router.post('/', (req, res) => {
// });

// router.delete('/:id', rejectUnauthenticated, (req, res) => {
//     const id = req.params.id;
//     console.log(req.params.id);
    
    
//     sqlValues = [id]
//     queryText = `
//         DELETE FROM "equipment"
//         WHERE "equipment"."id" =$1;
//     `;
//     pool.query(queryText, sqlValues)
//     .then((result) => { 
//         res.sendStatus(200);
//     })
//     .catch((error) => {
//         console.log(error);
//         res.sendStatus(500);
//     });
// });

// router.put('/:id', rejectUnauthenticated, (req, res) => {
//     const equipment = req.body
//     console.log('IN PUT ROUTE BY RECORD');
//     console.log(req.params.id);
//     console.log(equipment);
    
    
    
//     sqlValues = [equipment.id, equipment.name, equipment.location, equipment.area_served]

//     queryText = `
//         UPDATE "equipment" 
//         SET 
//             "name" = $2,
//             "location" = $3,
//             "area_served" = $4
//         WHERE "id" = $1;
//     `;
//     pool.query(queryText, sqlValues)
//     .then((result) => { 
//         res.send(result.rows);
//     })
//     .catch((error) => {
//         console.log(error);
//         res.sendStatus(500);
//     });
// });

router.post('/', (req, res) => {
    console.log(req.body);
    
    const sqlText = `
      INSERT INTO equipment 
        (system_id, name)
        VALUES 
        ($1, $2);
    `;
    const sqlValues = [
      req.body.system_id,
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

module.exports = router;
