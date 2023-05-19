const { UserDTO } = require('../../../../dto/response/user.res.dto');

describe('UserDTO', () => {
    const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password123',
        createdAt: '2023-05-17T10:30:00Z',
        updatedAt: '2023-05-17T11:15:00Z',
    };

    it('should create a UserDTO instance with correct properties', () => {
        const userDto = new UserDTO(userData);

        expect(userDto.name).toBe(userData.name);
        expect(userDto.email).toBe(userData.email);
        expect(userDto.username).toBe(userData.username);
        expect(userDto.createdAt).toBe(userData.createdAt);
        expect(userDto.updatedAt).toBe(userData.updatedAt);
    });
});
