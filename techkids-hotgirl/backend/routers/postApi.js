const express = require('express');
const PostApiRouter = express.Router();

const PostModel = require('../models/post');

// Get list post
PostApiRouter.get('/', async (req, res) => {
	// PostModel.find({})
	// 	.then(posts => {
	// 		res.json({success: true, data: posts})
	// 	})
	// 	.catch(err => {
	// 		res.json({success: false, err});
	// 	})
	// 	// .populate('author', '-password')
	// 	// .exec((err, posts) => {
	// 	// 	if(err) res.json({ success: false, err })
	// 	// 	else res.json({ success: true, data: posts });
	// 	// });

	try {
		const posts = await PostModel.find({}).populate('author', '-password');
		res.json({success: 'true', data: posts})
	} catch(err) {
		res.json({success: 'false', err})
	}
});

// Create post
PostApiRouter.post('/', async (req, res) => {
	// promise
	// PostModel.create(req.body)
	// 	.then(postCreated => {
	// 		res.json({success: true, data: postCreated})
	// 	})
	// 	.catch(err => {
	// 		res.json({success: false, err});
	// 	})

	// async await
	try {
		const postCreated = await PostModel.create(req.body);
		res.json({success: true, data: postCreated})
	} catch(err) {
		res.json({success: false, err})
	}

	// PostModel.create(req.body, (err, postCreated) => {
	// 	if(err) res.json({ success: false, err })
	// 	else res.json({ success: true, data: postCreated });
	// });
});

// Update post
PostApiRouter.put('/:id', async (req, res) => {
	const id = req.params.id;

	// promise
	// PostModel.findById(id)
	// 	.then(postFound => {
	// 		if(!postFound) {
	// 			res.json({success: 'false', err: 'not Found'})
	// 		}
	// 		for(let key in req.body) {
	// 			let value = req.body[key];
	// 			if(value != null) {
	// 				postFound[key] = value;
	// 			}
	// 		}

	// 		postFound.save()
	// 			.then(postUpdated => {
	// 				res.json({success: 'true', data: postUpdated})
	// 			})
	// 			.catch(err => {
	// 				res.json({success: 'false', err})
	// 			}) 
	// 	})
	// 	.catch(err => {
	// 		res.json({success: 'false', err})
	// 	})

	// async
	try {
		const postFound = await PostModel.findById(id);
		try {
			for(let key in req.body) {
				let value = req.body[key];
				if(value != null) {
					postFound[key] = value;
				}
			}
		} catch(err) {
			res.json({success: 'false', err: 'not Found post'})
		}

		try {
			const postUpdated = await postFound.save();
			res.json({success: 'true', data: postUpdated});
		} catch(err) {
			res.json({success: 'false', err: 'Not save'})
		}
	} catch(err) {
		res.json({success: 'false', err})
	}


	// PostModel.findById(id, (err, postFound) => {
	// 	if (err) res.json({ success: "false", err })
	// 	else if (!postFound) res.json({ success: "false", err: 'Not found' })
	// 	else {
	// 		for(let key in req.body) {
	// 			let value = req.body[key];
	// 			if(value !== null) {
	// 				postFound[key] = value;
	// 			}
	// 		}

	// 		postFound.save((err, postUpdated) => {
	// 			if (err) res.json({ success: false, err })
	// 			else res.json({ success: true, data: postUpdated });
	// 		});
	// 	}
	// });
});

// Delete post
PostApiRouter.delete('/:id', async (req, res) => {
	const id = req.params.id;

	// promise 
	// PostModel.findByIdAndDelete(id)
	// 	.then(posts => {
	// 		res.json({success: 'true', posts});
	// 	})
	// 	.catch(err => {
	// 		res.json({success: 'false', err});
	// 	})

	try {
		const post = await PostModel.findByIdAndDelete(id);
		res.json({success: 'true'});
	} catch(err) {
		res.json({success: 'false', err});
	}
	
	// PostModel.findByIdAndDelete(id, (err) => {
	// 	if (err) res.json({ success: false, err })
	// 	else res.json({ success: true });
	// });

});

module.exports = PostApiRouter;