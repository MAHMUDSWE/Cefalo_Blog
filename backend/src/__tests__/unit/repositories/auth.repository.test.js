const User = require('../../../models/user.model');
const { userRegistration } = require('../../../repositories/auth.repository');

jest.mock('../../../models/user.model');

describe('Auth Repository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('userRegistration', () => {
        test('should create a new user', async () => {
            const newUser = {
                userid: '123',
                name: 'John Doe',
                email: 'john.doe@example.com',
                username: 'johndoe',
                password: 'password123',
            };

            User.create.mockResolvedValue(newUser);

            const result = await userRegistration(newUser);

            expect(User.create).toHaveBeenCalledWith(newUser);
            expect(result).toEqual(newUser);
        });

        test('should throw an error if user creation fails', async () => {
            const newUser = {
                userid: '123',
                name: 'John Doe',
                email: 'john.doe@example.com',
                username: 'johndoe',
                password: 'password123',
            };

            const error = new Error('Failed to create user');

            User.create.mockRejectedValue(error);

            await expect(userRegistration(newUser)).rejects.toThrow(error);
            expect(User.create).toHaveBeenCalledWith(newUser);
        });
    });
});
