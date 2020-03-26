CREATE DATABASE eatthatburger_db;

USE eatthatburger_db;

CREATE TABLE burger(
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(255) NOT NULL,
    devoured BOOL DEFAULT false,
    PRIMARY KEY (id)
);
