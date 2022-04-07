const Router = require('koa-router');
const Posts = require('../src/Posts');
const postsList = require('../src/postsList');

const router = new Router();
const posts = new Posts(postsList);

router.get('/posts', async (ctx) => {
	ctx.response.body = JSON.stringify(posts.list);
});

router.get('/post/:id', async (ctx) => {
	const { id } = ctx.params;
	ctx.response.body = JSON.stringify(posts.getPost(id));
});

router.post('/posts', async (ctx) => {
	posts.addPost(ctx.request.body);
	ctx.response.body = JSON.stringify({
		success: true,
		data: 'Post has been added.',
	});
});

router.post('/save', async (ctx) => {
	const post = JSON.parse(ctx.request.body);
	posts.savePost(post);
	ctx.response.body = JSON.stringify({
		success: true,
		data: 'Post has been saved.',
	});
});

router.delete('/posts/:id', async (ctx) => {
	const { id } = ctx.params;
	posts.deletePost(id);
	ctx.response.body = JSON.stringify({
		success: true,
		data: 'Post has been deleted.',
	});
});

module.exports = { router };
