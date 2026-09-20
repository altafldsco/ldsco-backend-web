import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { auditColumns, applyAuditHooks } from './mixins';

export class MediaFile extends Model {
  [key: string]: any;
}
MediaFile.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    fileName: { type: DataTypes.STRING(255), allowNull: false },
    filePath: { type: DataTypes.STRING(500), allowNull: true },
    url: { type: DataTypes.STRING(1000), allowNull: false },
    mimeType: { type: DataTypes.STRING(150), allowNull: true },
    fileType: {
      type: DataTypes.ENUM('image', 'video', 'pdf', 'doc', 'other'),
      allowNull: false,
      defaultValue: 'other',
    },
    sizeBytes: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    altText: { type: DataTypes.STRING(255), allowNull: true },
    uploadedBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'media_files' }
);
applyAuditHooks(MediaFile);
