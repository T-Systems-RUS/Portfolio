'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn(
            'Projects',
            'pss',
            {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
                validate: {
                    isDecimal: true
                }
            }
        );
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Projects', 'pss');
	}
};