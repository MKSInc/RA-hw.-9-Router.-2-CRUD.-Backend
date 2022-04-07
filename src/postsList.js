const { nanoid } = require('nanoid');

const postsList = [
	{
		id: nanoid(),
		content: 'Этот пост генерируется автоматически после старта сервера.',
		created: new Date(),
	},
];

module.exports = postsList;
