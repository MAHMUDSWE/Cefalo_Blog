const UserRepository = require('../../../repositories/user.repository');
const User = require('../../../models/user.model');

jest.mock('../../../models/user.model');


describe('User Repository', () => {
    let user;

    beforeEach(() => {
        user = {
            userid: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUser', () => {
        it('should return all users with pagination parameters', async () => {
            const offset = 0;
            const limit = 10;
            const expectedResult = {
                count: 2,
                rows: [user],
            };

            User.findAndCountAll.mockResolvedValue(expectedResult);

            const result = await UserRepository.getAllUser(offset, limit);

            expect(User.findAndCountAll).toHaveBeenCalledWith({
                offset,
                limit,
                order: [['createdAt', 'DESC']],
            });
            expect(result).toEqual(expectedResult);
        });
    });

    describe('getUserByUsername', () => {
        it('should return the user with the given username', async () => {
            User.findOne.mockResolvedValue(user);

            const result = await UserRepository.getUserByUsername(user.username);

            expect(User.findOne).toHaveBeenCalledWith({ where: { username: user.username } });
            expect(result).toEqual(user);
        });

        it('should return null if the user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            const result = await UserRepository.getUserByUsername(user.username);

            expect(User.findOne).toHaveBeenCalledWith({ where: { username: user.username } });
            expect(result).toBeNull();
        });
    });

    describe('getUserById', () => {
        it('should return the user with the given ID', async () => {
            User.findOne.mockResolvedValue(user);

            const result = await UserRepository.getUserById(user.userid);

            expect(User.findOne).toHaveBeenCalledWith({ where: { userid: user.userid } });
            expect(result).toEqual(user);
        });

        it('should return null if the user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            const result = await UserRepository.getUserById(user.userid);

            expect(User.findOne).toHaveBeenCalledWith({ where: { userid: user.userid } });
            expect(result).toBeNull();
        });
    });

    describe('getUserByEmail', () => {
        it('should return the user with the given email', async () => {
            User.findOne.mockResolvedValue(user);

            const result = await UserRepository.getUserByEmail(user.email);

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: user.email } });
            expect(result).toEqual(user);
        });

        it('should return null if the user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            const result = await UserRepository.getUserByEmail(user.email);

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: user.email } });
            expect(result).toBeNull();
        });
    });

    describe('updateUser', () => {
        it('should update the user with the given fields', async () => {
            // Arrange
            const user = {
                // user properties
                update: jest.fn(), // Define update as a mock function
            };
            const updateFields = {
                // fields to update
            };
            const updatedUser = { ...user, ...updateFields };
            user.update.mockResolvedValue(updatedUser); // Mock the resolved value

            // Act
            const result = await UserRepository.updateUser(user, updateFields);

            // Assert
            expect(user.update).toHaveBeenCalledWith(updateFields);
            expect(result).toEqual(updatedUser);
        });

    });

    describe('deleteUser', () => {
        it('should delete the user with the given ID', async () => {
            UserRepository.deleteUser(user.userid);

            expect(User.destroy).toHaveBeenCalledWith({ where: { userid: user.userid } });
        });
    });
});
