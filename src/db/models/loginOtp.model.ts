import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { User } from './rbac.models';

/**
 * One pending email-OTP challenge per login attempt. The code itself is never
 * stored — only an HMAC of it — and a row is single-use (consumedAt).
 */
export class LoginOtp extends Model {
  [key: string]: any;
}
LoginOtp.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    challengeId: { type: DataTypes.STRING(64), allowNull: false, unique: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    codeHash: { type: DataTypes.STRING(64), allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
    attempts: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    resendCount: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    lastSentAt: { type: DataTypes.DATE, allowNull: false },
    consumedAt: { type: DataTypes.DATE, allowNull: true },
    ipAddress: { type: DataTypes.STRING(64), allowNull: true },
  },
  { sequelize, tableName: 'login_otps' }
);

LoginOtp.belongsTo(User, { foreignKey: 'userId', as: 'user' });
