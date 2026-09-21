import { Router } from 'express';
import { buildPublicReadRouter } from '../core/crud';
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
  ContentBlock,
} from '../db/models';
import authRoutes from '../modules/auth/routes';
import navPublicRoutes from '../modules/nav-items/publicRoutes';
import siteSettingsPublicRoutes from '../modules/site-settings/publicRoutes';
import contactPublicRoutes from '../modules/contact-submissions/publicRoutes';

const router = Router();

// Public API responses embed the linked MediaFile record as-is; filePath is
// the server's absolute disk path and has no reason to be exposed to
// anonymous website visitors, so every media association below excludes it.
const MEDIA_ATTRS = { exclude: ['filePath'] };

router.use('/auth', authRoutes);
router.use('/contact', contactPublicRoutes);
router.use('/nav-items', navPublicRoutes);
router.use('/site-settings', siteSettingsPublicRoutes);

router.use(
  '/plan-designs',
  buildPublicReadRouter(PlanDesign, {
    resource: 'plan_designs',
    slugField: 'slug',
    filterableFields: ['category'],
    include: [
      { association: 'image', attributes: MEDIA_ATTRS },
      { association: 'flyer', attributes: MEDIA_ATTRS },
      { association: 'relatedPlans' },
    ],
  })
);

router.use(
  '/services',
  buildPublicReadRouter(Service, {
    resource: 'services',
    slugField: 'slug',
    include: [
      { association: 'image', attributes: MEDIA_ATTRS },
      { association: 'flyer', attributes: MEDIA_ATTRS },
    ],
  })
);

router.use(
  '/team-members',
  buildPublicReadRouter(TeamMember, {
    resource: 'team_members',
    include: [{ association: 'photo', attributes: MEDIA_ATTRS }],
  })
);

router.use(
  '/job-openings',
  buildPublicReadRouter(JobOpening, {
    resource: 'job_openings',
    slugField: 'slug',
    filterableFields: ['department', 'employmentType'],
  })
);

router.use(
  '/insight-resources',
  buildPublicReadRouter(InsightResource, {
    resource: 'insight_resources',
    slugField: 'slug',
    filterableFields: ['type'],
    include: [{ association: 'file', attributes: MEDIA_ATTRS }],
  })
);

router.use(
  '/regulatory-updates',
  buildPublicReadRouter(RegulatoryUpdate, { resource: 'regulatory_updates' })
);

router.use(
  '/recognitions',
  buildPublicReadRouter(Recognition, {
    resource: 'recognitions',
    include: [{ association: 'image', attributes: MEDIA_ATTRS }],
  })
);

router.use(
  '/legacy-milestones',
  buildPublicReadRouter(LegacyMilestone, {
    resource: 'legacy_milestones',
    include: [{ association: 'photo', attributes: MEDIA_ATTRS }],
  })
);

router.use('/faqs', buildPublicReadRouter(Faq, { resource: 'faqs', filterableFields: ['pageKey'] }));

router.use(
  '/career-benefits',
  buildPublicReadRouter(CareerBenefit, { resource: 'career_benefits' })
);

router.use(
  '/international-offices',
  buildPublicReadRouter(InternationalOffice, { resource: 'international_offices' })
);

router.use('/offices', buildPublicReadRouter(Office, { resource: 'offices', hasPublishFlag: false }));
router.use('/portals', buildPublicReadRouter(Portal, { resource: 'portals', hasPublishFlag: false }));
router.use(
  '/social-links',
  buildPublicReadRouter(SocialLink, { resource: 'social_links', hasPublishFlag: false })
);

router.use(
  '/content-blocks',
  buildPublicReadRouter(ContentBlock, {
    resource: 'content_blocks',
    filterableFields: ['pageKey', 'sectionKey'],
    include: [
      { association: 'image', attributes: MEDIA_ATTRS },
      { association: 'video', attributes: MEDIA_ATTRS },
    ],
  })
);

export default router;
