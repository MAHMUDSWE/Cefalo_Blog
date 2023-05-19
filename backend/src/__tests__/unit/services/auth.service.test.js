const { v4: uuidv4 } = require('uuid');

const authRepository = require("../../../repositories/auth.repository");
const userRepository = require("../../../repositories/user.repository");
const { UserDTO } = require('../../../dto/response/user.res.dto');

const authUtils = require("../../../utils/auth.util");
const bcryptUtils = require("../../../utils/bcrypt.util");
const { StatusCode, HttpError } = require('../../../utils/commonObject.util');

const {
    userRegistration,
    userLogin
} = require('../../../services/auth.service');

jest.mock('uuid');
jest.mock('../../../repositories/auth.repository');
jest.mock('../../../repositories/user.repository');
jest.mock('../../../utils/auth.util');
jest.mock('../../../utils/bcrypt.util');

describe('userRegistration', () => {
    it('should register a new user successfully', async () => {

        const signupReqDto = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        };

        const mockedHashedPassword = 'hashedPassword';
        const mockedUser = { userid: '123', ...signupReqDto, password: mockedHashedPassword };

        const mockedUserDTO = new UserDTO(mockedUser);  //res

        userRepository.getUserByEmail.mockResolvedValue(null);
        userRepository.getUserByUsername.mockResolvedValue(null);

        bcryptUtils.hashPassword.mockResolvedValue(mockedHashedPassword);
        authRepository.userRegistration.mockResolvedValue(mockedUser);

        const result = await userRegistration(mockedUser);

        expect(result).toEqual(mockedUserDTO);
        expect(userRepository.getUserByEmail).toHaveBeenCalledWith(signupReqDto.email);
        expect(userRepository.getUserByUsername).toHaveBeenCalledWith(signupReqDto.username);
        expect(bcryptUtils.hashPassword).toHaveBeenCalledWith(mockedHashedPassword);

        expect(authRepository.userRegistration).toHaveBeenCalledWith({
            userid: expect.any(String),
            ...signupReqDto,
            password: mockedHashedPassword
        });
    });

    it('should throw an error if email is already in use', async () => {
        const signupReqDto = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        };

        userRepository.getUserByEmail.mockResolvedValue({});

        await expect(userRegistration(signupReqDto)).rejects.toThrow(HttpError);
        expect(userRepository.getUserByEmail).toHaveBeenCalledWith(signupReqDto.email);
    });

    it('should throw an error if username is already in use', async () => {
        const signupReqDto = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        };

        userRepository.getUserByEmail.mockResolvedValue(null);
        userRepository.getUserByUsername.mockResolvedValue({});

        await expect(userRegistration(signupReqDto)).rejects.toThrow(HttpError);
        expect(userRepository.getUserByEmail).toHaveBeenCalledWith(signupReqDto.email);
        expect(userRepository.getUserByUsername).toHaveBeenCalledWith(signupReqDto.username);
    });
});



describe('userLogin', () => {
    it('should authenticate a user and return a JWT access token', async () => {
        const res = {};
        const loginCredentials = {
            username: 'testuser',
            password: 'password123'
        };
        const mockedUser = {
            userid: '123',
            username: loginCredentials.username,
            password: 'hashedPassword'
        };
        const mockedToken = 'mockedToken';

        userRepository.getUserByUsername.mockResolvedValue(mockedUser);
        bcryptUtils.verifyPassword.mockResolvedValue(true);
        authUtils.generateAccessToken.mockReturnValue(mockedToken);

        const result = await userLogin(res, loginCredentials);

        expect(result).toBe(mockedToken);
        expect(userRepository.getUserByUsername).toHaveBeenCalledWith(loginCredentials.username);
        expect(bcryptUtils.verifyPassword).toHaveBeenCalledWith(
            loginCredentials.password,
            mockedUser.password
        );
        expect(authUtils.generateAccessToken).toHaveBeenCalledWith(mockedUser.userid);
        expect(authUtils.setTokenToHeader).toHaveBeenCalledWith(mockedToken, res);
    });

    it('should throw an error if the username is not found', async () => {
        const res = {};
        const loginCredentials = {
            username: 'testuser',
            password: 'password123'
        };

        userRepository.getUserByUsername.mockResolvedValue(null);

        await expect(userLogin(res, loginCredentials)).rejects.toThrow(HttpError);
        expect(userRepository.getUserByUsername).toHaveBeenCalledWith(loginCredentials.username);
        expect(bcryptUtils.verifyPassword).not.toHaveBeenCalled();
        expect(authUtils.generateAccessToken).not.toHaveBeenCalled();
        expect(authUtils.setTokenToHeader).not.toHaveBeenCalled();
    });

    it('should throw an error if the password is invalid', async () => {
        const res = {};
        const loginCredentials = {
            username: 'testuser',
            password: 'password123'
        };
        const mockedUser = {
            userid: '123',
            username: loginCredentials.username,
            password: 'hashedPassword'
        };

        userRepository.getUserByUsername.mockResolvedValue(mockedUser);
        bcryptUtils.verifyPassword.mockResolvedValue(false);

        await expect(userLogin(res, loginCredentials)).rejects.toThrow(HttpError);
        expect(userRepository.getUserByUsername).toHaveBeenCalledWith(loginCredentials.username);
        expect(bcryptUtils.verifyPassword).toHaveBeenCalledWith(
            loginCredentials.password,
            mockedUser.password
        );
        expect(authUtils.generateAccessToken).not.toHaveBeenCalled();
        expect(authUtils.setTokenToHeader).not.toHaveBeenCalled();
    });
});
