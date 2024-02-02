import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface UserSettingAttributes {
	id: number;
	userId: number;
	settings: string;
}

// Some fields are optional when calling UserSettingModel.create() or UserSettingModel.build()
interface UserSettingsCreationAttributes extends Optional<UserSettingAttributes, 'userId'> {}

// We need to declare an interface for our model that is basically what our class would be
interface UserSettingInstance extends Model<UserSettingAttributes, UserSettingsCreationAttributes>,
	UserSettingAttributes {}

type UserSettingStatic = ModelCtor<UserSettingInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const UserSetting: UserSettingStatic = sequelize.define<UserSettingInstance>('userSetting', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		userId: {
			allowNull: false,
			type: dataTypes.INTEGER,
		},
		settings: {
			type: dataTypes.JSON,
			allowNull: false,
		},
	}, {
		tableName: 'user_setting',
		underscored: true,
	});

	return UserSetting;
};
