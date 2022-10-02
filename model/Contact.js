module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Contact',
		{
			phone: DataTypes.STRING,
			zip: DataTypes.INTEGER,
			city: DataTypes.STRING,
			country: DataTypes.STRING,
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
