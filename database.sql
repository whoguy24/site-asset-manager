CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    role character varying(1000)
);

CREATE TABLE site (
    id SERIAL PRIMARY KEY,
    name character varying(80),
    address character varying(80),
    city character varying(80),
    state character varying(80),
    zip character varying(80),
    description character varying(80),
    comments character varying(80)
);

CREATE TABLE building (
    id SERIAL PRIMARY KEY,
    site_id integer REFERENCES site(id) ON DELETE CASCADE,
    name character varying(80),
    type character varying(80),
    operating_hours character varying(80),
    year_built character varying(80),
    floors character varying(80),
    description character varying(80),
    comments character varying(80)
);

CREATE TABLE system (
    id SERIAL PRIMARY KEY,
    building_id integer REFERENCES building(id) ON DELETE CASCADE,
    name character varying(80),
    operating_hours character varying(80),
    sequence_of_operation character varying(80),
    performance_metrics character varying(80),
    recommended_set_points character varying(80),
    description character varying(80),
    comments character varying(80)
);

CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    system_id integer REFERENCES system(id) ON DELETE CASCADE,
    name character varying(80),
    location character varying(80),
    area_served character varying(80),
    condition character varying(80),
    manufacturer character varying(80),
    model_number character varying(80),
    sequence_of_operation character varying(80),
    amperage character varying(80),
    voltage character varying(80),
    "BHP" character varying(80),
    "BTU" character varying(80),
    "CFM" character varying(80),
    "MPH" character varying(80),
    "VFD" character varying(80),
    horsepower character varying(80),
    capacity character varying(80),
    description character varying(80),
    comments character varying(80)
);

CREATE TABLE activity (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    activity character varying(80),
    description character varying(80),
    equipment_id integer REFERENCES equipment(id) ON DELETE CASCADE,
    due_date character varying(80),
    status character varying(80),
    user_id integer
);

CREATE TABLE ecm (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    equipment_id integer REFERENCES equipment(id) ON DELETE CASCADE,
    ecm character varying(400),
    comments character varying(400),
    status character varying(200),
    date_identified character varying(200),
    user_id integer
);

CREATE TABLE issue (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    equipment_id integer REFERENCES equipment(id) ON DELETE CASCADE,
    issue character varying(200),
    resolution character varying(200),
    date_identified character varying(80),
    status character varying(80),
    comments character varying(200),
    user_id integer
);

CREATE TABLE step (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    activity_id integer REFERENCES activity(id) ON DELETE CASCADE,
    complete boolean,
    step character varying(100),
    comments character varying(100),
    user_id integer
);

INSERT INTO "site" ("name")
VALUES 
('My Site')
;