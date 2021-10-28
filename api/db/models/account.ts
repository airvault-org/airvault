import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { DB } from './index';

interface AccountAttributes {
  id: number;
  uuid: string;
  name: string;
  username: string;
  encryptedPassword: string;
  email: string;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {
}

function build(db: DB): ModelDefined<AccountAttributes, AccountCreationAttributes> {

  const Account = db.sequelize.define('Account', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: false
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    encryptedPassword: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'accounts',
  });

  db.registerModel(Account.name, Account);

  return Account;
}

export = build;
