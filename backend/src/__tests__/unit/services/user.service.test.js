const {
    getAllUser,
    getUserByUsername,
    updateUser,
    deleteUser
} = require('../../../services/user.service');
const userRepository = require('../../../repositories/user.repository');
const { UserDTO } = require('../../../dto/response/user.res.dto');
const { StatusCode, HttpError } = require('../../../utils/commonObject.util');

jest.mock('../../../repositories/user.repository');

describe('getAllUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve all users', async () => {
        const paginationParameter = { page: 1, pageSize: 10 };
        const offset = 0;
        const limit = 10;
        const count = 5;
        const rows = [
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
            { id: 3, name: 'User 3' },
            { id: 4, name: 'User 4' },
            { id: 5, name: 'User 5' }
        ];
        const expectedUsers = rows.map(user => new UserDTO(user));
        const expectedResponse = {
            users: expectedUsers,
            currentPage: 1,
            totalPages: 1,
            totalUsers: count
        };

        userRepository.getAllUser.mockResolvedValue({ count, rows });

        const result = await getAllUser(paginationParameter);

        expect(userRepository.getAllUser).toHaveBeenCalledWith(offset, limit);
        expect(result).toEqual(expectedResponse);
    });

    it('should return empty array if no users found', async () => {
        const paginationParameter = { page: 1, pageSize: 10 };
        const offset = 0;
        const limit = 10;
        const count = 0;
        const rows = [];

        userRepository.getAllUser.mockResolvedValue({ count, rows });

        const result = await getAllUser(paginationParameter);

        expect(userRepository.getAllUser).toHaveBeenCalledWith(offset, limit);
        expect(result).toEqual(rows);
    });

});

describe('getUserByUsername', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve a user by username', async () => {
        const username = 'testuser';
        const user = { id: 1, username: 'testuser' };
        const expectedUser = new UserDTO(user);

        userRepository.getUserByUsername.mockResolvedValue(user);

        const result = await getUserByUsername(username);

        expect(userRepository.getUserByUsername).toHaveBeenCalledWith(username);
        expect(result).toEqual(expectedUser);
    });

    it('should throw HttpError if user not found', async () => {
        const username = 'testuser';

        userRepository.getUserByUsername.mockResolvedValue(null);

        await expect(getUserByUsername(username)).rejects.toThrow(
            new HttpError(StatusCode.NOT_FOUND, 'User not found')
        );
    });
});

describe('updateUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a user by ID', async () => {
        const userid = 1;
        const updateFields = { name: 'Updated User' };
        const user = { id: 1, name: 'User' };
        const updatedUser = { id: 1, name: 'Updated User' };
        const expectedUserDTO = new UserDTO(updatedUser);

        userRepository.getUserById.mockResolvedValue(user);
        userRepository.updateUser.mockResolvedValue(updatedUser);

        const result = await updateUser(userid, updateFields);

        expect(userRepository.getUserById).toHaveBeenCalledWith(userid);
        expect(userRepository.updateUser).toHaveBeenCalledWith(user, updateFields);
        expect(result).toEqual(expectedUserDTO);
    });

    it('should throw HttpError if user not found', async () => {
        const userid = 1;
        const updateFields = { name: 'Updated User' };

        userRepository.getUserById.mockResolvedValue(null);

        await expect(updateUser(userid, updateFields)).rejects.toThrow(
            new HttpError(StatusCode.NOT_FOUND, `User with id ${userid} not found`)
        );
    });
});

describe('deleteUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete the user with the specified ID', async () => {
        const userid = 123;

        userRepository.getUserById.mockResolvedValue({ id: userid });
        userRepository.deleteUser.mockResolvedValue();

        await expect(deleteUser(userid)).resolves.toBeUndefined();

        expect(userRepository.getUserById).toHaveBeenCalledWith(userid);
        expect(userRepository.deleteUser).toHaveBeenCalledWith(userid);
    });

    it('should throw HttpError if user with the specified ID is not found', async () => {
        const userid = 123;

        userRepository.getUserById.mockResolvedValue(null);

        await expect(deleteUser(userid)).rejects.toThrow(
            new HttpError(StatusCode.NOT_FOUND, `User with id ${userid} not found`)
        );

        expect(userRepository.getUserById).toHaveBeenCalledWith(userid);
        expect(userRepository.deleteUser).not.toHaveBeenCalled();
    });

})