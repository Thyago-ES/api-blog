const Post = require("../models/Post");
const User = require("../models/User");

const Yup = require("yup");

class PostController {
	async index(req, res) {
		try {
			const posts = await Post.findAll({
				where: {
					userId: req.params.userId,
				},
				attributes: {
					exclude: ["userId"],
				},
				include: [
					{
						model: User,
						attributes: ["userId", "name"],
					},
				],
			});

			return res.status(200).json(posts);
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao listar postagens" });
		}
	}

	async show(req, res) {
		try {
			const post = await Post.findOne({
				where: {
					userId: req.params.userId,
					postId: req.params.id,
				},
				attributes: {
					exclude: ["userId"],
				},
				include: [
					{
						model: User,
						attributes: ["userId", "name"],
					},
				],
			});

			if (!post) {
				return res.status(404).json({ erro: "Postagem não encontrada" });
			}

			return res.status(200).json(post);
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao exibir postagem" });
		}
	}

	async create(req, res) {
		try {
			const schema = Yup.object().shape({
				content: Yup.string().min(5).max(255).required(),
				category: Yup.string().oneOf([
					"ANIMAIS",
					"PAISAGENS",
					"TECNOLOGIA",
					"GERAL",
				]),
			});

			if (!(await schema.isValid(req.body))) {
				return res.status(400).json({ erro: "Falha na validação de schema" });
			}

			const userId = req.params.userId;
			console.log(userId);

			const post = await Post.create({
				...req.body,
				userId: req.params.userId,
				category: req.body.category || "GERAL",
			});

			return res.status(201).json(post);
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao criar postagem: " });
		}
	}

	async update(req, res) {
		try {
			const schema = Yup.object().shape({
				content: Yup.string().min(5).max(255),
				category: Yup.string().oneOf([
					"ANIMAIS",
					"PAISAGENS",
					"TECNOLOGIA",
					"GERAL",
				]),
			});

			if (!(await schema.isValid(req.body))) {
				return res.status(400).json({ erro: "Falha na validação de schema" });
			}

			const post = await Post.findOne({
				where: {
					userId: req.params.userId,
					postId: req.params.id,
				},
				attributes: {
					exclude: ["userId"],
				},
				include: [
					{
						model: User,
						attributes: ["userId", "name"],
					},
				],
			});

			if (!post) {
				return res.status(404).json({ erro: "Postagem não encontrada" });
			}

			await post.update(req.body);

			return res.status(200).json(post);
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao atualizar a postagem" });
		}
	}

	async destroy(req, res) {
		try {
			const post = await Post.findOne({
				where: {
					userId: req.params.userId,
					postId: req.params.id,
				},
			});

			if (!post) {
				return res.status(404).json({ erro: "Postagem não encontrada" });
			}

			await post.destroy();

			return res.status(204).json();
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao deletar postagem" });
		}
	}
}

module.exports = new PostController();
