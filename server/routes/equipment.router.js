const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

async function buildEquipment (equipment) {
  equipment.activities = await fetchActivities(equipment);
  for (const activity of equipment.activities) {
    activity.steps = await fetchSteps(activity);
  }
  equipment.issues = await fetchIssues(equipment);
  equipment.ecms = await fetchECMs(equipment);
  return equipment
};

function fetchActivities (equipment) {
  return new Promise((resolve, reject )=> {
      const queryValues = [equipment.id];
      const queryText = `
        SELECT * FROM "activity"
        WHERE "activity"."equipment_id" =$1
        ORDER BY "activity"."id" ASC;
      `;
      pool.query(queryText, queryValues)
      .then((result) => { 
          resolve(result.rows)
      })
      .catch((error) => { 
          reject(error);
      });
  })
}

function fetchSteps (activity) {
  return new Promise((resolve, reject )=> {
      const queryValues = [activity.id];
      const queryText = `
        SELECT * FROM "step"
        WHERE "step"."activity_id"=$1
        ORDER BY "step"."id" ASC;
      `;
      pool.query(queryText, queryValues)
      .then((result) => { 
          resolve(result.rows)
      })
      .catch((error) => { 
          reject(error);
      });
  })
}

function fetchIssues (equipment) {
  return new Promise((resolve, reject )=> {
      const queryValues = [equipment.id];
      const queryText = `
        SELECT * FROM "issue"
        WHERE "issue"."equipment_id" =$1
        ORDER BY "issue"."id" ASC;
      `;
      pool.query(queryText, queryValues)
      .then((result) => { 
          resolve(result.rows)
      })
      .catch((error) => { 
          reject(error);
      });
  })
}

function fetchECMs (equipment) {
  return new Promise((resolve, reject )=> {
      const queryValues = [equipment.id];
      const queryText = `
        SELECT * FROM "ecm"
        WHERE "ecm"."equipment_id" =$1
        ORDER BY "ecm"."id" ASC;
      `;
      pool.query(queryText, queryValues)
      .then((result) => { 
          resolve(result.rows)
      })
      .catch((error) => { 
          reject(error);
      });
  })
}

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

        async function buildWhatever() {
          const equipment = await buildEquipment(result.rows[0])
          res.send(equipment);
        }

        buildWhatever();

        

    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});


















router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    
    
    sqlValues = [id]
    queryText = `
        DELETE FROM "equipment"
        WHERE "equipment"."id" =$1;
    `;
    pool.query(queryText, sqlValues)
    .then((result) => { 
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
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

router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const sqlText = `
      UPDATE "equipment" 
        SET 
          "name" = $2,
          "location" = $3,
          "area_served" = $4,
          "condition" = $5,
          "manufacturer" = $6,
          "model_number" = $7,
          "sequence_of_operation" = $8,
          "amperage" = $9,
          "voltage" = $10,
          "BHP" = $11,
          "BTU" = $12,
          "CFM" = $13,
          "MPH" = $14,
          "VFD" = $15,
          "horsepower" = $16,
          "capacity" = $17,
          "description" = $18,
          "comments" = $19
        WHERE "id" = $1;
    `;
    const sqlValues = [
      req.body.id,
      req.body.name,
      req.body.location,
      req.body.area_served,
      req.body.condition,
      req.body.manufacturer,
      req.body.model_number,
      req.body.sequence_of_operation,
      req.body.amperage,
      req.body.voltage,
      req.body.BHP,
      req.body.BTU,
      req.body.CFM,
      req.body.MPH,
      req.body.VFD,
      req.body.horsepower,
      req.body.capacity,
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
