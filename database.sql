CREATE DATABASE 'site-asset-manager';

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" VARCHAR (1000)
);

CREATE TABLE "site" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80)
);

CREATE TABLE "asset" (
    "id" SERIAL PRIMARY KEY,
    "site_id" INT,
    "type_id" INT,
    "building" VARCHAR (80),
    "system" VARCHAR (80),
    "location" VARCHAR (80),
    "name" VARCHAR (80),
    FOREIGN KEY ("site_id") REFERENCES "site"("id")
);

CREATE TABLE "property" (
    "id" SERIAL PRIMARY KEY,
    "asset_id" INT NOT NULL,
    "name" VARCHAR (80),
    "unit" VARCHAR (80),
    "value" VARCHAR (80),
    FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE TABLE "photo" (
    "id" SERIAL PRIMARY KEY,
    "asset_id" INT NOT NULL,
    "url" VARCHAR (200),
    FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE TABLE "activity" (
    "id" SERIAL PRIMARY KEY,
    "asset_id" INT NOT NULL,
    "description" VARCHAR (200),
    "comments" VARCHAR (200),
    "status" VARCHAR (80),
    FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE TABLE "step" (
    "id" SERIAL PRIMARY KEY,
    "asset_id" INT NOT NULL,
    "activity_id" INT NOT NULL,
    "description" VARCHAR (200),
    "comments" VARCHAR (200),
    "status" BOOLEAN,
    FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE TABLE "ecm" (
    "id" SERIAL PRIMARY KEY,
    "asset_id" INT NOT NULL,
    "description" VARCHAR (200),
    "comments" VARCHAR (200),
    "status" VARCHAR (80),
    FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE TABLE "issue" (
    "id" SERIAL PRIMARY KEY,
    "asset_id" INT NOT NULL,
    "description" VARCHAR (200),
    "resolution" VARCHAR (200),
    "comments" VARCHAR (200),
    "status" VARCHAR (80),
    FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

INSERT INTO "site" ("name")
VALUES 
('Site A'),
('Site B'),
('Site C')
;


INSERT INTO "asset" ("site_id", "building", "system", "location", "name")
VALUES 
(1, 'Building 1', 'Air Handling System', 'Room 102', 'AHU 1'),
(1, 'Building 1', 'Air Handling System', 'Room 102', 'AHU 2'),
(1, 'Building 1', 'Air Handling System', 'Room 206', 'AHU 3'),
(1, 'Building 1', 'Air Handling System', 'Room 206', 'AHU 4'),
(1, 'Building 1', 'Air Handling System', 'Room 206', 'AHU 5'),
(1, 'Building 1', 'Air Handling System', 'Room 206', 'AHU 6'),
(1, 'Building 1', 'Air Handling System', 'Room 240', 'AHU 7'),
(1, 'Building 1', 'Air Handling System', 'Room 240', 'AHU 8'),
(1, 'Building 1', 'Air Handling System', 'Room 240', 'AHU 9'),
(1, 'Building 2', 'Air Handling System', 'Basement', 'AHU 10'),
(1, 'Building 2', 'Air Handling System', 'Basement', 'AHU 11'),
(1, 'Building 2', 'Air Handling System', 'Basement', 'AHU 12'),
(1, 'Building 2', 'Air Handling System', 'Room 113', 'AHU 13'),
(1, 'Building 2', 'Air Handling System', 'Room 113', 'AHU 14'),
(1, 'Building 2', 'Air Handling System', 'Room 113', 'AHU 15'),
(1, 'Building 2', 'Air Handling System', 'Room 113', 'AHU 16'),
(1, 'Building 2', 'Air Handling System', 'Room 113', 'AHU 17'),
(1, 'Building 2', 'Air Handling System', 'Room 113', 'AHU 18'),
(1, 'Building 2', 'Air Handling System', 'Room 113', 'AHU 19'),
(1, 'Building 2', 'Air Handling System', 'Room 113', 'AHU 20'),
(1, 'Building 2', 'Air Handling System', 'Room 113', 'AHU 21'),
(1, 'Building 3', 'Air Handling System', 'Room 114', 'AHU 22'),
(1, 'Building 3', 'Air Handling System', 'Room 114', 'AHU 23'),
(1, 'Building 3', 'Air Handling System', 'Room 114', 'AHU 24'),
(1, 'Building 1', 'Chilled Water System', 'Room 102', 'CWP 1'),
(1, 'Building 1', 'Chilled Water System', 'Room 102', 'CWP 2'),
(1, 'Building 1', 'Chilled Water System', 'Room 206', 'CWP 3'),
(1, 'Building 1', 'Chilled Water System', 'Room 206', 'CWP 4'),
(1, 'Building 1', 'Chilled Water System', 'Room 206', 'CWP 5'),
(1, 'Building 1', 'Chilled Water System', 'Room 206', 'CWP 6'),
(1, 'Building 1', 'Chilled Water System', 'Room 240', 'CWP 7'),
(1, 'Building 1', 'Chilled Water System', 'Room 240', 'CWP 8'),
(1, 'Building 1', 'Chilled Water System', 'Room 240', 'CWP 9'),
(1, 'Building 2', 'Chilled Water System', 'Basement', 'CWP 1'),
(1, 'Building 2', 'Chilled Water System', 'Basement', 'CWP 2'),
(1, 'Building 2', 'Chilled Water System', 'Basement', 'CWP 3'),
(1, 'Building 2', 'Chilled Water System', 'Room 113', 'CWP 4'),
(1, 'Building 2', 'Chilled Water System', 'Room 113', 'CWP 5'),
(1, 'Building 2', 'Chilled Water System', 'Room 113', 'CWP 6'),
(1, 'Building 2', 'Chilled Water System', 'Room 113', 'CWP 7'),
(1, 'Building 2', 'Chilled Water System', 'Room 113', 'CWP 8'),
(1, 'Building 2', 'Chilled Water System', 'Room 113', 'CWP 9'),
(1, 'Building 2', 'Chilled Water System', 'Room 113', 'CWP 10'),
(1, 'Building 2', 'Chilled Water System', 'Room 113', 'CWP 11'),
(1, 'Building 2', 'Chilled Water System', 'Room 113', 'CWP 12'),
(1, 'Building 3', 'Chilled Water System', 'Room 114', 'CWP 1'),
(1, 'Building 3', 'Chilled Water System', 'Room 114', 'CWP 2'),
(1, 'Building 3', 'Chilled Water System', 'Room 114', 'CWP 3'),
(2, 'Building 1', 'Chilled Water System', 'Room 210', 'CWP 1'),
(2, 'Building 1', 'Chilled Water System', 'Room 210', 'CWP 2'),
(2, 'Building 2', 'Chilled Water System', 'Room 210', 'CWP 3'),
(2, 'Building 2', 'Chilled Water System', 'Room 210', 'CWP 4'),
(2, 'Building 2', 'Chilled Water System', 'Room 210', 'CWP 5'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 102', 'Boiler'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 102', 'HWP 1'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 102', 'HWP 2'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 206', 'HWP 3'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 206', 'HWP 4'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 206', 'HWP 5'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 206', 'HWP 6'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 240', 'HWP 7'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 240', 'HWP 8'),
(1, 'Building 1', 'Heating Hot Water System', 'Room 240', 'HWP 9'),
(1, 'Building 2', 'Heating Hot Water System', 'Basement', 'Boiler 1'),
(1, 'Building 2', 'Heating Hot Water System', 'Basement', 'Boiler 2'),
(1, 'Building 2', 'Heating Hot Water System', 'Basement', 'HWP 1'),
(1, 'Building 2', 'Heating Hot Water System', 'Basement', 'HWP 2'),
(1, 'Building 2', 'Heating Hot Water System', 'Basement', 'HWP 3'),
(1, 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 4'),
(1, 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 5'),
(1, 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 6'),
(1, 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 7'),
(1, 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 8'),
(1, 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 9'),
(1, 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 10'),
(1, 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 11'),
(1, 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 12'),
(1, 'Building 3', 'Heating Hot Water System', 'Room 114', 'Boiler'),
(1, 'Building 3', 'Heating Hot Water System', 'Room 114', 'HWP 1'),
(1, 'Building 3', 'Heating Hot Water System', 'Room 114', 'HWP 2'),
(1, 'Building 3', 'Heating Hot Water System', 'Room 114', 'HWP 3'),
(2, 'Building 1', 'Heating Hot Water System', 'Room 114', 'Boiler'),
(2, 'Building 1', 'Heating Hot Water System', 'Room 210', 'HWP 1'),
(2, 'Building 1', 'Heating Hot Water System', 'Room 210', 'HWP 2'),
(2, 'Building 2', 'Heating Hot Water System', 'Room 210', 'HWP 3'),
(2, 'Building 2', 'Heating Hot Water System', 'Room 210', 'HWP 4'),
(2, 'Building 2', 'Heating Hot Water System', 'Room 210', 'HWP 5'),
(3, 'Building 1', 'Heating Hot Water System', 'Room 104', 'Boiler')
;