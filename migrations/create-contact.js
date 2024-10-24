// In migrations/*-create-contact.js
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Contacts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false },
        phone: { type: Sequelize.STRING, allowNull: false },
        address: { type: Sequelize.STRING },
        timezone: { type: Sequelize.STRING },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: { allowNull: false, type: Sequelize.DATE },
        updatedAt: { allowNull: false, type: Sequelize.DATE }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Contacts');
    }
  };
  