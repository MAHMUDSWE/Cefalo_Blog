/**
 * Module representing DTOs for signup requests
 * @module DTO/request/signup
 */

const express = require('express');

/**
 * Signup Request DTO (Data Transfer Object)
 * @class
 * @property {string} name - The name of the user
 * @property {string} email - The email of the user
 * @property {string} username - The username of the user
 * @property {string} password - The password of the user
 * @property {string} confirmPassword - The confirm password of the user
 */
class SignupReqDTO {
    constructor({ name, email, username, password, confirmPassword }) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword
    }
}

module.exports = {
    SignupReqDTO
}
