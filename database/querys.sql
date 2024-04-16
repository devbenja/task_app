/*Tasks Database Querys*/ 


CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

SELECT * FROM "users";


CREATE TABLE "tasks" (
    id_task SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT 
);