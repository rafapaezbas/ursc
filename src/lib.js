const mongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.reqToUser = (req) => {
	return {
		name: req.body.name,
		password: getSHA256(req.body.password),
	};
};

exports.isValid = (user) => {
	return user.name != undefined && user.password != undefined;
};

exports.generateToken = (username) => {
	const signSecret = process.env.jwt_sign_secret;
	const token = jwt.sign({ sub: username }, signSecret, {
		expiresIn: 60 * 60,
	});
	return token;
};

exports.findByName = (name) => {
	return dbConnection().then(getOne({ name: name}));
};

exports.findByNameAndPassword = (name, password) => {
	return dbConnection().then(getOne({ name: name, password: password }));
};

exports.persistUser = (user) => {
	return dbConnection().then(insert(user));
};


exports.validAuth = (req) => {
	if (req.headers == undefined ||req.headers.authorization == undefined || req.headers.authorization.split(" ")[1] == undefined) {
		return undefined;
	} else {
		const token = req.headers.authorization.split(" ")[1];
		const secret = process.env.jwt_sign_secret;
		return jwt.verify(token, secret).sub;
	}
};

const getSHA256 = (input) => {
	const secret = process.env.encryption_salt;
	for (var i = 0; i < 100; i++) {
		input = crypto.createHmac("sha256", secret).update(input).digest("hex");
	}
	return input;
};

const getOne = (query) => {
	return (client) => {
		var db = client.db("users-sc");
		return db.collection("users").findOne(query);
	};
};

const insert = (user) => {
	return (client) => {
		var db = client.db("users-sc");
		return db.collection("users").insertOne(user);
	};
};

const dbConnection = () => {
	return mongoClient.connect(process.env.mongodb_url);
};
