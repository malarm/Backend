import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface SkanlogSeHubAttributes {
	id: number;
	minZip: string;
	maxZip: string;
	zone: string;
	hub: string;

}

// Some fields are optional when calling SkanlogSeHubModel.create() or SkanlogSeHubModel.build()
interface SkanlogSeHubCreationAttributes extends Optional<SkanlogSeHubAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface SkanlogSeHubInstance extends Model<SkanlogSeHubAttributes, SkanlogSeHubCreationAttributes>,
	SkanlogSeHubAttributes { }

type SkanlogSeHubStatic = ModelCtor<SkanlogSeHubInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const SkanlogSeHub: SkanlogSeHubStatic = sequelize.define<SkanlogSeHubInstance>('skanlogSeHub', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		minZip: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		maxZip: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		zone: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		hub: {
			type: dataTypes.STRING,
			allowNull: false,
		},
	}, {
		tableName: 'skanlog_se_hub',
		underscored: true,
	});

	return SkanlogSeHub;
};
