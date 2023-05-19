/**
 * Utility functions for the application.
 * @module Utils
 */
const express = require('express');

/**
 * Extracts offset and limit values from pagination parameters and returns them as an object.
 * @param {Object} paginationParameter - Object containing page and limit values.
 * @param {number} paginationParameter.page - The page number.
 * @param {number} paginationParameter.limit - The maximum number of items to return per page.
 * @returns {Object} An object containing offset and limit values.
 * @throws {HttpError} If page or limit is not a positive integer.
 */

const pagination = ({ page, limit }) => {

    page = parseInt(page > 0 ? page : 1);
    limit = parseInt(limit > 0 ? limit : 10, 10);

    const offset = (page - 1) * limit;

    return {
        offset,
        limit
    }
}

/**
 * Calculates the total number of pages based on the count of items and the limit of items per page.
 * @param {number} count - The total number of items.
 * @param {number} limit - The maximum number of items to return per page.
 * @returns {number} The total number of pages.
 */

const totalPages = (count, limit) => {
    return Math.ceil(count / limit);
}

/**
 * Calculates the current page number based on the offset and the limit of items per page.
 * @param {number} offset - The number of items to skip before returning results.
 * @param {number} limit - The maximum number of items to return per page.
 * @returns {number} The current page number.
 */

const currentPage = (offset, limit) => {
    return Math.ceil((offset / limit + 1));
}

module.exports = {
    pagination,
    totalPages,
    currentPage
}