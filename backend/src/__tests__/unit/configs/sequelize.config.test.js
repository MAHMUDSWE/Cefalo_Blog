const { sequelize, connectToDatabase } = require('../../../configs/sequelize.config');

describe('Database Configuration', () => {
    beforeAll(() => {
        // Set up any necessary environment variables for testing
        process.env.DB_NAME = 'testdb';
        process.env.DB_USER = 'testuser';
        process.env.DB_PASSWORD = 'testpassword';
        process.env.DB_HOST = 'localhost';
        process.env.DB_DIALECT = 'mysql';
    });

    afterAll(() => {
        // Clean up and restore environment variables after testing
        delete process.env.DB_NAME;
        delete process.env.DB_USER;
        delete process.env.DB_PASSWORD;
        delete process.env.DB_HOST;
        delete process.env.DB_DIALECT;
    });

    it('should establish a database connection and sync models', async () => {
        // Test the connectToDatabase function

        // Ensure the authenticate method resolves without error
        sequelize.authenticate = jest.fn().mockResolvedValueOnce();

        // Ensure the sync method resolves without error
        sequelize.sync = jest.fn().mockResolvedValueOnce();

        // Spy on console.log to check if the success messages are logged
        console.log = jest.fn();

        await connectToDatabase();

        expect(sequelize.authenticate).toHaveBeenCalled();
        expect(sequelize.sync).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith('Database Connection has been established successfully.');
        expect(console.log).toHaveBeenCalledWith('Models have been synced successfully.');
    });


});

