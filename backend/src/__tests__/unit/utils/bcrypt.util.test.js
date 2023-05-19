const bcrypt = require('bcryptjs');
const { hashPassword, verifyPassword } = require('../../../utils/bcrypt.util');

jest.mock('bcryptjs');

describe('Utils', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('hashPassword', () => {
        it('should hash a password', async () => {
            const password = 'password123';
            const hashedPassword = 'hashed-password';

            bcrypt.hash.mockResolvedValue(hashedPassword);

            const result = await hashPassword(password);

            expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
            expect(result).toBe(hashedPassword);
        });
    });

    describe('verifyPassword', () => {
        it('should verify a password against a hash', async () => {
            const password = 'password123';
            const hashedPassword = 'hashed-password';

            bcrypt.compare.mockResolvedValue(true);

            const result = await verifyPassword(password, hashedPassword);

            expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
            expect(result).toBe(true);
        });
    });
});
