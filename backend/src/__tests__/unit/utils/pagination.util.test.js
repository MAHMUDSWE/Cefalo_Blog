const { pagination, totalPages, currentPage } = require('../../../utils/pagination.util');

describe('Utils', () => {
    describe('pagination', () => {
        it('should return the offset and limit values', () => {
            const paginationParameter = {
                page: 2,
                limit: 10,
            };

            const result = pagination(paginationParameter);

            expect(result).toEqual({
                offset: 10,
                limit: 10,
            });
        });

        it('should set default values if page or limit is missing', () => {
            const paginationParameter = {
                page: undefined,
                limit: undefined,
            };

            const result = pagination(paginationParameter);

            expect(result).toEqual({
                offset: 0,
                limit: 10,
            });
        });
    });

    describe('totalPages', () => {
        it('should calculate the total number of pages', () => {
            const count = 25;
            const limit = 10;

            const result = totalPages(count, limit);

            expect(result).toBe(3);
        });
    });

    describe('currentPage', () => {
        it('should calculate the current page number', () => {
            const offset = 20;
            const limit = 10;

            const result = currentPage(offset, limit);

            expect(result).toBe(3);
        });
    });
});
