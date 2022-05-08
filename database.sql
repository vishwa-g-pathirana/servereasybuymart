CREATE DATABASE easybuymart;

-- user table create

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    username VARCHAR(255),
    pword VARCHAR(255)

);

--product table create

CREATE TABLE product(
    prod_id SERIAL PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    price INT,
    quentity INT,
    quality VARCHAR(255),
    sellername VARCHAR(255),
    display INT,

);