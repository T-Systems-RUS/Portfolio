'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn(
            'Projects',
            'pss',
            {
                type: Sequelize.DECIMAL,
                allowNull: true
            }
        );
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Projects', 'pss');
	}
};