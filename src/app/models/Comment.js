const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
	static init(sequelize) {
		super.init(
			{
				commentId: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				content: DataTypes.STRING,
				created_at: DataTypes.DATE,
			},
			{
				sequelize,
				tableName: "comments",
				timestamps: true,
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: "userId" });
		this.belongsTo(models.Post, { foreignKey: "postId" });
	}
}

module.exports = Comment;
