import { Router } from 'express';
import { buildAdminCrudRouter } from '../core/crud';
import {
  PlanDesign,
  Service,
  TeamMember,
  JobOpening,
  InsightResource,
  RegulatoryUpdate,
  Recognition,
  LegacyMilestone,
  Faq,
  CareerBenefit,
  InternationalOffice,
  Office,
  Portal,
  SocialLink,
  NavItem,
  ContentBlock,
} from '../db/models';
import usersRoutes from '../modules/users/routes';
import rolesRoutes from '../modules/roles/routes';
import permissionsRoutes from '../modules/permissions/routes';
import mediaRoutes from '../modules/media/routes';
import siteSettingsRoutes from '../modules/site-settings/routes';
import contactSubmissionsRoutes from '../modules/contact-submissions/adminRoutes';
import planDesignRelatedRoutes from '../modules/plan-designs/relatedRoutes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/roles', rolesRoutes);
router.use('/permissions', permissionsRoutes);
router.use('/media', mediaRoutes);
router.use('/site-settings', siteSettingsRoutes);
router.use('/contact-submissions', contactSubmissionsRoutes);
router.use('/plan-designs', planDesignRelatedRoutes);

router.use(
  '/plan-designs',
  buildAdminCrudRouter(PlanDesign, {
    resource: 'plan_designs',
    filterableFields: ['category', 'isPublished'],
    searchableFields: ['name', 'slug'],
    include: [{ association: 'image' }, { association: 'flyer' }, { association: 'relatedPlans' }],
  })
);

router.use(
  '/services',
  buildAdminCrudRouter(Service, {
    resource: 'services',
    filterableFields: ['isPublished'],
    searchableFields: ['name', 'slug'],
    include: [{ association: 'image' }, { association: 'flyer' }],
  })
);

router.use(
  '/team-members',
  buildAdminCrudRouter(TeamMember, {
    resource: 'team_members',
    searchableFields: ['name'],
    include: [{ association: 'photo' }],
  })
);

router.use(
  '/job-openings',
  buildAdminCrudRouter(JobOpening, {
    resource: 'job_openings',
    filterableFields: ['department', 'employmentType', 'isPublished'],
    searchableFields: ['title', 'slug'],
  })
);

router.use(
  '/insight-resources',
  buildAdminCrudRouter(InsightResource, {
    resource: 'insight_resources',
    filterableFields: ['type', 'isPublished'],
    searchableFields: ['title', 'slug'],
    include: [{ association: 'file' }],
  })
);

router.use(
  '/regulatory-updates',
  buildAdminCrudRouter(RegulatoryUpdate, { resource: 'regulatory_updates', searchableFields: ['title'] })
);

router.use(
  '/recognitions',
  buildAdminCrudRouter(Recognition, { resource: 'recognitions', include: [{ association: 'image' }] })
);

router.use(
  '/legacy-milestones',
  buildAdminCrudRouter(LegacyMilestone, { resource: 'legacy_milestones', include: [{ association: 'photo' }] })
);

router.use(
  '/faqs',
  buildAdminCrudRouter(Faq, { resource: 'faqs', filterableFields: ['pageKey', 'isPublished'] })
);

router.use('/career-benefits', buildAdminCrudRouter(CareerBenefit, { resource: 'career_benefits' }));

router.use(
  '/international-offices',
  buildAdminCrudRouter(InternationalOffice, { resource: 'international_offices' })
);

router.use('/offices', buildAdminCrudRouter(Office, { resource: 'offices', hasPublishFlag: false }));
router.use('/portals', buildAdminCrudRouter(Portal, { resource: 'portals', hasPublishFlag: false }));
router.use(
  '/social-links',
  buildAdminCrudRouter(SocialLink, { resource: 'social_links', hasPublishFlag: false })
);
router.use('/nav-items', buildAdminCrudRouter(NavItem, { resource: 'nav_items', hasPublishFlag: false }));

router.use(
  '/content-blocks',
  buildAdminCrudRouter(ContentBlock, {
    resource: 'content_blocks',
    filterableFields: ['pageKey', 'sectionKey', 'isPublished'],
    include: [{ association: 'image' }],
  })
);

export default router;
