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
('1', 'Building 1', 'Air Handling System', 'Room 102', 'AHU 1'),
('1', 'Building 1', 'Air Handling System', 'Room 102', 'AHU 2'),
('1', 'Building 1', 'Air Handling System', 'Room 102', 'AHU 3'),
('1', 'Building 1', 'Air Handling System', 'Room 102', 'AHU 4'),
('1', 'Building 1', 'Air Handling System', 'Room 206', 'AHU 5'),
('1', 'Building 1', 'Air Handling System', 'Room 206', 'AHU 6'),
('1', 'Building 1', 'Air Handling System', 'Room 206', 'AHU 7'),
('1', 'Building 1', 'Air Handling System', 'Room 206', 'AHU 8'),
('1', 'Building 1', 'Air Handling System', 'Room 206', 'AHU 9'),
('1', 'Building 1', 'Air Handling System', 'Room 206', 'AHU 10'),
('1', 'Building 1', 'Air Handling System', 'Room 240', 'AHU 11'),
('1', 'Building 1', 'Air Handling System', 'Room 240', 'AHU 12'),
('1', 'Building 1', 'Air Handling System', 'Room 240', 'AHU 13'),
('1', 'Building 1', 'Air Handling System', 'Room 301', 'AHU 14'),
('1', 'Building 1', 'Air Handling System', 'Room 301', 'AHU 15'),
('1', 'Building 1', 'Air Handling System', 'Roof', 'AHU 16'),
('1', 'Building 1', 'Air Handling System', 'Roof', 'AHU 17'),
('1', 'Building 1', 'Air Handling System', 'Roof', 'AHU 18'),
('1', 'Building 1', 'Air Handling System', 'Roof', 'AHU 19'),
('1', 'Building 1', 'Air Handling System', 'Roof', 'AHU 20'),
('1', 'Building 1', 'Air Handling System', 'Roof', 'AHU 21'),
('1', 'Building 1', 'Air Handling System', 'Roof', 'AHU 22'),
('1', 'Building 1', 'Air Handling System', 'Roof', 'AHU 23'),
('1', 'Building 2', 'Air Handling System', 'Basement', 'AHU 24'),
('1', 'Building 2', 'Air Handling System', 'Basement', 'AHU 25'),
('1', 'Building 2', 'Air Handling System', 'Basement', 'AHU 26'),
('1', 'Building 2', 'Air Handling System', 'Basement', 'AHU 27'),
('1', 'Building 2', 'Air Handling System', 'Basement', 'AHU 28'),
('1', 'Building 2', 'Air Handling System', 'Room 113', 'AHU 29'),
('1', 'Building 2', 'Air Handling System', 'Room 113', 'AHU 30'),
('1', 'Building 2', 'Air Handling System', 'Room 113', 'AHU 31'),
('1', 'Building 2', 'Air Handling System', 'Room 113', 'AHU 32'),
('1', 'Building 2', 'Air Handling System', 'Room 113', 'AHU 33'),
('1', 'Building 2', 'Air Handling System', 'Room 113', 'AHU 34'),
('1', 'Building 2', 'Air Handling System', 'Roof', 'AHU 35'),
('1', 'Building 2', 'Air Handling System', 'Roof', 'AHU 36'),
('1', 'Building 2', 'Air Handling System', 'Roof', 'AHU 37'),
('1', 'Building 3', 'Air Handling System', 'Room 114', 'AHU 38'),
('1', 'Building 3', 'Air Handling System', 'Room 114', 'AHU 39'),
('1', 'Building 3', 'Air Handling System', 'Room 114', 'AHU 40'),
('1', 'Building 3', 'Air Handling System', 'Room 114', 'AHU 41'),
('1', 'Building 3', 'Air Handling System', 'Room 114', 'AHU 42'),
('1', 'Building 3', 'Air Handling System', 'Room 114', 'AHU 43'),
('1', 'Building 3', 'Air Handling System', 'Room 210', 'AHU 44'),
('1', 'Building 3', 'Air Handling System', 'Room 210', 'AHU 45'),
('1', 'Building 3', 'Air Handling System', 'Room 210', 'AHU 46'),
('1', 'Building 3', 'Air Handling System', 'Room 210', 'AHU 47'),
('1', 'Building 3', 'Air Handling System', 'Roof', 'AHU 48'),
('1', 'Building 4', 'Air Handling System', 'Room 104', 'AHU 49'),
('1', 'Building 4', 'Air Handling System', 'Roof', 'AHU 50'),
('1', 'Building 4', 'Air Handling System', 'Roof', 'AHU 51'),
('1', 'Building 4', 'Air Handling System', 'Roof', 'AHU 52')
;