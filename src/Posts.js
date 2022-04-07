const { nanoid } = require('nanoid');

class Posts {
	constructor(postsList = []) {
		this.list = postsList;
	}

	getPost(id) {
		return this.list.find((post) => post.id === id);
	}

	addPost(content) {
		this.list.unshift({
			id: nanoid(),
			content,
			created: new Date(),
		});
	}

	savePost({ id, content }) {
		this.list.find((post) => post.id === id)
			.content = content;
	}

	deletePost(id) {
		this.list = this.list.filter((post) => post.id !== id);
	}
}

module.exports = Posts;
