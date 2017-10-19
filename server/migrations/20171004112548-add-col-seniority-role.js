'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn(
            'Roles',
            'seniority',
            {
                type: Sequelize.STRING,
                defaultValue: 'junior',
                allowNull: true
            }
        );
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Roles', 'seniority');
	}
};