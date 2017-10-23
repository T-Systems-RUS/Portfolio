'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn(
            'Projects',
            'version',
            {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }
        );
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Projects', 'version');
	}
};