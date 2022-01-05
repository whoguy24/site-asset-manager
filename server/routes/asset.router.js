const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

function buildTree(result) {
    let tree = [];
    let assets = result;
    for (const asset of assets) {
      if (!tree[asset.building]) {
        tree[asset.building] = [];
      }
      if (tree[asset.building] && !tree[asset.building][asset.system]) {
        tree[asset.building][asset.system] = []
      }
      tree[asset.building][asset.system].push({id: asset.id, name: asset.name})
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
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
  });

router.post('/', (req, res) => {
});

module.exports = router;
