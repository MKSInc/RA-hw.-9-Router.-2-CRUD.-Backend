const Router = require('koa-router');
const Posts = require('../src/Posts');
const postsList = require('../src/postsList');

const router = new Router();
const posts = new Posts(postsList);

const response = {
	success: true,
	error: null,
	data: null,
};

const sendResponse = (ctx) => {
	ctx.response.body = JSON.stringify(response);
};

router.get('/posts', async (ctx) => {
	response.data = posts.list;
	console.log('router.get/posts response', response);
	sendResponse(ctx);
});

router.get('/post/:id', async (ctx) => {
	const { id } = ctx.params;
	response.data = posts.getPost(id);
	sendResponse(ctx);
});

router.post('/posts', async (ctx) => {
	// Создать задержку при добавлении пользователя.
	// await new Promise((resolve) => { setTimeout(() => resolve(), 3000); });

	posts.addPost(ctx.request.body);
	response.data = 'Post has been added.';
	sendResponse(ctx);
});

router.post('/save', async (ctx) => {
	const post = JSON.parse(ctx.request.body);
	posts.savePost(post);
	response.data = 'Post has been saved.';
	sendResponse(ctx);
});

router.delete('/posts/:id', async (ctx) => {
	const { id } = ctx.params;
	posts.deletePost(id);
	response.data = 'Post has been deleted.';
	sendResponse(ctx);
});

module.exports = { router };
