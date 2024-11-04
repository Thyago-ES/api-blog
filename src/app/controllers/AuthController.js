const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth");

class AuthController {
	async login(req, res) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({
				where: { email },
			});

			if (!user) {
				return res.status(404).json({ erro: "Email/senha incorretos" });
			}

			if (!(await user.checkPassword(password))) {
				return res.status(400).json({ error: "Credenciais incorretas" });
			}

			const { userId, name } = user;

			return res.status(200).json({
				user: {
					userId,
					name,
				},
				token: jwt.sign({ userId }, authConfig.secret, {
					expiresIn: authConfig.expiresIn,
				}),
			});
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao fazer login" });
		}
	}
}

module.exports = new AuthController();
