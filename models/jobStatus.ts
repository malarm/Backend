import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface JobStatusAttributes {
	id: number;
	description: string;
	lastRunParameter: string;
	title: string;
}

// Some fields are optional when calling JobStatusModel.create() or JobStatusModel.build()
interface JobStatusCreationAttributes extends Optional<JobStatusAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface JobStatusInstance extends Model
<JobStatusAttributes, JobStatusCreationAttributes>,
	JobStatusAttributes {}

type JobStatusStatic = ModelCtor<JobStatusInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const JobStatus: JobStatusStatic = sequelize.define<JobStatusInstance>('jobStatus', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		title: {
			type: dataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		lastRunParameter: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'job_status',
		underscored: true,
	});

	return JobStatus;
};
