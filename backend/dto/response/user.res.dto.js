const express = require('express');

class UserDTO {
    constructor({ userid, name, email, username, password, createdAt, updatedAt }) {
        this.userid = userid;
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