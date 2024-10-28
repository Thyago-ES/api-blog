const User = require("../models/User");
const Post = require("../models/Post");

const Yup = require("yup");
const bcrypt = require("bcryptjs");

class UserController {
	async index(_req, res) {
		try {
			const users = await User.findAll({
				attributes: {
					exclude: ["password"],
				},
				include: [
					{
						model: Post,
						attributes: ["postId", "content", "category"],
					},
				],
			});

			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao listar usuários" });
		}
	}

	async show(req, res) {
		try {
			const user = await User.findOne({
				where: {
					userId: req.params.id,
				},
				attributes: {
					exclude: ["password"],
				},
				include: {
					model: Post,
					attributes: ["postId", "content", "category"],
				},
			});

			if (!user) {
				return res.status(404).json({ erro: "Usuário não encontrado" });
			}

			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao exibir usuário" });
		}
	}

	async create(req, res) {
		try {
			const schema = Yup.object().shape({
				name: Yup.string().max(45).required(),
				email: Yup.string().email().max(50).required(),
				password: Yup.string().min(8).max(20).required(),
				confirmPassword: Yup.string().when("password", ([password], field) => {
					return password
						? field.required().oneOf([Yup.ref("password")])
						: field;
				}),
			});

			if (!(await schema.isValid(req.body))) {
				return res.status(400).json({ erro: "Falha na validação de schema" });
			}

			const user = await User.findOne({ where: { email: req.body.email } });
			if (user) {
				return res.status(409).json({ erro: "Email já cadastrado" });
			}

			const { userId, name, email } = await User.create(req.body);

			return res.status(201).json({ userId, name, email });
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao criar usuário" });
		}
	}

	async update(req, res) {
		try {
			if (Object.keys(req.body).length === 0) {
				return res
					.status(400)
					.json({ erro: "Sem credenciais para atualização" });
			}

			const schema = Yup.object().shape({
				name: Yup.string().max(45),
				email: Yup.string().email().max(50),
				oldPassword: Yup.string().min(8),
				password: Yup.string()
					.min(8)
					.max(20)
					.when("oldPassword", ([oldPassword], field) =>
						oldPassword ? field.required() : field
					),
				confirmPassword: Yup.string().when("password", ([password], field) =>
					password ? field.required().oneOf([Yup.ref("password")]) : field
				),
			});

			if (!(await schema.isValid(req.body))) {
				return res.status(400).json({ erro: "Falha na validação de schema" });
			}

			const { email: emailBody, oldPassword } = req.body;

			if (emailBody && (await User.findOne({ where: { email: emailBody } }))) {
				return res.status(409).json({ erro: "Email já cadastrado" });
			}

			const user = await User.findByPk(req.params.id);
			if (!user) {
				return res.status(404).json({ erro: "Usuário não encontrado" });
			}

			if (oldPassword && !(await user.checkPassword(oldPassword))) {
				return res.status(401).json({ erro: "Credenciais inválidas" });
			}

			if (req.body.password) {
				req.body.password = await bcrypt.hash(req.body.password, 8);
			}

			const { userId, name, email } = await user.update(req.body);

			return res.status(200).json({ userId, name, email });
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao atualizar usuário" });
		}
	}

	async destroy(req, res) {
		try {
			const user = await User.findByPk(req.params.id);
			if (!user) {
				return res.status(404).json({ erro: "Usuário não encontrado" });
			}

			await user.destroy();

			return res.status(204).json();
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao deletar usuário" });
		}
	}
}

module.exports = new UserController();
