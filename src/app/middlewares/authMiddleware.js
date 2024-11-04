const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth");

module.exports = async (req, res, next) => {
	try {
		const excludedPaths = ["/users/register", "/auth/login"];

		if (excludedPaths.includes(req.path)) {
			return next();
		}

		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({ erro: "Token não fornecido" });
		}

		const [, token] = authHeader.split(" ");

		const decoded = await jwt.verify(token, authConfig.secret);

		req.userId = decoded.userId;
		req.userName = decoded.name;

		return next();
	} catch (error) {
		return res.status(500).json({ erro: "Token inválido" });
	}
};
