BEGIN;

DECLARE postes_id;
DECLARE created;
DECLARE modified;
DECLARE title;
DECLARE text;

SET postes_id = ?;
SET created = ?;
SET modified = ?;
SET title = ?;
SET text = "Some text";

INSERT INTO postes (id, created, modified, title, text) 
            VALUES (postes_id, created, modified, title, text);
-- INSERT INTO tags (userid, bio, homepage) 
--   VALUES(LAST_INSERT_ID(),'Hello world!', 'http://www.stackoverflow.com');
COMMIT;