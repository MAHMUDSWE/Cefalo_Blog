
/**
 * Module representing DTOs for signup requests
 * @module DTO/response/user
 */
const express = require('express');

/**
 * User Data Transfer Object
 * @class UserDTO
 * @property {string} name - User's name
 * @property {string} email - User's email address
 * @property {string} username - User's unique username
 * @property {string} password - User's password (not enumerable)
 * @property {string} createdAt - User's creation date
 * @property {string} updatedAt - User's last update date
 */

class UserDTO {
    constructor({ name, email, username, password, createdAt, updatedAt }) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

        Object.defineProperty(this, "password", {
            enumerable: false,
        });
    }
}

module.exports = {
    UserDTO
}