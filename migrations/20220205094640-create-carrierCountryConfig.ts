import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('carrier-country-config', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		countryId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'country',
				key: 'id'
			},
			field: 'country_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		},
		carrierId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'carrier',
				key: 'id'
			},
			field: 'carrier_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		},
		carrierProduct: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'carrier_product',
		},
		carrierProductTitle: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'carrier_product_title',
		},
		showPickUp: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'show_pick_up',
		},
		showDelivery: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'show_delivery',
		},
		showExtraService: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'show_extra_service',
		},
		showExtraServiceFlex: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'show_extra_service_flex',
		},
		smsNt: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'sms_nt',
		},
		emailNt: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'email_nt',
		},
		smsPnt: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'sms_pnt',
		},
		emailPnt: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'email_pnt',
		},
		flexDelivery: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'flex_delivery',
		},
		flexTelNotification: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'flex_tel_notification',
		},
		privateAddress: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'private_address',
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
			field: 'created_at',
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
			field: 'updated_at',
		},
	}),
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('carrier-country-config'),
};
