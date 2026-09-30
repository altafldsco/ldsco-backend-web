'use strict';

/**
 * Replaces the whole header navigation with the 2026-09 mega-menu structure
 * (up to four levels deep). Pay Now / Login are not nav items — they stay as
 * the `nav` content_blocks CTAs rendered on the right of the header.
 *
 * Links reuse existing pages where one exists. Leaves under /services/<slug>/
 * and /plan-design/<slug>/ resolve through those dynamic routes once a
 * service / plan design with that slug is created in the admin panel.
 *
 * Run on its own (db:seed:all would re-run the base content seeder):
 *   npx sequelize-cli db:seed --seed 20260930100001-restructure-nav-items.js
 */

const NAV_TREE = [
  {
    label: 'Who We Serve',
    href: '/who-we-serve/',
    children: [
      {
        label: 'TPAs',
        href: '/who-we-serve/tpa/',
        children: [
          {
            label: 'Capacity',
            href: '/who-we-serve/tpa/capacity/',
            children: [
              { label: 'Back Office Support', href: '/who-we-serve/tpa/capacity/#back-office-support' },
              { label: 'CRM & Workflow System', href: '/who-we-serve/tpa/capacity/#crm-workflow' },
            ],
          },
          { label: 'Capital', href: '/who-we-serve/tpa/capital/' },
          { label: 'Continuity', href: '/who-we-serve/tpa/continuity/' },
        ],
      },
      { label: 'Business Owners', href: '/who-we-serve/business-owners/' },
      {
        label: 'Plan Advisors',
        href: '/who-we-serve/plan-advisors/',
        children: [
          { label: 'CPAs', href: '/who-we-serve/cpas/' },
          { label: 'Financial Advisors', href: '/who-we-serve/financial-advisors/' },
          { label: 'Attorneys', href: '/who-we-serve/attorneys/' },
        ],
      },
    ],
  },
  {
    label: 'Services',
    href: '/services/',
    children: [
      {
        label: 'Plan Design',
        href: '/plan-design/',
        children: [
          { label: '401(k) & Profit Sharing Plans', href: '/plan-design/401k-profit-sharing-plans/' },
          { label: 'Defined Benefit & Cash Balance Plans', href: '/plan-design/defined-benefit-cash-balance-plans/' },
          { label: 'Rollover Business Startup (ROBS)', href: '/plan-design/rollover-business-startup-robs/' },
          { label: 'Governmental Plans', href: '/plan-design/governmental-plans/' },
          { label: 'ESOP', href: '/plan-design/esop-employee-ownership/' },
          { label: 'After-Tax & Roth', href: '/plan-design/after-tax-roth/' },
          {
            label: 'Overfunded Defined Benefit or Cash Balance Plans',
            href: '/plan-design/overfunded-db-cash-balance-plans/',
            children: [
              { label: 'Estate Planning', href: '/services/estate-planning/' },
              { label: 'Qualified Replacement Plan (QRP)', href: '/services/qualified-replacement-plan-qrp/' },
              { label: 'Plan Termination', href: '/services/plan-termination/' },
              { label: 'Plan Sale', href: '/services/plan-sale/' },
            ],
          },
          {
            label: 'Insurance',
            href: '/plan-design/insurance-funded-plans/',
            children: [
              { label: 'Defined Benefit & Cash Balance Plans', href: '/plan-design/insurance-defined-benefit-cash-balance-plans/' },
              { label: '401(k) & Profit Sharing Plans', href: '/plan-design/insurance-401k-profit-sharing-plans/' },
            ],
          },
        ],
      },
      {
        label: 'Actuary Consultation',
        href: '/services/actuarial-consulting/',
        children: [
          { label: 'Overfunding & Underfunding', href: '/services/overfunding-underfunding/' },
          { label: 'Investment & Assumed Rates of Return', href: '/services/investment-assumed-rates-of-return/' },
          { label: 'Adjusted Funding Target Attainment Percentage (AFTAP)', href: '/services/aftap/' },
          { label: 'Plan Valuation', href: '/services/plan-valuation/' },
          { label: 'Form Schedule SB', href: '/services/form-schedule-sb/' },
          { label: 'PBGC Comprehensive Premium Filing', href: '/services/pbgc-premium-filing/' },
          { label: 'Accounting Standards Codification 715', href: '/services/asc-715/' },
        ],
      },
      {
        label: 'ERISA Attorney Consultation',
        href: '/services/erisa-consulting/',
        children: [
          { label: 'Control & Affiliated Service Groups (CG & ASG)', href: '/services/controlled-affiliated-service-groups/' },
          { label: 'Real Estate', href: '/services/real-estate/' },
          { label: 'Private Equity Investments', href: '/services/private-equity-investments/' },
          { label: 'Qualified Domestic Relations Order (QDRO)', href: '/services/qdro/' },
          { label: 'Plan Corrections & Audits', href: '/services/plan-corrections-audits/' },
          { label: 'Unrelated Business Taxable Income (UBTI)', href: '/services/ubti/' },
          { label: 'Qualified Separate Line of Business (QSLOB)', href: '/services/qslob/' },
        ],
      },
      { label: 'Delinquent Filer Voluntary Compliance Program (DFVCP)', href: '/services/dfvcp/' },
      {
        label: 'Employee Plans Compliance Resolution System (EPCRS)',
        href: '/services/epcrs/',
        children: [
          { label: 'Self-Correction Program (SCP)', href: '/services/self-correction-program-scp/' },
          { label: 'Voluntary Correction Program (VCP)', href: '/services/voluntary-correction-program-vcp/' },
          { label: 'Audit Closing Agreement Program (Audit CAP)', href: '/services/audit-cap/' },
        ],
      },
      { label: 'Pension Benefit Guaranty Corporation (PBGC)', href: '/services/pbgc/' },
      { label: 'Voluntary Fiduciary Correction Program (VFCP)', href: '/services/vfcp/' },
      { label: 'Streamlined Self-Correction Component (SCC)', href: '/services/streamlined-self-correction-scc/' },
      {
        label: 'Plan Services',
        href: '/services/plan-services/',
        children: [
          { label: 'Plan Notice Communication', href: '/services/plan-notice-communication/' },
          { label: 'Participant Coordination Center', href: '/services/participant-call-center/' },
          { label: '3(16) Admin', href: '/services/3-16-fiduciary-administration/' },
          { label: 'Payroll Deferral Submission', href: '/services/payroll-deferral-submission/' },
        ],
      },
    ],
  },
  {
    label: 'Insights',
    href: '/insights/',
    children: [
      { label: 'Plan Calendar', href: '/resources/plan-calendar/' },
      { label: 'Newsletters', href: '/insights/newsletters/' },
      { label: 'Forms', href: '/insights/forms/' },
    ],
  },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'Our People', href: '/about/our-people/' },
      { label: 'Our Legacy', href: '/about/legacy/' },
      { label: 'LDSCO ESOP', href: '/about/esop/' },
      { label: 'Your Sales Partner', href: '/partner-with-us/' },
    ],
  },
];

// The tree as it stood before this seeder (captured from the local DB), so
// `db:seed:undo --seed` puts the previous menu back.
const PREVIOUS_NAV_TREE = [
  {
    label: 'Who We Serve',
    href: '/who-we-serve/tpa/',
    children: [
      {
        label: 'TPA',
        href: '/who-we-serve/tpa/',
        children: [
          { label: 'Capacity', href: '/who-we-serve/tpa/capacity/' },
          { label: 'Capital', href: '/who-we-serve/tpa/capital/' },
          { label: 'Continuity', href: '/who-we-serve/tpa/continuity/' },
        ],
      },
      { label: 'Business Owners', href: '/who-we-serve/business-owners/' },
      { label: 'Financial Advisors', href: '/who-we-serve/financial-advisors/' },
      { label: 'CPAs', href: '/who-we-serve/cpas/' },
    ],
  },
  { label: 'Plan Design', href: '/plan-design/' },
  { label: 'Services', href: '/services/' },
  {
    label: 'Insights',
    href: '/insights/',
    children: [
      { label: 'Whitepapers', href: '/insights/whitepapers/' },
      { label: 'Regulatory updates', href: '/insights/regulatory/' },
      { label: 'Newsletters', href: '/insights/newsletters/' },
      { label: 'Forms', href: '/insights/forms/' },
      { label: 'View all insights', href: '/insights/' },
    ],
  },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'Our People', href: '/about/our-people/' },
      { label: 'Legacy', href: '/about/legacy/' },
      { label: 'Philosophy', href: '/about/philosophy/' },
      { label: 'Locations', href: '/about/locations/' },
      { label: 'Recognition', href: '/about/recognition/' },
    ],
  },
  { label: 'Partner With Us', href: '/partner-with-us/' },
  { label: 'Contact', href: '/contact/' },
];

async function insertTree(queryInterface, items, parentId, now, transaction) {
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const [id] = await queryInterface.sequelize.query(
      'INSERT INTO nav_items (parent_id, label, href, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      { replacements: [parentId, item.label, item.href ?? null, i, now, now], type: 'INSERT', transaction }
    );
    if (item.children?.length) {
      await insertTree(queryInterface, item.children, id, now, transaction);
    }
  }
}

async function replaceTree(queryInterface, tree) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    // Detach before deleting: letting parent_id's ON DELETE CASCADE clear a
    // four-level tree trips MySQL's "cascade exceeds max tables limit" error.
    await queryInterface.sequelize.query('UPDATE nav_items SET parent_id = NULL', { transaction });
    await queryInterface.sequelize.query('DELETE FROM nav_items', { transaction });
    await insertTree(queryInterface, tree, null, new Date(), transaction);
  });
}

module.exports = {
  up: (queryInterface) => replaceTree(queryInterface, NAV_TREE),
  down: (queryInterface) => replaceTree(queryInterface, PREVIOUS_NAV_TREE),
};
