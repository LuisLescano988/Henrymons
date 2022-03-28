const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        "https://pokemon-the-wiki.herokuapp.com/pokemons/image/default-pokemon",
      
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Math.random() * 101),
      validate: {
        isNumeric: true,
        max: 255,
        min: 1,
      },
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Math.random() * 101),
      validate: {
        isNumeric: true,
        max: 255,
        min: 1,
      },
    },

    defense: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Math.random() * 101),
      validate: {
        isNumeric: true,
        max: 255,
        min: 1,
      },
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Math.random() * 101),
      validate: {
        isNumeric: true,
        max: 255,
        min: 1,
      },
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Math.random() * 101),
      validate: {
        isNumeric: true,
        max: 255,
        min: 1,
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Math.random() * 101),
      validate: {
        isNumeric: true,
        max: 255,
        min: 1,
      },
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    

  });
};
