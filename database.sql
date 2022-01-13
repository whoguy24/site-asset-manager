CREATE DATABASE 'site-asset-manager';

DROP TABLE IF EXISTS "site";
DROP TABLE IF EXISTS "building";
DROP TABLE IF EXISTS "system";
DROP TABLE IF EXISTS "equipment";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" VARCHAR (1000)
);

CREATE TABLE "site" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80),
    "address" VARCHAR (80),
    "city" VARCHAR (80),
    "state" VARCHAR (80),
    "zip" VARCHAR (80),
    "description" VARCHAR (80),
    "comments" VARCHAR (80)
    ON DELETE CASCADE
);

CREATE TABLE "building" (
    "id" SERIAL PRIMARY KEY,
    "site_id" INT,
    "name" VARCHAR (80),
    "type" VARCHAR (80),
    "operating_hours" VARCHAR (80),
    "year_built" VARCHAR (80),
    "floors" VARCHAR (80),
    "description" VARCHAR (80),
    "comments" VARCHAR (80),
    FOREIGN KEY ("site_id") REFERENCES "site"("id")
    ON DELETE CASCADE
);

CREATE TABLE "system" (
    "id" SERIAL PRIMARY KEY,
    "building_id" INT,
    "name" VARCHAR (80),
    "operating_hours" VARCHAR (80),
    "sequence_of_operation" VARCHAR (80),
    "performance_metrics" VARCHAR (80),
    "recommended_set_points" VARCHAR (80),
    "description" VARCHAR (80),
    "comments" VARCHAR (80),
    FOREIGN KEY ("building_id") REFERENCES "building"("id")
    ON DELETE CASCADE
);

CREATE TABLE "equipment" (
    "id" SERIAL PRIMARY KEY,
    "system_id" INT,
    "name" VARCHAR (80),
    "location" VARCHAR (80),
    "area_served" VARCHAR (80),
    "condition" VARCHAR (80),
    "manufacturer" VARCHAR (80),
    "model_number" VARCHAR (80),
    "sequence_of_operation" VARCHAR (80),
    "amperage" VARCHAR (80),
    "voltage" VARCHAR (80),
    "BHP" VARCHAR (80),
    "BTU" VARCHAR (80),
    "CFM" VARCHAR (80),
    "MPH" VARCHAR (80),
    "VFD" VARCHAR (80),
    "horsepower" VARCHAR (80),
    "capacity" VARCHAR (80),
    "description" VARCHAR (80),
    "comments" VARCHAR (80),
    FOREIGN KEY ("system_id") REFERENCES "system"("id")
    ON DELETE CASCADE
);

INSERT INTO "site" ("name")
VALUES 
('Test Site A'),
('Test Site B'),
('Test Site C')
;

INSERT INTO "building" ("site_id","name")
VALUES 
(1, 'Building 1'),
(1, 'Building 2'),
(1, 'Building 3'),
(1, 'Building 4'),
(1, 'Building 5'),
(1, 'Building 6'),
(1, 'Building 7'),
(1, 'Building 8'),
(1, 'Building 9'),
(1, 'Building 10'),
(1, 'Building 11'),
(1, 'Building 12')
;

INSERT INTO "system" ("building_id","name")
VALUES 
(1, 'Air Handling System'),
(1, 'Chilled Water System'),
(1, 'Heating Hot Water System')
;

INSERT INTO "equipment" ("system_id", "name")
VALUES 
(1, 'AHU 1'),
(1, 'AHU 2'),
(1, 'AHU 3'),
(1, 'AHU 4'),
(1, 'AHU 5'),
(1, 'AHU 6'),
(1, 'AHU 7'),
(1, 'AHU 8'),
(1, 'AHU 9'),
(1, 'AHU 10')
;