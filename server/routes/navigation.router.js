const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

async function buildSites (site_id) {
    const sites = await fetchSites(site_id);
    let siteNavigation = []
    for (const site of sites) {
        siteNavigation.push({
            id: site.id,
            name: site.name,
            buildings: await buildBuildings(site.id)
        })
    }
    return siteNavigation
};

async function buildBuildings (site_id) {
    const buildings = await fetchBuildings(site_id);
    let buildingNavigation = []
    for (const building of buildings) {
        buildingNavigation.push({
            id: building.id,
            name: building.name,
            systems: await buildSystems(building.id)
        })
    }
    return buildingNavigation
};

async function buildSystems(building_id) {
    const systems = await fetchSystems(building_id)
    let systemNavigation = []
    for (const system of systems) {
        systemNavigation.push({
            id: system.id,
            name: system.name,
            equipment: await buildEquipment(system.id)
        })
    }
    return systemNavigation
}

async function buildEquipment(system_id) {
    const equipment = await fetchEquipment(system_id)
    let equipmentNavigation = []
    for (const unit of equipment) {
        equipmentNavigation.push({
            id: unit.id,
            name: unit.name,
        })
    }
    return equipmentNavigation
}

function fetchSites (site_id) {
    return new Promise((resolve, reject )=> {
        const queryValues = [site_id];
        const queryText = `
            SELECT "site"."id", "site"."name" FROM "site"
            WHERE "site"."id" = $1
            ORDER BY "site"."id" ASC
        ;`
        pool.query(queryText, queryValues)
        .then((result) => { 
            resolve(result.rows)
        })
        .catch((error) => { 
            reject(error);
        });
    })
}

function fetchBuildings (site_id) {
    return new Promise((resolve, reject )=> {
        const queryValues = [site_id];
        const queryText = `
            SELECT "building"."id", "building"."name" FROM "building"
            WHERE "building"."site_id" = $1
            ORDER BY "building"."id" ASC
        ;`
        pool.query(queryText, queryValues)
        .then((result) => { 
            resolve(result.rows)
        })
        .catch((error) => { 
            reject(error);
        });
    })
}

function fetchSystems (building_id) {
    return new Promise((resolve, reject )=> {
        const queryValues = [building_id];
        const queryText = `
            SELECT "system"."id", "system"."name" FROM "system"
            WHERE "system"."building_id" = $1
            ORDER BY "system"."id" ASC
        ;`
        pool.query(queryText, queryValues)
        .then((result) => { 
            resolve(result.rows);
        })
        .catch((error) => { 
            reject(error);
        });
    })
}

function fetchEquipment (system_id) {
    return new Promise((resolve, reject )=> {
        const queryValues = [system_id];
        const queryText = `
            SELECT "equipment"."id", "equipment"."name" FROM "equipment"
            WHERE "equipment"."system_id" = $1
            ORDER BY "equipment"."id" ASC
        ;`
        pool.query(queryText, queryValues)
        .then((result) => { 
            resolve(result.rows);
        })
        .catch((error) => { 
            reject(error);
        });
    })
}

router.get('/:table/:id', rejectUnauthenticated, (req, res) => {

    console.log(req.params.table);
    console.log(req.params.id);
    
    const queryValues = [req.params.id];
    let queryText = ''
    switch (req.params.table) {
        case 'site':
            queryText = `
                SELECT "site"."id" FROM "site"
                WHERE "site"."id"=$1
            ;`
            break;
        case 'building':
            queryText = `
                SELECT "site"."id" FROM "building"
                JOIN "site" ON "building"."site_id"="site"."id"
                WHERE "building"."id"=$1
            ;`
            break;
        case 'system':
            queryText = `
                SELECT "site"."id" FROM "system"
                JOIN "building" ON "system"."building_id"="building"."id"
                JOIN "site" ON "building"."site_id"="site"."id"
                WHERE "system"."id"=$1
            ;`
            break;
        case 'equipment':
            queryText = `
                SELECT "site"."id" FROM "equipment"
                JOIN "system" ON "equipment"."system_id"="system"."id"
                JOIN "building" ON "system"."building_id"="building"."id"
                JOIN "site" ON "building"."site_id"="site"."id"
                WHERE "equipment"."id"=$1
            ;`
            break;
        default:
    }
    pool.query(queryText, queryValues)
    .then((result) => { 
        console.log(result.rows);
        async function buildNavigationTree() {
            const navigation = await buildSites(result.rows[0].id)
            res.send(navigation);
        }
        buildNavigationTree();
    })
    .catch((error) => { 
    });

});

module.exports = router;