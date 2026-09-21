import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { auditColumns, applyAuditHooks } from './mixins';
import { MediaFile } from './media.model';

export class ContentBlock extends Model {
  [key: string]: any;
}
ContentBlock.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    pageKey: { type: DataTypes.STRING(120), allowNull: false },
    sectionKey: { type: DataTypes.STRING(120), allowNull: false },
    eyebrow: { type: DataTypes.STRING(255), allowNull: true },
    heading: { type: DataTypes.STRING(500), allowNull: true },
    subheading: { type: DataTypes.STRING(500), allowNull: true },
    body: { type: DataTypes.TEXT, allowNull: true },
    imageMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    videoMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    linkLabel: { type: DataTypes.STRING(190), allowNull: true },
    linkHref: { type: DataTypes.STRING(1000), allowNull: true },
    secondaryLinkLabel: { type: DataTypes.STRING(190), allowNull: true },
    secondaryLinkHref: { type: DataTypes.STRING(1000), allowNull: true },
    extra: { type: DataTypes.JSON, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  {
    sequelize,
    tableName: 'content_blocks',
    indexes: [{ fields: ['page_key', 'section_key'] }],
  }
);
applyAuditHooks(ContentBlock);

ContentBlock.belongsTo(MediaFile, { foreignKey: 'imageMediaId', as: 'image' });
ContentBlock.belongsTo(MediaFile, { foreignKey: 'videoMediaId', as: 'video' });
