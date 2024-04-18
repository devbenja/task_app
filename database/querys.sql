/*Tasks Database Querys*/ 

CREATE TABLE "tasks" (
    id_task SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT 
);

ALTER TABLE "tasks" ADD COLUMN user_id INTEGER REFERENCES users(id_user);

INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *

DELETE FROM tasks WHERE id_task = $1

SELECT * FROM tasks

SELECT * FROM tasks WHERE id_task = $1

UPDATE tasks SET title = 'Nuevo Titulo', description = 'Nueva Desc' WHERE id_task = 4

CREATE TABLE users (
	id_user SERIAL PRIMARY KEY,
	user_name VARCHAR(255) NOT NULL,
	user_email UNIQUE VARCHAR(255),
	user_password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ADD COLUMN gravatar VARCHAR(255);