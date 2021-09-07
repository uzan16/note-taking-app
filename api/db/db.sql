BEGIN;

CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> e5039ab7baeb

CREATE TABLE notes (
    id SERIAL NOT NULL, 
    content TEXT NOT NULL, 
    tags JSON NOT NULL, 
    PRIMARY KEY (id)
);

INSERT INTO alembic_version (version_num) VALUES ('e5039ab7baeb');

COMMIT;

