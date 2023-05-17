const { isPublicRoute } = require('../../../utils/publicRoute.util');

describe('Utils', () => {
    describe('isPublicRoute', () => {
        it('should return true for public routes', () => {
            const req = {
                originalUrl: '/api/v1/user/login',
                method: 'GET',
            };

            const result = isPublicRoute(req);

            expect(result).toBe(true);
        });

        it('should return true for public routes with GET request', () => {
            const req = {
                originalUrl: '/api/v1/blog',
                method: 'GET',
            };

            const result = isPublicRoute(req);

            expect(result).toBe(true);
        });

        it('should return false for non-public routes', () => {
            const req = {
                originalUrl: '/api/v1/user',
                method: 'POST',
            };

            const result = isPublicRoute(req);

            expect(result).toBe(false);
        });
    });
});
