const Comment = require("../models/Comment");
const User = require("../models/User");

const Yup = require("yup");

class CommentController {
	async index(req, res) {
		try {
			const { userId } = req.query;
			let where = { postId: req.params.postId };

			if (userId) {
				where = { ...where, userId };
			}

			const comments = await Comment.findAll({
				where,
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

			return res.status(200).json(comments);
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao listar comentários" });
		}
	}

	async show(req, res) {
		try {
			const comment = await Comment.findOne({
				where: {
					postId: req.params.postId,
					commentId: req.params.id,
				},
				attributes: {
					exclude: ["postId", "userId"],
				},
				include: [
					{
						model: User,
						attributes: ["userId", "name"],
					},
				],
			});

			if (!comment) {
				return res.status(404).json({ erro: "Comentário não encontrado" });
			}

			return res.status(200).json(comment);
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao exibir comentário" });
		}
	}

	async create(req, res) {
		try {
			const schema = Yup.object().shape({
				userId: Yup.number().required(),
				content: Yup.string().min(5).max(255).required(),
			});

			if (!(await schema.isValid(req.body))) {
				return res.status(400).json({ erro: "Falha na validação de schema" });
			}

			const comment = await Comment.create({
				postId: req.params.postId,
				...req.body,
			});

			return res.status(201).json(comment);
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao criar comentário: " });
		}
	}

	async update(req, res) {
		try {
			const schema = Yup.object().shape({
				userId: Yup.number().required(),
				content: Yup.string().min(5).max(255).required(),
			});

			if (!(await schema.isValid(req.body))) {
				return res.status(400).json({ erro: "Falha na validação de schema" });
			}

			const comment = await Comment.findOne({
				where: {
					postId: req.params.postId,
					commentId: req.params.id,
				},
			});

			if (!comment) {
				return res.status(404).json({ erro: "Comentário não encontrado" });
			}

			const { userId, content } = req.body;

			if (comment.userId !== userId) {
				return res.status(403).json({ erro: "Usuário não autorizado" });
			}

			await comment.update({ content });

			return res.status(200).json(comment);
		} catch (error) {
			return res
				.status(500)
				.json({ erro: "Erro ao atualizar comentário: " + error });
		}
	}

	async destroy(req, res) {
		try {
			const schema = Yup.object().shape({
				userId: Yup.number().required(),
			});

			if (!(await schema.isValid(req.body))) {
				return res.status(400).json({ erro: "Falha na validação de schema" });
			}

			const comment = await Comment.findOne({
				where: {
					postId: req.params.postId,
					commentId: req.params.id,
				},
			});

			if (!comment) {
				return res.status(404).json({ erro: "Comentário não encontrado" });
			}

			const { userId } = req.body;

			if (comment.userId !== userId) {
				return res.status(403).json({ erro: "Usuário não autorizado" });
			}

			await comment.destroy();

			return res.status(204).json();
		} catch (error) {
			return res.status(500).json({ erro: "Erro ao deletar comentário" });
		}
	}
}

module.exports = new CommentController();
