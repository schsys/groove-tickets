const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let setSSL = false;
console.log('el entorno es ', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  setSSL = true;
}
console.log('el SSL es ', setSSL)

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: setSSL
  },
  pool: {
    acquire: 30000, 
    idle: 10000, 
    min: 0, 
    max: 10 
  },
  logging: false
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Artist, Category, CategoryProduct, Location, Photo, Product,
  Customer, Order, OrderItem, Payment, User, Review } = sequelize.models;

// Aca vendrian las relaciones
// Product <---> Category
Product.belongsToMany(Category, { through: CategoryProduct });
Category.belongsToMany(Product, { through: CategoryProduct });

// Product <---> Photo
Product.hasMany(Photo);
Photo.belongsTo(Product);

// Product <---> Location
Location.hasMany(Product);
Product.belongsTo(Location);

// Product <---> Artist
Artist.hasMany(Product);
Product.belongsTo(Artist);

// Customer --> Order
Customer.hasMany(Order);
Order.belongsTo(Customer);

// Order --> OrderItems
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// OrderItem --> Product
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

// Payment --> Order
Order.hasMany(Payment);
Payment.belongsTo(Order);

// Customer --> User
User.hasOne(Customer);
Customer.belongsTo(User);

// User --> Review
User.hasMany(Review);
Review.belongsTo(User);

// Product --> Review
Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  sequelize     // para importart la conexión { conn } = require('./db.js');
};
