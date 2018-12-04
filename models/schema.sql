DROP DATABASE IF EXISTS bathroom;
CREATE DATABASE bathroom;
USE bathroom;

CREATE TABLE bathrooms
(
	id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    street varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    comment varchar(255) NOT NULL,
    createdAt timestamp,
	PRIMARY KEY (id)
);

INSERT INTO bathroom.bathrooms (name, street, city, state, country, comment) 
VALUES ('Mcdonalds bathroom', '123 main street', 'Escondido', 'CA', 'United States', 'This is the greatest bathroom ever');
