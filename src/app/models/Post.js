const { Model, DataTypes } = require("sequelize");

const postCategories = ["ANIMAIS", "PAISAGENS", "TECNOLOGIA", "GERAL"];

class Post extends Model {
	static init(sequelize) {
		super.init(
			{
				postId: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				content: DataTypes.STRING,
				category: DataTypes.ENUM(postCategories),
				createdAt: {
					type: DataTypes.DATE,
				},
			},
			{
				sequelize,
				name: {
					singular: "post",
					plural: "posts",
				},
				tableName: "posts",
				timestamps: true,
				updatedAt: false,
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Comment, { foreignKey: "postId" });
		this.belongsTo(models.User, { foreignKey: "userId" });
	}
}

module.exports = Post;
