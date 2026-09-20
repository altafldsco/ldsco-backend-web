import { DataTypes, Model, ModelStatic } from 'sequelize';

/**
 * created_by / updated_by are populated from a `userId` passed through
 * Sequelize call options (e.g. `Model.create(data, { userId: req.user.id })`
 * or `instance.update(data, { userId: req.user.id })`), not from the
 * request body — keeps audit fields tamper-proof from client input.
 */
export const auditColumns = {
  createdBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  updatedBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
};

export function applyAuditHooks(model: ModelStatic<Model>) {
  model.addHook('beforeCreate', (instance: any, options: any) => {
    if (options.userId) {
      instance.createdBy = options.userId;
      instance.updatedBy = options.userId;
    }
  });
  model.addHook('beforeUpdate', (instance: any, options: any) => {
    if (options.userId) {
      instance.updatedBy = options.userId;
    }
  });
}
