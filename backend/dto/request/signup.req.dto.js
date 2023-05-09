const express = require('express');

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