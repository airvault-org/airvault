import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { DB } from './index';

interface ItemAttributes {
  id: number;
  uuid: string;
  type: string;
  content: string;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'id'> {
}

function build(db: DB): ModelDefined<ItemAttributes, ItemCreationAttributes> {

  const Item = db.sequelize.define('Item',
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
      type: {
        type: new DataTypes.STRING(32),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      tableName: 'items',
    });

  db.registerModel(Item.name, Item);

  return Item;
}

export = build;
