const express = require("express");
const app = express();
const lib = require('./lib');

const register = async (req,res) => {
	const user = lib.reqToUser(req);
	if(lib.isValid(user) && await lib.findByName(user.name) == undefined){
		const updatedUser = {name: user.name,password: user.password};
		lib.persistUser(updatedUser);
		res.sendStatus(201);
	}else{
		res.sendStatus(403);
	}
};

const login = async (req, res) => {
	const user = lib.reqToUser(req);
	if (lib.isValid(user) && (await lib.findByNameAndPassword(user.name,user.password)) != undefined){
		const token = lib.generateToken(user.name);
		res.send({ token: token });
	} else {
		res.sendStatus(403);
	}
};

const check = async (req, res) => {
	try{
		const user = await lib.validAuth(req);
		res.send({ user: user });
	}catch(error){
		res.sendStatus(422);
	}
};

app.use(express.json());
app.post("/user/register", register);
app.post("/user/login", login);
app.get("/user/check", check);
app.listen(8083, () => {
	console.log("Users-sc started in port 8083");
});
