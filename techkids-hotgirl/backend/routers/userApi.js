const express = require('express');
const UserApiRouter = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

// Get list user
UserApiRouter.get('/', async (req, res) => {
	// UserModel.find({}, (err, users) => {
	// 	if(err) res.json({ success: false, err })
	// 	else res.json({ success: true, data: users });
	// });

	// promise
	// UserModel.find({})
	// 	.then(users => {
	// 		res.json({success: true, data: users});
	// 	})
	// 	.catch(err => {
	// 		res.json({success: false, err});
	// 	})

	// async
	try {
		const users = await UserModel.find({});
		res.json({success: 'true', data: users})
	} catch(err) {
		res.send({success: 'false', err})
	}
});

// Create user
// pass: $2b$12$mhs9fiCu.ABxt4z7kqAq0u/JpNpYYeSCffZipX0bqZh/Qz4eUgAje
UserApiRouter.post('/', async (req, res) => {
	const { password } = req.body;
	const hashPassword = bcrypt.hashSync(password, 12);
	req.body.password = hashPassword;
	// UserModel.create(req.body, (err, userCreated) => {
	// 	if(err) res.json({ success: false, err })
	// 	else res.json({ success: true, data: userCreated });
	// });

	// promise
	// UserModel.create(req.body)
	// 	.then(userCreated => {
	// 		res.json({success: 'true', data: userCreated});
	// 	})
	// 	.catch(err => {
	// 		res.json({success: 'false', err})
	// 	})

	// async
	try {
		const userCreated = await UserModel.create(req.body);
		res.json({success: 'true', data: userCreated}) 
	} catch(err) {
		res.json({success: 'false', err});
	}
});

// Update user
UserApiRouter.put('/:id', async (req, res) => {
	const id = req.params.id;

	// promise
	// UserModel.findById(id)
	// 	.then(userFound => {
	// 		if(!userFound) {
	// 			res.send({success: 'false', err: 'user Not Found'})
	// 		}
	// 		for(let key in req.body) {
	// 			console.log(key);
	// 			let value = req.body[key];
	// 			if(value != null) {
	// 				userFound[key] = value;
	// 			}
	// 		}
	// 		userFound.save()
	// 			.then(userUpdated => {
	// 				res.send({success: 'true', data: userUpdated})
	// 			})
	// 			.catch(err => {
	// 				res.send({success: 'false', err})
	// 			})
	// 	})
	// 	.catch(err => {
	// 		res.send({success: 'false', err})
	// 	})

	// async 
	try {
		const userFound = await UserModel.findById(id);
		try {
			for(let key in req.body) {
				console.log(key);
				let value = req.body[key];
				if(value != null) {
					userFound[key] = value;
				}
			}
		} catch(err) {
			res.send({success: 'false', err: 'user Not Found'})
		}

		try {
			const userUpdated = await userFound.save();
			res.send({success: 'true', data: userUpdated})
		} catch(err) {
			res.send({success: 'false', err: 'not save uer'})
		}

	} catch(err) {
		res.send({success: 'false', err})
	}

	// UserModel.findById(id, (err, userFound) => {
	// 	if (err) res.json({ success: false, err })
	// 	else if (!userFound) res.json({ success: false, err: 'Not found' })
	// 	else {
	// 		for(let key in req.body) {
	// 			console.log(key);
	// 			let value = req.body[key];
	// 			if(value !== null) {
	// 				userFound[key] = value;
	// 			}
	// 		}

	// 		userFound.save((err, userUpdated) => {
	// 			if (err) res.json({ success: false, err })
	// 			else res.json({ success: true, data: userUpdated });
	// 		});
	// 	}
	// });
});

// Delete user
UserApiRouter.delete('/:id',async (req, res) => {
	const id = req.params.id;

	// promise
	// UserModel.findByIdAndDelete(id)
	// 	.then(() => {
	// 		res.json({success: 'true'})
	// 	})
	// 	.catch(err => {
	// 		res.json({success: 'false'})
	// 	})

	// async
	try {
		await UserModel.findByIdAndDelete(id);
		res.json({success: 'true'});
	} catch(err) {
		res.json({success: 'false', err})
	}
	// UserModel.findByIdAndDelete(id, (err) => {
	// 	if (err) res.json({ success: false, err })
	// 	else res.json({ success: true });
	// });
});

module.exports = UserApiRouter;