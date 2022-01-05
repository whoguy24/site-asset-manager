const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

function buildTree(result) {
    let tree = {};
    for (const asset of result) {
      // Handle "unencountered" buildings:
      if (!tree[asset.building]) {
        tree[asset.building] = {};
      }
      // Handle "unencountered" systems:
      if (tree[asset.building] && !tree[asset.building][asset.system]) {
        tree[asset.building][asset.system] = []
      }
      // Add asset name to "system" array:
      tree[asset.building][asset.system].push(asset.name)
    }
    console.log(tree);
    return tree;
  }

router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `
        SELECT * FROM "asset" WHERE "site_id"='1'
        ORDER BY 
            "site_id" ASC,
            "building" ASC, 
            "system" ASC, 
            "name" ASC
        ;
    `;
    pool.query(queryText)
    .then((result) => { 
        res.send(buildTree(result.rows));
        // res.send(result.rows);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
  });

router.post('/', (req, res) => {
});

module.exports = router;
