const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
	static init(sequelize) {
		super.init(
			{
				commentId: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				content: DataTypes.STRING,
				createdAt: DataTypes.DATE,
			},
			{
				sequelize,
				name: {
					singular: "comment",
					plural: "comments",
				},
				tableName: "comments",
				timestamps: true,
				updatedAt: false,
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: "userId" });
		this.belongsTo(models.Post, { foreignKey: "postId" });
	}
}

module.exports = Comment;
