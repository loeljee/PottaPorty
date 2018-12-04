DROP DATABASE IF EXISTS Bathroom;
CREATE DATABASE Bathroom;
USE Bathroom;

CREATE TABLE Bathroom
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

INSERT INTO Bathroom.Bathroom (name, street, city, state, country, comment) 
VALUES ('Mcdonalds bathroom', '123 main street', 'Escondido', 'CA', 'United States', 'This is the greatest bathroom ever');
