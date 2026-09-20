import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from './sequelize';
import { auditColumns, applyAuditHooks } from './mixins';

export class Role extends Model {
  [key: string]: any;
}
Role.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    slug: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    isSuperAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    ...auditColumns,
  },
  { sequelize, tableName: 'roles' }
);
applyAuditHooks(Role);

export class Permission extends Model {
  [key: string]: any;
}
Permission.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    resource: { type: DataTypes.STRING(120), allowNull: false },
    action: { type: DataTypes.ENUM('create', 'read', 'update', 'delete'), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    tableName: 'permissions',
    indexes: [{ unique: true, fields: ['resource', 'action'] }],
  }
);

export class RolePermission extends Model {
  [key: string]: any;
}
RolePermission.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    permissionId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    ...auditColumns,
  },
  {
    sequelize,
    tableName: 'role_permissions',
    indexes: [{ unique: true, fields: ['role_id', 'permission_id'] }],
  }
);
applyAuditHooks(RolePermission);

export class User extends Model {
  [key: string]: any;

  async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}
User.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    email: {
      type: DataTypes.STRING(190),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
    roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    lastLoginAt: { type: DataTypes.DATE, allowNull: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'users' }
);
applyAuditHooks(User);

Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'roleId',
  otherKey: 'permissionId',
  as: 'permissions',
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permissionId',
  otherKey: 'roleId',
  as: 'roles',
});
