import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface WarrantyAttributes {
	id: number;
	warrantyTagTypeId?: string;
	orderId: number;
	name: string;
	lastName: string;
	address?: string;
	zipCode?: string;
	city?: string;
	country?: string;
	countryCode?: number;
	phone?: string;
	alternativePhone?: string;
	email?: string;
	alternativeEmail?: string;
	status?: number;
	orderDate?: Date;
	orderFulfilledDate?: Date;
	dateCreated?: Date;
	userId: number;
	dueDate?: Date;
	agentId?: number;
	archive?: boolean;
}

// Some fields are optional when calling WarrantyModel.create() or WarrantyModel.build()
interface WarrantyCreationAttributes extends Optional<WarrantyAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface WarrantyInstance extends Model<WarrantyAttributes, WarrantyCreationAttributes>,
	WarrantyAttributes { }

type WarrantyStatic = ModelCtor<WarrantyInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Warranty: WarrantyStatic = sequelize.define<WarrantyInstance>('warranties', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		warrantyTagTypeId: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		orderId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		zipCode: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		city: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		country: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		countryCode: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		phone: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		alternativePhone: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		alternativeEmail: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		orderDate: {
			type: dataTypes.DATE,
			allowNull: false,
		},
		orderFulfilledDate: {
			allowNull: true,
			type: dataTypes.DATE,
		},
		dateCreated: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		userId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		agentId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		dueDate: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		archive: {
			type: dataTypes.BOOLEAN,
			allowNull: true,
		},
	}, {
		tableName: 'warranties',
		underscored: true,
	});

	Warranty.associate = (models) => {
		Warranty.belongsTo(models.user);
		Warranty.belongsTo(models.order);
		Warranty.hasMany(models.warrantyProducts);
		Warranty.hasMany(models.warrantySolution);
		Warranty.hasMany(models.warrantyPicturesUpload);
		Warranty.hasMany(models.warrantyActivities);
	};
	return Warranty;
};
