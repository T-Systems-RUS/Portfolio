'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn(
            'Projects',
            'feedback',
            {
                type: Sequelize.TEXT,
                allowNull: true
            }
        );
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Projects', 'feedback');
	}
};