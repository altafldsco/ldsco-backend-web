import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';

export class ContactSubmission extends Model {
  [key: string]: any;
}
ContactSubmission.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(190), allowNull: false },
    company: { type: DataTypes.STRING(190), allowNull: true },
    email: { type: DataTypes.STRING(190), allowNull: false, validate: { isEmail: true } },
    phone: { type: DataTypes.STRING(50), allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM('new', 'read', 'archived'),
      allowNull: false,
      defaultValue: 'new',
    },
    updatedBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  },
  { sequelize, tableName: 'contact_submissions' }
);

ContactSubmission.addHook('beforeUpdate', (instance: any, options: any) => {
  if (options.userId) {
    instance.updatedBy = options.userId;
  }
});
