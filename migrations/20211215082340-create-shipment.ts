import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('shipment', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		orderId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'order_id',
			/* references: {
					model: 'order',
					key: 'webshop_id'
				},
				field: 'order_id',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE', */
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			},
			field: 'user_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		returnStatus: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'return_status',
		},
		bookedDatetime: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'booked_datetime',
		},
		originCompanyName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_company_name',
		},
		originName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_name',
		},
		originAddress: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_address',
		},
		originExtraInfo: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_extra_info',
		},
		originZipCode: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_zip_code',
		},
		originCity: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_city',
		},
		originCountry: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_country',
		},
		originEmail: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_email',
		},
		originPhonePrefix: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_phone_prefix',
		},
		originPhoneNumber: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'origin_phone_number',
		},
		originTimeWindowStart: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'origin_time_window_start',
		},
		originTimeWindowEnd: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'origin_time_window_end',
		},
		shipmentDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'shipment_date',
		},
		companyName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'company_name',
		},
		customerName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'customer_name',
		},
		customerAddress: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'customer_address',
		},
		customerExtraAddress: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'customer_extra_address',
		},
		customerZipcode: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'customer_zipcode',
		},
		customerCity: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'customer_city',
		},
		customerCountry: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'customer_country',
		},
		customerEmail: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'customer_email',
		},
		customerPhone: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'customer_phone',
		},
		timeWindowStart: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'time_window_start',
		},
		timeWindowEnd: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'time_window_end',
		},
		deliveryInstruction: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'delivery_instruction',
		},
		flexLiability: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'flex_liability',
		},
		services: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		carrierServices: {
			type: DataTypes.JSON,
			allowNull: true,
			field: 'carrier_services',
		},
		phoneNotification: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'phone_notification',
		},
		error: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		platformId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'platform_id',
		},
		externalCarrierId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'external_carrier_id',
		},
		trackTrace: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'track_trace',
		},
		trackTraceSend: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'track_trace_send',
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('shipment'),
};
