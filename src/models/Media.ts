import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Media extends Model {
  public id!: number;
  public url!: string;
  public mediaType!: string;
  public mediaUrl!: string;
  public title?: string;
}

Media.init(
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mediaType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Media',
    tableName: 'media',
  },
);

export default Media;
