import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface GoodsAttributes {
	id: number;
	shipmentId: number,
	quantity?: number;
	countryCode?: string;
	itemNumber?: string;
	title?: string;
	customsCode?: string;
	unitValue?: number;
	weight?: number;
	currency: string;
}

// Some fields are optional when calling GoodsModel.create() or GoodsModel.build()
interface GoodsCreationAttributes extends Optional<GoodsAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface GoodsInstance extends Model<GoodsAttributes, GoodsCreationAttributes>,
	GoodsAttributes { }

type GoodsStatic = ModelCtor<GoodsInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Goods: GoodsStatic = sequelize.define<GoodsInstance>('goods', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		shipmentId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		countryCode: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		itemNumber: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		title: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		customsCode: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		unitValue: {
			type: dataTypes.BIGINT,
			allowNull: true,
			get() {
				const temp = this.getDataValue('unitValue');
				return temp === null ? null : temp / 100;
			},
			set(valueToBeSet: number) {
				this.setDataValue('unitValue', valueToBeSet * 100);
			}
		},
		weight: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		currency: {
			type: dataTypes.ENUM('DKK', 'NOK', 'SEK', 'EUR', 'GBP'),
			allowNull: false,
		},
	}, {
		tableName: 'goods',
		underscored: true,
	});

	return Goods;
};
