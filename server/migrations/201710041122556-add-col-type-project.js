'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn(
            'Projects',
            'type',
            {
                type: Sequelize.STRING,
                allowNull: true
            }
        );
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Projects', 'type');
	}
};