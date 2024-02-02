import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface WarrantySolutionAttributes {
	id: number;
	warrantySolutionTypeId?: number;
	warrantyProductId?: number;
	warrantyId?: number;
	endedBy?: number;
	userId?: number;
	status?: number;
	techId?: number;
	ticketId?: number;
	costTech?: number;
	costSpareparts?: number;
	costReplace?: number;
	costShipping?: number;
	compensated?: number;
	costReturnShipping?: number;
	replaceOrderId?: number;
	returnOrderId?: number;
	dateCreated?: Date;
	dateEnded?: Date;
	dateAction?: Date;
}

// Some fields are optional when calling WarrantySolutionModel.create() or WarrantySolutionModel.build()
interface WarrantySolutionCreationAttributes extends Optional<WarrantySolutionAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface WarrantySolutionInstance extends Model<WarrantySolutionAttributes, WarrantySolutionCreationAttributes>,
	WarrantySolutionAttributes { }

type WarrantySolutionStatic = ModelCtor<WarrantySolutionInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const WarrantySolution: WarrantySolutionStatic = sequelize.define<WarrantySolutionInstance>('warrantySolution', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		warrantySolutionTypeId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		warrantyProductId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		warrantyId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		endedBy: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		userId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		status: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		techId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		ticketId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		costTech: {
			type: dataTypes.BIGINT,
			allowNull: true,
			get() {
				const temp = this.getDataValue('costTech');
				return temp === null ? null : temp / 100;
			},
			set(valueToBeSet: number) {
				this.setDataValue('costTech', valueToBeSet === null ? null : Math.trunc(valueToBeSet * 100));
			}
		},
		costSpareparts: {
			type: dataTypes.BIGINT,
			allowNull: true,
			get() {
				const temp = this.getDataValue('costSpareparts');
				return temp === null ? null : temp / 100;
			},
			set(valueToBeSet: number) {
				this.setDataValue('costSpareparts', valueToBeSet === null ? null : Math.trunc(valueToBeSet * 100));
			}
		},
		costReplace: {
			type: dataTypes.BIGINT,
			allowNull: true,
			get() {
				const temp = this.getDataValue('costReplace');
				return temp === null ? null : temp / 100;
			},
			set(valueToBeSet: number) {
				this.setDataValue('costReplace', valueToBeSet === null ? null : Math.trunc(valueToBeSet * 100));
			}
		},
		costShipping: {
			type: dataTypes.BIGINT,
			allowNull: true,
			get() {
				const temp = this.getDataValue('costShipping');
				return temp === null ? null : temp / 100;
			},
			set(valueToBeSet: number) {
				this.setDataValue('costShipping', valueToBeSet === null ? null : Math.trunc(valueToBeSet * 100));
			}
		},
		costReturnShipping: {
			type: dataTypes.BIGINT,
			allowNull: true,
			get() {
				const temp = this.getDataValue('costReturnShipping');
				return temp === null ? null : temp / 100;
			},
			set(valueToBeSet: number) {
				this.setDataValue('costReturnShipping', valueToBeSet === null ? null : Math.trunc(valueToBeSet * 100));
			}
		},
		compensated: {
			type: dataTypes.BIGINT,
			allowNull: true,
			get() {
				const temp = this.getDataValue('compensated');
				return temp === null ? null : temp / 100;
			},
			set(valueToBeSet: number) {
				this.setDataValue('compensated', valueToBeSet === null ? null : Math.trunc(valueToBeSet * 100));
			}
		},
		replaceOrderId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		returnOrderId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		dateCreated: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		dateEnded: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		dateAction: {
			type: dataTypes.DATE,
			allowNull: true,
		},
	}, {
		tableName: 'warranty_solutions',
		underscored: true,
	});

	WarrantySolution.associate = (models) => {
		WarrantySolution.belongsTo(models.warrantySolutionType);
		WarrantySolution.belongsTo(models.warrantyProducts);
		WarrantySolution.belongsTo(models.warranty);
		WarrantySolution.belongsTo(models.user);
		WarrantySolution.hasOne(models.technician, { sourceKey: 'techId', foreignKey: 'id' });
	};

	return WarrantySolution;
};
