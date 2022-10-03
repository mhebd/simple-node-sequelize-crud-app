const { Sequelize, DataTypes } = require('sequelize');
const Cart = require('../model/Cart');
const CartItem = require('../model/CartItem');
const Contact = require('../model/Contact');
const Order = require('../model/Order');
const Product = require('../model/Product');
const User = require('../model/User');

// Create sequelize instance
const sequelize = new Sequelize(
	process.env.DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		logging: false,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

// Connect database
sequelize
	.authenticate()
	.then(() => console.log(`Database connection success.`))
	.catch((err) => console.error(`Database connection failed.`, err));

// Connect with database model
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add model
db.User = User(sequelize, DataTypes);
db.Contact = Contact(sequelize, DataTypes);
db.Product = Product(sequelize, DataTypes);
db.CartItem = CartItem(sequelize, DataTypes);
db.Cart = Cart(sequelize, DataTypes);
db.Order = Order(sequelize, DataTypes);

// Create ont-to-one relation between USER and CONTACT table
db.User.hasOne(db.Contact, {
	foreignKey: 'userId',
});
db.Contact.belongsTo(db.User, {
	foreignKey: 'userId',
});

// Create one-to-one relation between USER and CART table
db.User.hasOne(db.Cart, {
	foreignKey: 'userId',
});
db.Cart.belongsTo(db.User, {
	foreignKey: 'userId',
});

// Create one-to-many relation between CART and CARTITEM table
db.Cart.hasMany(db.CartItem);
db.CartItem.belongsTo(db.Cart);

// Create one-to-one relation between PRODUCT and CARTITEM
db.Product.hasOne(db.CartItem, {
	foreignKey: 'productId',
});
db.CartItem.belongsTo(db.Product, {
	foreignKey: 'productId',
});

// Create one-to-many relation between ORDER and CARTITEM
db.Order.hasMany(db.CartItem);
db.CartItem.belongsTo(db.Order);

// Create one-to-many relation between USER and ORDER
db.User.hasMany(db.Order);
db.Order.belongsTo(db.User);

// Create or update all table
db.sequelize.sync({ force: false });

// Export database
module.exports = db;
