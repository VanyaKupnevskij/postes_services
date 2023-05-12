BEGIN;
INSERT INTO postes (id, created, modified, title, text) 
            VALUES ($1, $2, $3, $4, $5);
COMMIT;