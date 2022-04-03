
CREATE SCHEMA IF NOT EXISTS word_schema;

CREATE TABLE word_schema.words (
	id serial4 NOT NULL,
	word varchar NOT NULL
);

INSERT INTO word_schema.words (word) VALUES ('first_word'), ('second_word'),('new_from_postman');