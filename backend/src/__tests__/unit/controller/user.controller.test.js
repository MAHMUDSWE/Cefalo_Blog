const { getAllUser, getUserByUsername, updateUser, deleteUser } = require('../../../controllers/user.controller');
const userService = require('../../../services/user.service');
const { StatusCode } = require('../../../utils/commonObject.util');
const convertData = require('../../../utils/convertData.util');

jest.mock('../../../services/user.service');
jest.mock('../../../utils/convertData.util');

describe('User Controller', () => {
    describe('getAllUser', () => {
        it('should get all users', async () => {
            const req = { query: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();

            const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
            const convertedData = { convertedUsers: users };
            userService.getAllUser.mockResolvedValue(users);
            convertData.mockReturnValue(convertedData);

            await getAllUser(req, res, next);

            expect(userService.getAllUser).toHaveBeenCalledWith(req.query);
            expect(convertData).toHaveBeenCalledWith(users, req.requestedFormat);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(res.send).toHaveBeenCalledWith(convertedData);
        });

        it('should handle errors when getting all users', async () => {
            const req = { query: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const error = new Error('Failed to get users');
            userService.getAllUser.mockRejectedValue(error);

            await getAllUser(req, res, next);

            expect(userService.getAllUser).toHaveBeenCalledWith(req.query);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getUserByUsername', () => {
        it('should get a user by username', async () => {
            const req = { params: { username: 'johndoe' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();

            const user = { id: 1, name: 'John Doe' };
            const convertedData = { convertedUser: user };
            userService.getUserByUsername.mockResolvedValue(user);
            convertData.mockReturnValue(convertedData);

            await getUserByUsername(req, res, next);

            expect(userService.getUserByUsername).toHaveBeenCalledWith(req.params.username);
            expect(convertData).toHaveBeenCalledWith(user, req.requestedFormat);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(res.send).toHaveBeenCalledWith(convertedData);
        });

        it('should handle errors when getting a user by username', async () => {
            const req = { params: { username: 'johndoe' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const error = new Error('Failed to get user');
            userService.getUserByUsername.mockRejectedValue(error);

            await getUserByUsername(req, res, next);

            expect(userService.getUserByUsername).toHaveBeenCalledWith(req.params.username);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateUser', () => {
        it('should update a user\'s data', async () => {
            const req = { userid: 1, body: { name: 'John Doe' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();

            const updatedUser = { id: 1, name: 'John Doe' };
            const convertedData = { convertedUser: updatedUser };
            userService.updateUser.mockResolvedValue(updatedUser);
            convertData.mockReturnValue(convertedData);

            await updateUser(req, res, next);

            expect(userService.updateUser).toHaveBeenCalledWith(req.userid, req.body);
            expect(convertData).toHaveBeenCalledWith(updatedUser, req.requestedFormat);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(res.send).toHaveBeenCalledWith(convertedData);
        });

        it('should handle errors when updating a user\'s data', async () => {
            const req = { userid: 1, body: { name: 'John Doe' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const error = new Error('Failed to update user');
            userService.updateUser.mockRejectedValue(error);

            await updateUser(req, res, next);

            expect(userService.updateUser).toHaveBeenCalledWith(req.userid, req.body);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user by their ID', async () => {
            const req = { userid: 1 };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();

            userService.deleteUser.mockResolvedValue();
            const convertedData = { message: `User with id ${req.userid} has been deleted successfully` };
            convertData.mockReturnValue(convertedData);

            await deleteUser(req, res, next);

            expect(userService.deleteUser).toHaveBeenCalledWith(req.userid);
            expect(convertData).toHaveBeenCalledWith({ message: `User with id ${req.userid} has been deleted successfully` }, req.requestedFormat);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(res.send).toHaveBeenCalledWith(convertedData);
        });

        it('should handle errors when deleting a user', async () => {
            const req = { userid: 1 };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const error = new Error('Failed to delete user');
            userService.deleteUser.mockRejectedValue(error);

            await deleteUser(req, res, next);

            expect(userService.deleteUser).toHaveBeenCalledWith(req.userid);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
