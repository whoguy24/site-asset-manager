const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

async function buildEquipment (equipment, user_id, user_role) {
  console.log(user_id, user_role);
  
  equipment.activities = await fetchActivities(equipment, user_id, user_role);
  for (const activity of equipment.activities) {
    activity.steps = await fetchSteps(activity, user_id, user_role);
  }
  equipment.issues = await fetchIssues(equipment, user_id, user_role);
  equipment.ecms = await fetchECMs(equipment, user_id, user_role);
  return equipment
};

function fetchActivities (equipment, user_id, user_role) {
  return new Promise((resolve, reject )=> {
      let queryValues = [];
      let queryText = ''
      if (user_role === 'admin') {
        queryValues = [equipment.id];
        queryText = `
          SELECT * FROM "activity"
          WHERE "activity"."equipment_id"=$1
          ORDER BY "activity"."id" ASC;
        `
      }
      else {
        queryValues = [equipment.id, user_id];
        queryText = `
          SELECT * FROM "activity"
          WHERE "activity"."equipment_id"=$1
          AND "activity"."user_id"=$2
          ORDER BY "activity"."id" ASC;
        `;
      }
      pool.query(queryText, queryValues)
      .then((result) => { 
          resolve(result.rows)
      })
      .catch((error) => { 
          reject(error);
      });
  })
}

function fetchSteps (activity, user_id, user_role) {
  return new Promise((resolve, reject )=> {
      let queryValues = [];
      let queryText = ''
      if (user_role === 'admin') {
        queryValues = [activity.id];
        queryText = `
          SELECT * FROM "step"
          WHERE "step"."activity_id"=$1
          ORDER BY "step"."id" ASC;
        `
      }
      else {
        queryValues = [activity.id, user_id];
        queryText = `
          SELECT * FROM "step"
          WHERE "step"."activity_id"=$1
          AND "step"."user_id"=$2
          ORDER BY "step"."id" ASC;
        `;
      }
      pool.query(queryText, queryValues)
      .then((result) => { 
          resolve(result.rows)
      })
      .catch((error) => { 
          reject(error);
      });
  })
}

function fetchIssues (equipment, user_id, user_role) {
  return new Promise((resolve, reject )=> {
      let queryValues = [];
      let queryText = ''
      if (user_role === 'admin') {
        queryValues = [equipment.id];
        queryText = `
          SELECT * FROM "issue"
          WHERE "issue"."equipment_id" =$1
          ORDER BY "issue"."id" ASC;
        `
      }
      else {
        queryValues = [equipment.id, user_id];
        queryText = `
          SELECT * FROM "issue"
          WHERE "issue"."equipment_id" =$1
          AND "issue"."user_id"=$2
          ORDER BY "issue"."id" ASC;
        `;
      }
      pool.query(queryText, queryValues)
      .then((result) => { 
          resolve(result.rows)
      })
      .catch((error) => { 
          reject(error);
      });
  })
}

function fetchECMs (equipment, user_id, user_role) {
  return new Promise((resolve, reject )=> {
      let queryValues = [];
      let queryText = ''
      if (user_role === 'admin') {
        queryValues = [equipment.id];
        queryText = `
          SELECT * FROM "ecm"
          WHERE "ecm"."equipment_id" =$1
          ORDER BY "ecm"."id" ASC;
        `
      }
      else {
        queryValues = [equipment.id, user_id];
        queryText = `
          SELECT * FROM "ecm"
          WHERE "ecm"."equipment_id" =$1
          AND "ecm"."user_id"=$2
          ORDER BY "ecm"."id" ASC;
        `;
      }
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
        async function buildResponse() {
          const equipment = await buildEquipment(result.rows[0], req.user.id, req.user.role)
          res.send(equipment);
        }
        buildResponse();
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
