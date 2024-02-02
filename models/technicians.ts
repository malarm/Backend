import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface TechnicianAttributes {
	id: number;
	name: string;
	address?: string;
	email?: string;
	phone?: string;
	countryCode?: string;
	serviceZip?: string;
}

// Some fields are optional when calling technicianModel.create() or technicianModel.build()
interface TechnicianCreationAttributes extends Optional<TechnicianAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface TechnicianInstance extends Model
<TechnicianAttributes, TechnicianCreationAttributes>,
	TechnicianAttributes {}

type TechnicianStatic = ModelCtor<TechnicianInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Technician: TechnicianStatic = sequelize.define<TechnicianInstance>('technician', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		name: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		phone: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		countryCode: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		serviceZip: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'technician',
		underscored: true,
	});

	return Technician;
};
