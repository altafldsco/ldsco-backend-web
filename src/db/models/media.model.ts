import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { auditColumns, applyAuditHooks } from './mixins';

// Uploaded files are stored with a relative "/uploads/..." url so the value
// stays portable across environments. Every consumer — admin panel and the
// public website alike — needs an absolute URL to actually load the file,
// so that's resolved once here, at read time, instead of relying on each
// caller (there are many, across two separate frontends) to know to do it.
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;

export class MediaFile extends Model {
  [key: string]: any;
}
MediaFile.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    fileName: { type: DataTypes.STRING(255), allowNull: false },
    filePath: { type: DataTypes.STRING(500), allowNull: true },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      get(): string {
        const raw = this.getDataValue('url') as string | null;
        if (!raw) return raw ?? '';
        if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
        if (raw.startsWith('/uploads/')) return `${PUBLIC_BASE_URL}${raw}`;
        return raw;
      },
    },
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
