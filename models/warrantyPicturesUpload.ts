import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface WarrantyPicturesUploadAttributes {
	id: number;
	warrantyProductId?: number;
	warrantyId?: number;
	file?: string;
}

// Some fields are optional when calling WarrantyPicturesUploadModel.create() or WarrantyPicturesUploadModel.build()
interface WarrantyPicturesUploadCreationAttributes extends Optional<WarrantyPicturesUploadAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface WarrantyPicturesUploadInstance extends Model<WarrantyPicturesUploadAttributes, WarrantyPicturesUploadCreationAttributes>,
	WarrantyPicturesUploadAttributes { }

type WarrantyPicturesUploadStatic = ModelCtor<WarrantyPicturesUploadInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const WarrantyPicturesUpload: WarrantyPicturesUploadStatic = sequelize.define<WarrantyPicturesUploadInstance>('warrantyPicturesUpload', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		warrantyProductId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		warrantyId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		file: {
			type: dataTypes.STRING,
			allowNull: false,
		},

	}, {
		tableName: 'warranty_pictures_upload',
		underscored: true,
	});

	WarrantyPicturesUpload.associate = (models) => {
		// WarrantyPicturesUpload.belongsTo(models.warrantyProducts);
		// WarrantyPicturesUpload.belongsTo(models.warranty);
	};
	return WarrantyPicturesUpload;
};
