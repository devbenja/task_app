/*Tasks Database Querys*/ 


CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

SELECT * FROM "users";


