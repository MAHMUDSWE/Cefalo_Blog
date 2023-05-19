const { sequelize, connectToDatabase } = require('../../../configs/sequelize.config');

describe('Database Configuration', () => {
    beforeAll(() => {
        process.env.DB_NAME = 'testdb';
        process.env.DB_USER = 'testuser';
        process.env.DB_PASSWORD = 'testpassword';
        process.env.DB_HOST = 'localhost';
        process.env.DB_DIALECT = 'mysql';
    });

    afterAll(() => {
        delete process.env.DB_NAME;
        delete process.env.DB_USER;
        delete process.env.DB_PASSWORD;
        delete process.env.DB_HOST;
        delete process.env.DB_DIALECT;
    });

    it('should establish a database connection and sync models', async () => {

        sequelize.authenticate = jest.fn().mockResolvedValueOnce();

        sequelize.sync = jest.fn().mockResolvedValueOnce();

        console.log = jest.fn();

        await connectToDatabase();

        expect(sequelize.authenticate).toHaveBeenCalled();
        expect(sequelize.sync).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith('Database Connection has been established successfully.');
        expect(console.log).toHaveBeenCalledWith('Models have been synced successfully.');
    });

    it('should handle errors and log them', async () => {
        const errorMessage = 'Unable to sync the models';
        const error = new Error(errorMessage);
        sequelize.authenticate = jest.fn().mockResolvedValueOnce();
        sequelize.sync = jest.fn().mockRejectedValueOnce(error);
        console.log = jest.fn();

        await expect(connectToDatabase()).rejects.toThrow(errorMessage);

        expect(sequelize.authenticate).toHaveBeenCalled();
        expect(sequelize.sync).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(error);
    });

});

