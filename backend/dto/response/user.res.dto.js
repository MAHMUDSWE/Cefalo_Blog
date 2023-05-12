const express = require('express');

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