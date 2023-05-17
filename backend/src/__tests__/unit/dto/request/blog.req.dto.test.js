const { BlogPostReqDTO, BlogUpdateReqDTO } = require('../../../../dto/request/blog.req.dto');

describe('BlogPostReqDTO', () => {
    it('should create a BlogPostReqDTO instance with correct properties', () => {
        const requestData = {
            userid: '123',
            title: 'New Blog Post',
            content: 'This is the content of the blog post',
            status: 'published',
        };

        const blogPostReqDto = new BlogPostReqDTO(requestData);

        expect(blogPostReqDto.userid).toBe(requestData.userid);
        expect(blogPostReqDto.title).toBe(requestData.title);
        expect(blogPostReqDto.content).toBe(requestData.content);
        expect(blogPostReqDto.status).toBe(requestData.status);
    });
});

describe('BlogUpdateReqDTO', () => {
    it('should create a BlogUpdateReqDTO instance with correct properties', () => {
        const requestData = {
            blogid: '456',
            userid: '123',
            title: 'Updated Blog Post',
            content: 'This is the updated content of the blog post',
            status: 'draft',
        };

        const blogUpdateReqDto = new BlogUpdateReqDTO(requestData);

        expect(blogUpdateReqDto.blogid).toBe(requestData.blogid);
        expect(blogUpdateReqDto.userid).toBe(requestData.userid);
        expect(blogUpdateReqDto.title).toBe(requestData.title);
        expect(blogUpdateReqDto.content).toBe(requestData.content);
        expect(blogUpdateReqDto.status).toBe(requestData.status);
    });
});
