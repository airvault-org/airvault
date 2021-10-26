import {DataTypes, ModelDefined, Optional, Sequelize} from 'sequelize';

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

function build(db: any): ModelDefined<AccountAttributes, AccountCreationAttributes> {

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

  db[Account.name] = Account;

  return Account;
}

export = build;
