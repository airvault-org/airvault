import {DataTypes, ModelDefined, Optional, Sequelize} from 'sequelize';

interface VaultAttributes {
  id: number;
  uuid: string;
  name: string;
}

interface VaultCreationAttributes extends Optional<VaultAttributes, 'id'> {
}

function build(db: any): ModelDefined<VaultAttributes, VaultCreationAttributes> {

  const Vault = db.sequelize.define('Vault',
    {
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
    }, {
      tableName: 'vaults',
    });


  db[Vault.name] = Vault;

  return Vault;

}

export {build}
