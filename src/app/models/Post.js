const { Model, DataTypes } = require("sequelize");

const postCategories = ["ANIMAIS", "PAISAGENS", "TECNOLOGIA", "GERAL"];

class Post extends Model {
	static init(sequelize) {
		super.init(
			{
				postId: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				content: DataTypes.STRING,
				category: DataTypes.ENUM(postCategories),
				created_at: DataTypes.DATE,
			},
			{
				sequelize,
				tableName: "posts",
				timestamps: true,
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Comment, { foreignKey: "postId" });
		this.belongsTo(models.User, { foreignKey: "userId" });
	}
}

module.exports = Post;
