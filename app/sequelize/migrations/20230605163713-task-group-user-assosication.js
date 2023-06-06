'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Tasks' , {
      fields: ['userID'] ,
      type: 'foreign key',
      name: 'task_to_user_assosiaition',
      references: {
        table: "Users" ,
        field: "id" ,
      }
    });
    queryInterface.addConstraint('Tasks' , {
      fields: ['groupID'] ,
      type: 'foreign key',
      name: 'task_to_group_assosiaition',
      references: {
        table: "Groups" ,
        field: "id" ,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
