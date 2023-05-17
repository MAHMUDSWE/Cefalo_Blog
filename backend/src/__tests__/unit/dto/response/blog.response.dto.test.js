const { BlogDto } = require('../../../../dto/response/blog.res.dto');

describe('BlogDto', () => {
    const data = {
        blogid: '12345',
        user: {
            name: 'John Doe',
            username: 'johndoe',
        },
        title: 'My Blog Post',
        content: 'This is my blog content.',
        createdAt: '2023-05-17T10:30:00Z',
        updatedAt: '2023-05-17T11:15:00Z',
    };

    it('should create a BlogDto instance with correct properties', () => {
        const blogDto = new BlogDto(data);

        expect(blogDto.blogid).toBe(data.blogid);
        expect(blogDto.name).toBe(data.user.name);
        expect(blogDto.username).toBe(data.user.username);
        expect(blogDto.title).toBe(data.title);
        expect(blogDto.content).toBe(data.content);
        expect(blogDto.createdAt).toBe(data.createdAt);
        expect(blogDto.updatedAt).toBe(data.updatedAt);
    });
});
