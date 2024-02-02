import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface WarrantyCompensationStatusAttributes {
	id: number;
	title: string;
}

// Some fields are optional when calling WarrantyCompensationStatusModel.create() or WarrantyCompensationStatusModel.build()
interface WarrantyCompensationStatusCreationAttributes extends Optional<WarrantyCompensationStatusAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface WarrantyCompensationStatusInstance extends Model
<WarrantyCompensationStatusAttributes, WarrantyCompensationStatusCreationAttributes>,
	WarrantyCompensationStatusAttributes {}

type WarrantyCompensationStatusStatic = ModelCtor<WarrantyCompensationStatusInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const WarrantyCompensationStatus: WarrantyCompensationStatusStatic = sequelize.define<WarrantyCompensationStatusInstance>('warrantyCompensationStatus', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		title: {
			type: dataTypes.STRING,
			allowNull: false,
		},
	}, {
		tableName: 'warranty_compensation_status',
		underscored: true,
	});

	WarrantyCompensationStatus.associate = (models) => {
		WarrantyCompensationStatus.hasMany(models.warrantyProducts);
	};

	return WarrantyCompensationStatus;
};
