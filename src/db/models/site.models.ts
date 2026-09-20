import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { auditColumns, applyAuditHooks } from './mixins';

export class SiteSetting extends Model {
  [key: string]: any;
}
SiteSetting.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    companyName: { type: DataTypes.STRING(255), allowNull: true },
    legalName: { type: DataTypes.STRING(255), allowNull: true },
    foundedYear: { type: DataTypes.INTEGER, allowNull: true },
    email: { type: DataTypes.STRING(190), allowNull: true },
    phone: { type: DataTypes.STRING(50), allowNull: true },
    telefax: { type: DataTypes.STRING(50), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    headquartersLabel: { type: DataTypes.STRING(255), allowNull: true },
    headquartersAddress: { type: DataTypes.JSON, allowNull: true },
    headquartersPhone: { type: DataTypes.STRING(50), allowNull: true },
    headquartersMapHref: { type: DataTypes.STRING(1000), allowNull: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'site_settings' }
);
applyAuditHooks(SiteSetting);

export class Office extends Model {
  [key: string]: any;
}
Office.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    region: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(50), allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    ...auditColumns,
  },
  { sequelize, tableName: 'offices' }
);
applyAuditHooks(Office);

export class Portal extends Model {
  [key: string]: any;
}
Portal.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    label: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    href: { type: DataTypes.STRING(1000), allowNull: false },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    ...auditColumns,
  },
  { sequelize, tableName: 'portals' }
);
applyAuditHooks(Portal);

export class SocialLink extends Model {
  [key: string]: any;
}
SocialLink.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    platform: {
      type: DataTypes.ENUM('facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'other'),
      allowNull: false,
    },
    href: { type: DataTypes.STRING(1000), allowNull: false },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    ...auditColumns,
  },
  { sequelize, tableName: 'social_links' }
);
applyAuditHooks(SocialLink);

export class NavItem extends Model {
  [key: string]: any;
}
NavItem.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    parentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    label: { type: DataTypes.STRING(150), allowNull: false },
    href: { type: DataTypes.STRING(500), allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    ...auditColumns,
  },
  { sequelize, tableName: 'nav_items' }
);
applyAuditHooks(NavItem);

NavItem.hasMany(NavItem, { foreignKey: 'parentId', as: 'children' });
NavItem.belongsTo(NavItem, { foreignKey: 'parentId', as: 'parent' });
