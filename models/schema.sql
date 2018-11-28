DROP DATABASE IF EXISTS bathroom;
CREATE DATABASE bathroom;
USE bathroom;

CREATE TABLE bathrooms
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    location varchar(255) NOT NULL,
    createdAt timestamp,
    updatedAt datetime,
	PRIMARY KEY (id)
);
INSERT INTO `bathroom`.`bathrooms` (`name`, `location`) VALUES ('n1', 'l1');