const express = require('express');

const pagination = ({ page, limit }) => {

    page = parseInt(page > 0 ? page : 1);
    limit = parseInt(limit > 0 ? limit : 10, 10);

    const offset = (page - 1) * limit;

    return {
        offset,
        limit
    }
}

const totalPages = (count, limit) => {
    return Math.ceil(count / limit);
}

const currentPage = (offset, limit) => {
    return Math.ceil((offset / limit + 1));
}

module.exports = {
    pagination,
    totalPages,
    currentPage
}