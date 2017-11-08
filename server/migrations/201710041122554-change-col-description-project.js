'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn(
            'Projects',
            'description',
            {
                type: Sequelize.TEXT
                //validate: { len: [0,100000] }
            }
        );
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Projects', 'description');
	}
};