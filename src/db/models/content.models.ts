import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { auditColumns, applyAuditHooks } from './mixins';
import { MediaFile } from './media.model';

export class PlanDesign extends Model {
  [key: string]: any;
}
PlanDesign.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    slug: { type: DataTypes.STRING(190), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    category: {
      type: DataTypes.ENUM(
        'Defined contribution',
        'Defined benefit & cash balance',
        'Combination plans',
        'Owner-only',
        'Specialty'
      ),
      allowNull: false,
    },
    definition: { type: DataTypes.TEXT, allowNull: true },
    whoItFits: { type: DataTypes.TEXT, allowNull: true },
    workedExample: { type: DataTypes.TEXT, allowNull: true },
    requirements: { type: DataTypes.TEXT, allowNull: true },
    imageMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    flyerMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'plan_designs' }
);
applyAuditHooks(PlanDesign);

export class PlanDesignRelated extends Model {
  [key: string]: any;
}
PlanDesignRelated.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    planDesignId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    relatedPlanDesignId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  },
  {
    sequelize,
    tableName: 'plan_design_related',
    timestamps: false,
    indexes: [{ unique: true, fields: ['plan_design_id', 'related_plan_design_id'] }],
  }
);

export class Service extends Model {
  [key: string]: any;
}
Service.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    slug: { type: DataTypes.STRING(190), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    definition: { type: DataTypes.TEXT, allowNull: true },
    whoItFits: { type: DataTypes.TEXT, allowNull: true },
    included: { type: DataTypes.TEXT, allowNull: true },
    requirements: { type: DataTypes.TEXT, allowNull: true },
    imageMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    flyerMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'services' }
);
applyAuditHooks(Service);

export class TeamMember extends Model {
  [key: string]: any;
}
TeamMember.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(190), allowNull: false },
    role: { type: DataTypes.STRING(190), allowNull: true },
    credential: { type: DataTypes.STRING(190), allowNull: true },
    photoMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'team_members' }
);
applyAuditHooks(TeamMember);

export class JobOpening extends Model {
  [key: string]: any;
}
JobOpening.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    slug: { type: DataTypes.STRING(190), allowNull: false, unique: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    department: { type: DataTypes.STRING(150), allowNull: true },
    location: { type: DataTypes.STRING(190), allowNull: true },
    employmentType: {
      type: DataTypes.ENUM('full_time', 'part_time'),
      allowNull: false,
      defaultValue: 'full_time',
    },
    summary: { type: DataTypes.TEXT, allowNull: true },
    responsibilities: { type: DataTypes.JSON, allowNull: true },
    qualifications: { type: DataTypes.JSON, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'job_openings' }
);
applyAuditHooks(JobOpening);

export class InsightResource extends Model {
  [key: string]: any;
}
InsightResource.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.ENUM('whitepaper', 'newsletter', 'form'), allowNull: false },
    slug: { type: DataTypes.STRING(190), allowNull: false, unique: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    fileMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    format: { type: DataTypes.ENUM('pdf', 'xls'), allowNull: true },
    publishedDate: { type: DataTypes.DATEONLY, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'insight_resources' }
);
applyAuditHooks(InsightResource);

export class RegulatoryUpdate extends Model {
  [key: string]: any;
}
RegulatoryUpdate.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: true },
    publishedDate: { type: DataTypes.DATEONLY, allowNull: true },
    tags: { type: DataTypes.JSON, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'regulatory_updates' }
);
applyAuditHooks(RegulatoryUpdate);

export class Recognition extends Model {
  [key: string]: any;
}
Recognition.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    imageMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    href: { type: DataTypes.STRING(1000), allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'recognitions' }
);
applyAuditHooks(Recognition);

export class LegacyMilestone extends Model {
  [key: string]: any;
}
LegacyMilestone.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    period: { type: DataTypes.STRING(100), allowNull: false },
    generation: { type: DataTypes.STRING(100), allowNull: true },
    name: { type: DataTypes.STRING(190), allowNull: true },
    photoMediaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    alt: { type: DataTypes.STRING(255), allowNull: true },
    body: { type: DataTypes.TEXT, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'legacy_milestones' }
);
applyAuditHooks(LegacyMilestone);

export class Faq extends Model {
  [key: string]: any;
}
Faq.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    pageKey: { type: DataTypes.STRING(120), allowNull: false },
    question: { type: DataTypes.STRING(500), allowNull: false },
    answer: { type: DataTypes.TEXT, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'faqs' }
);
applyAuditHooks(Faq);

export class CareerBenefit extends Model {
  [key: string]: any;
}
CareerBenefit.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    text: { type: DataTypes.STRING(500), allowNull: false },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'career_benefits' }
);
applyAuditHooks(CareerBenefit);

export class InternationalOffice extends Model {
  [key: string]: any;
}
InternationalOffice.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    country: { type: DataTypes.STRING(150), allowNull: false },
    detail: { type: DataTypes.STRING(500), allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...auditColumns,
  },
  { sequelize, tableName: 'international_offices' }
);
applyAuditHooks(InternationalOffice);

PlanDesign.belongsTo(MediaFile, { foreignKey: 'imageMediaId', as: 'image' });
PlanDesign.belongsTo(MediaFile, { foreignKey: 'flyerMediaId', as: 'flyer' });
Service.belongsTo(MediaFile, { foreignKey: 'imageMediaId', as: 'image' });
Service.belongsTo(MediaFile, { foreignKey: 'flyerMediaId', as: 'flyer' });
TeamMember.belongsTo(MediaFile, { foreignKey: 'photoMediaId', as: 'photo' });
InsightResource.belongsTo(MediaFile, { foreignKey: 'fileMediaId', as: 'file' });
Recognition.belongsTo(MediaFile, { foreignKey: 'imageMediaId', as: 'image' });
LegacyMilestone.belongsTo(MediaFile, { foreignKey: 'photoMediaId', as: 'photo' });

PlanDesign.belongsToMany(PlanDesign, {
  through: PlanDesignRelated,
  foreignKey: 'planDesignId',
  otherKey: 'relatedPlanDesignId',
  as: 'relatedPlans',
});
