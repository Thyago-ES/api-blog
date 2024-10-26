const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				userId: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				name: DataTypes.STRING,
				email: DataTypes.STRING,
				password: DataTypes.STRING,
			},
			{
				sequelize,
				tableName: "users",
				hooks: {
					beforeCreate: async (user) => {
						const hash = await bcrypt.hash(user.password, 8);
						user.password = hash;
					},
				},
				timestamps: false,
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Post, { foreignKey: "userId" });
		this.hasMany(models.Comment, { foreignKey: "userId" });
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password);
	}
}

module.exports = User;
