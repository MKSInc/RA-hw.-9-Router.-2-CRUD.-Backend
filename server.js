const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const { router } = require('./routers/router');

const app = new Koa();

// Нужен чтобы читать тело POST запроса.
app.use(koaBody({ json: true }));

app.use(async (ctx, next) => {
	// CORS для фронтенда, который на git-hub.
	ctx.response.set('Access-Control-Allow-Origin', 'https://mksinc.github.io');
	ctx.response.set('Access-Control-Allow-Methods', 'DELETE');

	// Для разработки.
	ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:3000');

	await next();
});

const dirPublic = path.join(__dirname, 'public');
app.use(koaStatic(dirPublic));

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 8080;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));
