DROP DATABASE IF EXISTS bathroom;
CREATE DATABASE bathroom;
USE bathroom;

CREATE TABLE bathrooms
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    location varchar(255) NOT NULL,
    keyRequired BOOLEAN DEFAULT false,
    doorCode INTEGER(11) NULL,
    cleanliness INTEGER(10) NULL,
    seperatedByGender BOOLEAN DEFAULT true,
    changingTable BOOLEAN DEFAULT false,
    privacy INTEGER(10) NULL,
    tpSoftness INTEGER(10) NULL,
    createdAt timestamp,
    updatedAt datetime,
	PRIMARY KEY (id)
);

INSERT INTO bathroom.bathrooms (name, location, keyRequired, doorCode, cleanliness, seperatedByGender, changingTable, privacy, tpSoftness) 
VALUES ('UCSD 1st floor Bathroom', '6256 Greenwich Dr San Diego, CA 92122', false, NULL, 9, TRUE, false, 10, 8);
