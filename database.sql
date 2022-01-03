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
    "site_id" INT NOT NULL,
    "type_id" INT,
    "name" VARCHAR (80),
    FOREIGN KEY ("site_id") REFERENCES "site"("id")
    FOREIGN KEY ("type_id") REFERENCES "type"("id")
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


INSERT INTO "asset" ("site_id", "building", "system", "location", "name")
VALUES 
('1', 'Building 1', 'Heating Hot Water System', 'Room 102', 'Boiler'),
('1', 'Building 1', 'Heating Hot Water System', 'Room 102', 'HWP 1'),
('1', 'Building 1', 'Heating Hot Water System', 'Room 102', 'HWP 2'),
('1', 'Building 1', 'Heating Hot Water System', 'Room 206', 'HWP 3'),
('1', 'Building 1', 'Heating Hot Water System', 'Room 206', 'HWP 4'),
('1', 'Building 1', 'Heating Hot Water System', 'Room 206', 'HWP 5'),
('1', 'Building 1', 'Heating Hot Water System', 'Room 206', 'HWP 6'),
('1', 'Building 1', 'Heating Hot Water System', 'Room 240', 'HWP 7'),
('1', 'Building 1', 'Heating Hot Water System', 'Room 240', 'HWP 8'),
('1', 'Building 1', 'Heating Hot Water System', 'Room 240', 'HWP 9'),

('1', 'Building 2', 'Heating Hot Water System', 'Basement', 'Boiler 1'),
('1', 'Building 2', 'Heating Hot Water System', 'Basement', 'Boiler 2'),
('1', 'Building 2', 'Heating Hot Water System', 'Basement', 'HWP 1'),
('1', 'Building 2', 'Heating Hot Water System', 'Basement', 'HWP 2'),
('1', 'Building 2', 'Heating Hot Water System', 'Basement', 'HWP 3'),
('1', 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 4'),
('1', 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 5'),
('1', 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 6'),
('1', 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 7'),
('1', 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 8'),
('1', 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 9'),
('1', 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 10'),
('1', 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 11'),
('1', 'Building 2', 'Heating Hot Water System', 'Room 113', 'HWP 12'),

('1', 'Building 3', 'Heating Hot Water System', 'Room 114', 'Boiler'),
('1', 'Building 3', 'Heating Hot Water System', 'Room 114', 'HWP 1'),
('1', 'Building 3', 'Heating Hot Water System', 'Room 114', 'HWP 2'),
('1', 'Building 3', 'Heating Hot Water System', 'Room 114', 'HWP 3'),

('2', 'Building 1', 'Heating Hot Water System', 'Room 114', 'Boiler'),
('2', 'Building 1', 'Heating Hot Water System', 'Room 210', 'HWP 1'),
('2', 'Building 1', 'Heating Hot Water System', 'Room 210', 'HWP 2'),
('2', 'Building 2', 'Heating Hot Water System', 'Room 210', 'HWP 3'),
('2', 'Building 2', 'Heating Hot Water System', 'Room 210', 'HWP 4'),
('2', 'Building 2', 'Heating Hot Water System', 'Room 210', 'HWP 5'),

('3', 'Building 1', 'Heating Hot Water System', 'Room 104', 'Boiler')
;