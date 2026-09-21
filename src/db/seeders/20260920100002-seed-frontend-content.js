'use strict';

// Transcribed from ldsco-frontend-web's hardcoded content (see plan-designs.api.ts,
// services.api.ts, team.api.ts, job-openings.api.ts, insights.api.ts) so the admin
// panel starts from the site's real current content instead of empty tables.

const PLAN_DESIGNS = [
  {
    slug: '401k-safe-harbor-match',
    name: '401(k) with Safe Harbor Match',
    category: 'Defined contribution',
    definition:
      'A 401(k) plan where the employer commits to a safe harbor match, which automatically satisfies ADP and ACP nondiscrimination testing.',
    whoItFits:
      'Fits growing companies that want owners and highly compensated employees to defer the maximum without annual testing risk. Typically fits [add employee count range] employees.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements:
      'The safe harbor match must be committed before the plan year and funded on a set schedule; reducing or removing it generally requires advance participant notice.',
    pairsWith: ['new-comparability', 'cash-balance'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/SHM.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_SHM.pdf',
  },
  {
    slug: '401k-adp-tested',
    name: '401(k), ADP-Tested',
    category: 'Defined contribution',
    definition:
      'A traditional 401(k) plan without a safe harbor formula, where employee deferrals are checked each year against the ADP and ACP nondiscrimination tests.',
    whoItFits:
      'Fits owners comfortable with some testing risk in exchange for skipping a mandatory employer contribution. Typically fits [add profit profile] businesses.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements:
      'Requires annual ADP/ACP testing, and may require corrective distributions or additional employer contributions if a test fails.',
    pairsWith: ['new-comparability', 'social-security-integration'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/ADPplan.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_ADPplan.pdf',
  },
  {
    slug: 'new-comparability',
    name: 'New Comparability',
    category: 'Defined contribution',
    definition:
      'A profit-sharing design that groups employees so the employer contribution can be weighted toward owners and key employees while still passing nondiscrimination testing.',
    whoItFits:
      'Fits businesses with a meaningful age or compensation gap between the owner and staff, and [add profit profile] profit levels to fund the allocation.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements: 'Requires annual cross-testing on projected benefits and a plan document that defines the allocation groups.',
    pairsWith: ['cash-balance', '401k-safe-harbor-match'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/NC.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_NC.pdf',
  },
  {
    slug: 'social-security-integration',
    name: 'Social Security Integration',
    category: 'Defined contribution',
    definition:
      'A permitted disparity formula that lets the employer contribution rate increase above the Social Security taxable wage base, rewarding higher earners within IRS limits.',
    whoItFits:
      'Fits owner-heavy businesses where most staff earn below the taxable wage base and the owner earns well above it.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements: 'The integration level and contribution rates must stay within IRS permitted-disparity limits, tested annually.',
    pairsWith: ['401k-adp-tested', 'new-comparability'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/DCSHMSSI.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_DCSHMSSI.pdf',
  },
  {
    slug: 'upside-down-401k',
    name: 'Upside-Down 401(k)',
    category: 'Defined contribution',
    definition:
      "A 401(k) restructuring for plans where non-owner deferral rates are limiting how much the owner can defer, correcting the imbalance through plan design rather than cutting owner deferrals.",
    whoItFits: "Fits existing 401(k) sponsors who've been told to cut back their own deferrals because of low staff participation.",
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements:
      'Requires a plan redesign, often adding a safe harbor or new comparability layer, plus a transition plan for the current plan year.',
    pairsWith: ['new-comparability', 'cash-balance'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/upsidedownplan.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/05/2020_upsidedownDC.pdf',
  },
  {
    slug: 'cash-balance',
    name: 'Cash Balance',
    category: 'Defined benefit & cash balance',
    definition:
      "A defined benefit plan that credits each participant's account with a pay credit and an interest credit, letting owners contribute well beyond 401(k) limits.",
    whoItFits:
      'Fits owners age 45 and up with stable, strong profits who want to accelerate retirement savings beyond what a 401(k) alone allows.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements: "Requires an enrolled actuary's annual certification, a multi-year funding commitment, and advance notice for material amendments.",
    pairsWith: ['401k-safe-harbor-match', 'combo-dc-db'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/DCCB.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_DCCB.pdf',
  },
  {
    slug: '401k-cash-balance-combo',
    name: '401(k) + Cash Balance Combo',
    category: 'Defined benefit & cash balance',
    definition:
      "A 401(k) and cash balance plan operated together so the owner's total contribution combines 401(k), profit sharing, and a cash balance credit.",
    whoItFits: "Fits owners who've maxed out a 401(k) and profit-sharing plan and want additional tax-deferred capacity within a stable-profit business.",
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements:
      'Requires combined nondiscrimination testing across both plans, plus the same actuarial certification and funding commitment as a standalone cash balance plan.',
    pairsWith: ['cash-balance', 'new-comparability'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/DCCB.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_DCCB.pdf',
  },
  {
    slug: 'combo-dc-db',
    name: 'Combination DC/DB Plan',
    category: 'Combination plans',
    definition:
      'A paired defined contribution and defined benefit plan structure designed together from the start, rather than a cash balance plan layered onto an existing 401(k).',
    whoItFits: 'Fits owners designing a plan from scratch who want the DC and DB pieces to work together for maximum owner contribution and staff cost efficiency.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements: 'Requires coordinated plan documents for both plans and gateway/nondiscrimination testing across the combination.',
    pairsWith: ['cash-balance', 'owner-only-401k-defined-benefit'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/DCDB.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_DCDB.pdf',
  },
  {
    slug: 'combo-dc-db-with-insurance',
    name: 'Combination DC/DB Plan with Insurance',
    category: 'Combination plans',
    definition:
      "A combination DC/DB plan that incorporates life insurance funding inside the defined benefit plan as part of the owner's overall benefit and protection strategy.",
    whoItFits: 'Fits owners who want the combination plan\'s contribution capacity along with a permanent life insurance component funded inside the plan.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements: 'Insurance incidental-benefit limits must be tracked alongside standard DB funding and testing requirements.',
    pairsWith: ['combo-dc-db', 'cash-balance'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/DCDBINS.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/06/2020_DCDBINS.pdf',
  },
  {
    slug: 'owner-only-401k',
    name: 'Owner-Only 401(k)',
    category: 'Owner-only',
    definition:
      'A 401(k) plan for a business with no employees other than the owner (and spouse), letting the owner defer and profit-share without nondiscrimination testing.',
    whoItFits: 'Fits solo owners and owner-spouse businesses with no other common-law employees.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements: 'Requires Form 5500-EZ or 5500-SF filing once plan assets cross the IRS threshold, and reverts to a standard tested plan if the business hires staff.',
    pairsWith: ['owner-only-401k-defined-benefit', 'cash-balance'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/OODC.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_OODC.pdf',
  },
  {
    slug: 'owner-only-401k-defined-benefit',
    name: 'Owner-Only 401(k) + Defined Benefit',
    category: 'Owner-only',
    definition: 'An owner-only 401(k) paired with an owner-only defined benefit plan to push tax-deferred savings well beyond what the 401(k) alone allows.',
    whoItFits: 'Fits solo owners and owner-spouse businesses, typically later in their career, who want to accelerate savings ahead of retirement.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements: "Requires an enrolled actuary's annual certification and a funding commitment, even though there's no staff to test.",
    pairsWith: ['owner-only-401k', 'cash-balance'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/OOCOMBO.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_OOCOMBO.pdf',
  },
  {
    slug: 'esop-employee-ownership',
    name: 'ESOP / Employee Ownership',
    category: 'Specialty',
    definition: 'An employee stock ownership plan that transfers company shares into a trust for employees, often used as a succession or exit strategy.',
    whoItFits: 'Fits owners planning a succession or partial exit who want to transition ownership to employees rather than an outside buyer.',
    workedExample: '[Add a worked example with real contribution numbers.]',
    requirements: 'Requires an independent company valuation, a trustee, and ongoing annual allocation and repurchase-obligation tracking.',
    pairsWith: ['cash-balance', 'new-comparability'],
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/ESOP.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2020/04/2020_ESOP.pdf',
  },
];

const SERVICES = [
  {
    slug: '3-16-fiduciary-administration',
    name: '3(16) Fiduciary Administration',
    definition: 'Outsourced plan administrator fiduciary services, where LDSCO takes on the ERISA §3(16) administrative fiduciary duties for the plan sponsor.',
    whoItFits: 'Fits sponsors who want day-to-day administrative fiduciary liability handled by a specialist rather than carried internally.',
    included: '[Add the specific administrative tasks covered under this engagement.]',
    requirements: 'Requires a signed 3(16) services agreement defining exactly which administrative duties transfer to LDSCO.',
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/316.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2015/06/316.pdf',
  },
  {
    slug: 'compliance-testing-form-5500',
    name: 'Compliance Testing & Form 5500',
    definition: 'Annual nondiscrimination testing and Form 5500 preparation and filing for qualified retirement plans.',
    whoItFits: 'Fits every ongoing qualified plan sponsor; required annually regardless of plan design.',
    included: '[Add the specific testing package and filing scope covered.]',
    requirements: 'Requires timely census and payroll data each year to meet IRS/DOL filing deadlines.',
    imageUrl: null,
    flyerUrl: null,
  },
  {
    slug: 'plan-documents-restatements',
    name: 'Plan Documents & Restatements',
    definition: 'Drafting, amending, and restating plan documents to stay current with IRS-required restatement cycles and plan design changes.',
    whoItFits: "Fits sponsors starting a new plan, changing plan design, or due for their IRS-mandated restatement cycle.",
    included: '[Add the specific document package covered.]',
    requirements: "Requires restatement within the IRS's published cycle window to keep the plan's qualified status.",
    imageUrl: null,
    flyerUrl: null,
  },
  {
    slug: 'payroll-deferral-submission',
    name: 'Payroll Deferral Submission',
    definition:
      'LDSCO takes charge of submitting your 401(k) plan contributions to your investment company each pay period, with no action required by you or your payroll company.',
    whoItFits: 'Fits sponsors who want to remove the hassle of data entry, file conversion, and file submission from their plan administration.',
    included:
      "Your payroll company stays the same, your plan administration remains with LDSCO, and your 401(k) contributions are seamlessly sent to your plan's investment company each pay period.",
    requirements: 'Contact your plan consultant to get started with this service.',
    imageUrl: 'https://ldsco.com/wp-content/uploads/2016/05/PayrollBW.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2016/05/401kDefPRSub.pdf',
  },
  {
    slug: 'participant-call-center',
    name: 'Participant Call Center',
    definition: 'A dedicated staff serving as the main point of contact for plan participants, so the plan sponsor can focus on running their business.',
    whoItFits: 'Fits sponsors who want participant questions handled by specialists instead of HR staff.',
    included:
      'Representatives answer questions on participation requirements, withdrawal/loan options, tax consequences, contribution limitations, disclosure requirements, calculation of vested benefit, and plan type. Reach the Participant Call Center at 1-855-850-6436 or 401khotline@ldsco.com, or write to 10750 Rockley Rd., Houston, TX 77099.',
    requirements: 'Requires participant contact data to be kept current with the recordkeeper.',
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/CC.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2015/06/CC.pdf',
  },
  {
    slug: 'rpd4u',
    name: 'RPD4U',
    definition: 'Retirement Plan Documents for You (RPD4U) is a participant-level website that communicates retirement plan information directly and automatically to employees.',
    whoItFits:
      'Fits sponsors who want a mobile- and tablet-friendly way for employees to access plan information, such as safe harbor notices and Summary Plan Descriptions (SPDs), at their convenience.',
    included:
      'Includes automatic employee enrollment, email notifications when new information is uploaded, and the ability to document enrollment and monitor successful receipt of those notifications.',
    requirements:
      'Plan sponsors remain responsible for using the most appropriate form of distribution and/or communication to ensure successful delivery of required notices; RPD4U is not guaranteed to be an acceptable form of initial distribution on its own, but may be used to maintain ongoing employee communications.',
    imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/RPD4U.jpg',
    flyerUrl: 'https://ldsco.com/wp-content/uploads/2015/06/RPD4U.pdf',
  },
];

const TEAM_MEMBERS = [
  { name: 'Loren “Dayton” Stark II', role: 'President & CEO', credential: 'Retirement Plan Consultant' },
  { name: 'Margaret Ellison', role: 'Chief Actuary', credential: 'Enrolled Actuary' },
  { name: 'Thomas Reyes', role: 'Senior Actuary', credential: 'Enrolled Actuary' },
  { name: 'Patricia Whitfield', role: 'General Counsel', credential: 'ERISA Attorney' },
  { name: 'James Okafor', role: 'Senior ERISA Counsel', credential: 'ERISA Attorney' },
  { name: 'Sandra Liu', role: 'VP, Plan Design Consulting', credential: 'Retirement Plan Consultant' },
];

const JOB_OPENINGS = [
  {
    slug: 'senior-actuarial-analyst',
    title: 'Senior Actuarial Analyst',
    department: 'Actuarial',
    location: 'Houston, TX',
    employmentType: 'full_time',
    summary: 'Design and certify defined benefit and cash balance plans for owner-heavy businesses, working directly with the enrolled actuaries on staff.',
    responsibilities: [
      'Build and review actuarial valuations for cash balance and combination DC/DB plans',
      'Prepare Schedule SB and other actuarial filings for Form 5500',
      'Model contribution and deduction scenarios for plan design proposals',
      'Review the work of junior analysts and mentor new hires on plan mechanics',
    ],
    qualifications: [
      '3+ years of pension actuarial experience, TPA or consulting background preferred',
      'Progress toward ASA/EA credentials, with coursework substantially complete',
      'Proficiency with actuarial valuation software and Excel-based modeling',
      'Comfortable explaining plan design tradeoffs to non-actuaries',
    ],
  },
  {
    slug: 'junior-actuarial-analyst',
    title: 'Junior Actuarial Analyst',
    department: 'Actuarial',
    location: 'Houston, TX',
    employmentType: 'full_time',
    summary: "Entry-level role supporting valuations, compliance testing, and plan illustrations across the actuarial team's book of business.",
    responsibilities: [
      'Assist with annual valuations and nondiscrimination testing under senior analyst review',
      'Prepare census data and reconcile plan asset statements',
      'Draft plan illustrations for prospective and existing clients',
      'Support Form 5500 preparation during filing season',
    ],
    qualifications: [
      'Bachelor’s degree in actuarial science, math, statistics, or a related field',
      '1-2 actuarial exams passed, or actively studying',
      'Strong Excel skills and attention to detail with numeric data',
      'No prior TPA experience required — training is provided on the job',
    ],
  },
  {
    slug: 'retirement-plan-administrator',
    title: 'Retirement Plan Administrator',
    department: 'Plan Administration',
    location: 'Houston, TX',
    employmentType: 'full_time',
    summary: 'Own day-to-day administration for an assigned book of qualified retirement plans, from annual testing through Form 5500 filing.',
    responsibilities: [
      'Run annual compliance testing (ADP/ACP, top-heavy, coverage) for an assigned plan book',
      'Prepare and file Form 5500 and related schedules',
      'Process contributions, distributions, and loan requests',
      'Serve as the primary point of contact for plan sponsors on administrative questions',
    ],
    qualifications: [
      '2+ years of retirement plan administration experience at a TPA or recordkeeper',
      'Working knowledge of ERISA, IRS, and DOL compliance requirements',
      'QKA or similar ASPPA credential a plus, not required',
      'Comfortable managing a caseload of 75-100 plans independently',
    ],
  },
  {
    slug: 'plan-document-specialist',
    title: 'Plan Document Specialist',
    department: 'Plan Administration',
    location: 'Houston, TX',
    employmentType: 'full_time',
    summary: 'Draft and maintain plan documents, amendments, and restatements alongside the in-house ERISA attorneys.',
    responsibilities: [
      'Draft plan documents, adoption agreements, and amendments for new and existing plans',
      'Track IRS-mandated restatement cycles across the client book',
      'Coordinate with actuarial and administration teams on document-driven plan changes',
      'Maintain document templates as regulations and plan designs evolve',
    ],
    qualifications: [
      '2+ years drafting qualified retirement plan documents',
      'Working knowledge of IRS pre-approved and individually designed plan formats',
      'Meticulous attention to detail; comfortable with dense regulatory text',
      'Paralegal or ERISA compliance background a plus',
    ],
  },
  {
    slug: 'erisa-compliance-specialist',
    title: 'ERISA Compliance Specialist',
    department: 'Compliance',
    location: 'Houston, TX',
    employmentType: 'full_time',
    summary: 'Monitor plan compliance across the client book and help sponsors correct issues before they become costly.',
    responsibilities: [
      'Review plan operations against plan document terms and ERISA requirements',
      'Identify and help resolve operational failures through IRS/DOL correction programs',
      'Track regulatory changes (SECURE 2.0, IRS guidance) and flag client impact',
      'Support internal teams with compliance questions on complex plan designs',
    ],
    qualifications: [
      '3+ years in ERISA compliance, plan administration, or related legal support',
      'Familiarity with EPCRS and DOL voluntary correction programs',
      'Strong written communication for sponsor-facing compliance memos',
      'JD, paralegal certification, or equivalent industry experience welcome',
    ],
  },
  {
    slug: 'client-relationship-manager',
    title: 'Client Relationship Manager',
    department: 'Client Services',
    location: 'Las Vegas, NV',
    employmentType: 'full_time',
    summary: 'Be the ongoing relationship owner for a portfolio of plan sponsors, coordinating across actuarial, administration, and compliance.',
    responsibilities: [
      'Serve as the primary relationship contact for an assigned portfolio of plan sponsors',
      'Coordinate internally to resolve sponsor questions across teams',
      'Lead annual plan review meetings with sponsors and their advisors',
      'Identify plan design opportunities and loop in the design team',
    ],
    qualifications: [
      '3+ years in client-facing retirement plan services or account management',
      'Comfortable explaining plan mechanics to sponsors without an actuarial background',
      'Strong organizational skills managing a multi-plan portfolio',
      'Some travel to client and advisor meetings',
    ],
  },
  {
    slug: 'business-development-consultant',
    title: 'Business Development Consultant',
    department: 'Business Development',
    location: 'New York, NY',
    employmentType: 'full_time',
    summary: 'Build relationships with financial advisors and CPAs to bring new plan design engagements to LDSCO in the North East region.',
    responsibilities: [
      'Develop referral relationships with financial advisors, CPAs, and benefits brokers',
      'Present plan design concepts (cash balance, new comparability, combination plans) to prospective referral partners',
      'Partner with the design team to scope proposals for prospective plan sponsors',
      'Represent LDSCO at regional industry events and conferences',
    ],
    qualifications: [
      '3+ years in retirement plan sales, wholesaling, or advisor-facing business development',
      'Working knowledge of qualified plan design concepts',
      'Existing relationships with financial advisors or CPAs in the North East a plus',
      'Comfortable with a regional travel schedule',
    ],
  },
  {
    slug: 'it-systems-administrator',
    title: 'IT Systems Administrator',
    department: 'Information Technology',
    location: 'Houston, TX',
    employmentType: 'full_time',
    summary: 'Support the internal systems and client-facing platforms (including RPD4U) that keep plan administration running.',
    responsibilities: [
      'Administer internal servers, workstations, and the firm’s document management system',
      'Support and maintain client-facing platforms such as RPD4U',
      'Manage user access, backups, and security patching across the environment',
      'Provide day-to-day IT support for staff across all office locations',
    ],
    qualifications: [
      '3+ years in systems administration, ideally in a financial services or professional services setting',
      'Experience with Windows Server environments and standard business SaaS tools',
      'Understanding of data security practices appropriate for handling sensitive plan data',
      'Clear communicator who can support non-technical staff patiently',
    ],
  },
];

const WHITEPAPERS = [
  { slug: 'DB_PAPER_2020', title: '2020 Defined Benefit Paper', url: 'https://ldsco.com/wp-content/uploads/2020/07/DB_PAPER_2020.pdf' },
  { slug: 'voluntary-correction-program-for-retirement-plans', title: 'Voluntary Correction Program for Retirement Plans', url: 'https://ldsco.com/wp-content/uploads/2015/06/Voluntary_Correction_Program_for_Retirement_Plans.pdf' },
  { slug: 'unrelated-business-taxable-income-ubti', title: 'Unrelated Business Taxable Income (UBTI)', url: 'https://ldsco.com/wp-content/uploads/2015/06/Unrelated_Business_Taxable_Income_UBTI.pdf' },
  { slug: 'understanding-slob', title: 'Understanding SLOB', url: 'https://ldsco.com/wp-content/uploads/2015/06/Understanding_SLOB.pdf' },
  { slug: 'triple-stacked-match-safe-harbor-vs-cross-tested-safe-harbor', title: 'Triple Stacked Match Safe Harbor vs Cross Tested Safe Harbor', url: 'https://ldsco.com/wp-content/uploads/2015/06/Triple_Stacked_Match_Safe_Harbor_vs_Cross_Tested_Safe_Harbor.pdf' },
  { slug: 'the-worker-retiree-and-employer-recovery-act', title: 'The Worker, Retiree and Employer Recovery Act', url: 'https://ldsco.com/wp-content/uploads/2015/06/The_Worker_Retiree_and_Employer_Recover_Act.pdf' },
  { slug: 'surgical-centers-and-the-asg-rules', title: 'Surgical Centers and the ASG Rules', url: 'https://ldsco.com/wp-content/uploads/2015/06/Surgical_Centers_and_the_ASG_Rules.pdf' },
  { slug: 'surgical-centers-and-the-affiliated-service-groups', title: 'Surgical Centers and the Affiliated Service Groups', url: 'https://ldsco.com/wp-content/uploads/2015/06/Surgical-Centers-and-the-Affiliated-Service-Groups.pdf' },
  { slug: 'shared-employees', title: 'Shared Employees', url: 'https://ldsco.com/wp-content/uploads/2015/06/Shared_Employees.pdf' },
  { slug: 'royalties-as-earned-income', title: 'Royalties as Earned Income', url: 'https://ldsco.com/wp-content/uploads/2015/06/Royalties_as_Earned_Income.pdf' },
  { slug: 'relief-from-immediate-compliance', title: 'Relief From Immediate Compliance', url: 'https://ldsco.com/wp-content/uploads/2015/06/Relief_From_Immediate_Compliance.pdf' },
  { slug: 'qualified-plans-iras-and-pts', title: 'Qualified Plans IRAs and PTs', url: 'https://ldsco.com/wp-content/uploads/2015/06/Qualified_Plans_IRAs_and_PTs.pdf' },
  { slug: 'non-qualified-deferred-compensation-for-management-affiliated-service-groups', title: 'Non-qualified Deferred Compensation for Management Affiliated Service Groups', url: 'https://ldsco.com/wp-content/uploads/2015/06/Non-qualified_Deferred_Compensation_for_Management_Affiliated_Service_Groups.pdf' },
  { slug: 'non-elected-church-plans', title: 'Non-Elected Church Plans', url: 'https://ldsco.com/wp-content/uploads/2015/06/Non-Elected_Church_Plans.pdf' },
  { slug: '2015-defined-benefit-paper', title: '2015 Defined Benefit Paper', url: 'https://ldsco.com/wp-content/uploads/2015/07/DB_PAPER_2015.pdf' },
  { slug: 'guidelines-regarding-rollovers-as-business-start-ups-robs', title: 'Guidelines regarding Rollovers as Business Start-ups (ROBS)', url: 'https://ldsco.com/wp-content/uploads/2015/07/robs_guidelines.pdf' },
  { slug: 'eligible-individual-account-plans-guide-eiap-guide', title: 'Eligible Individual Account Plans Guide (EIAP) Guide', url: 'https://ldsco.com/wp-content/uploads/2015/07/Eligible-Individual-Account-Plans-Guide.pdf' },
  { slug: 'eligible-individual-account-plan-eiap', title: 'Eligible Individual Account Plan (EIAP)', url: 'https://ldsco.com/wp-content/uploads/2015/07/Eligible-Individual-Account-Plan.pdf' },
  { slug: '2019-defined-benefit-paper', title: '2019 Defined Benefit Paper', url: 'https://ldsco.com/wp-content/uploads/2019/04/DB_PAPER_2019.pdf' },
  { slug: '2018-defined-benefit-paper', title: '2018 Defined Benefit Paper', url: 'https://ldsco.com/wp-content/uploads/2018/05/DB-PAPER-2018FINAL.pdf' },
  { slug: '2017-defined-benefit-paper', title: '2017 Defined Benefit Paper', url: 'https://ldsco.com/wp-content/uploads/2017/02/DB-PAPER-2017.pdf' },
  { slug: 'pension-protection-act-of-2006', title: 'Pension Protection Act of 2006', url: 'https://ldsco.com/wp-content/uploads/2015/07/PPA2006.pdf' },
  { slug: 'the-valuation-of-qualifying-employer-securities-for-esop', title: 'The Valuation of Qualifying Employer Securities for ESOP', url: 'https://ldsco.com/wp-content/uploads/2015/06/WhitePaper_ESOP.pdf' },
];

const NEWSLETTERS = [
  { slug: 'stark-and-pentec-combine-forces', title: 'Stark and Pentec Combine Forces', url: 'https://ldsco.com/wp-content/uploads/2025/11/STARK-AND-PENTEC-COMBINE-FORCES.pdf' },
  { slug: 'pathway-and-stark-team-up', title: 'Pathway and Stark Team Up', url: 'https://ldsco.com/wp-content/uploads/2021/01/Pathway-and-Stark-Team-Up.pdf' },
  { slug: 'sbc-benefit-consultants-and-stark-combine-forces', title: 'SBC Benefit Consultants and Stark Combine Forces', url: 'https://ldsco.com/wp-content/uploads/2021/01/SBC-BENEFIT-CONSULTANTS-AND-STARK-COMBINE-FORCES.pdf' },
  { slug: 'actuarial-mortality-tables-changes-in-2016-for-defined-benefit-plans', title: 'Actuarial Mortality Tables – changes in 2016 for Defined Benefit Plans', url: 'https://ldsco.com/wp-content/uploads/2015/06/201411_Actuarial-Mortality-Tables-changes-in-2016-for-Defined-Benefit-Plans.pdf' },
  { slug: 'introducing-retirement-plan-documents-for-you-rpd4u', title: 'Introducing Retirement Plan Documents for You (RPD4U)', url: 'https://ldsco.com/wp-content/uploads/2015/06/201402_Introducing-Retirement-Plan-Documents-for-You-RPD4U.pdf' },
  { slug: 'introducing-ldsco-net', title: 'Introducing LDSCO.net', url: 'https://ldsco.com/wp-content/uploads/2016/01/201501_INTRO_LDSCO.NET_.pdf' },
  { slug: 'the-department-of-labor-goes-digital-efast2', title: 'The Department of Labor Goes Digital-EFAST2', url: 'https://ldsco.com/wp-content/uploads/2015/06/201009_The-Department-of-Labor-Goes-Digital-EFAST2.pdf' },
  { slug: 'new-limits-and-cost-of-living-adjustments-cola-for-2009', title: 'New Limits and Cost of Living Adjustments (COLA) for 2009', url: 'https://ldsco.com/wp-content/uploads/2015/06/200901_New-Limits-and-Cost-of-Living-Adjustments-COLA-for-2009.pdf' },
  { slug: 'the-hidden-pension-trap-the-aggregation-rules', title: 'The Hidden Pension Trap – The Aggregation Rules', url: 'https://ldsco.com/wp-content/uploads/2015/06/200812_The-Hidden-Pension-Trap-The-Aggregation-Rules.pdf' },
  { slug: 'egtrra-restatements-the-time-has-come', title: 'EGTRRA Restatements…The time has come', url: 'https://ldsco.com/wp-content/uploads/2015/06/200808_EGTRRA-Restatements...The-time-has-come.pdf' },
  { slug: 'solving-401k-testing-problems-with-new-design-options', title: 'Solving 401k Testing Problems With New Design Options', url: 'https://ldsco.com/wp-content/uploads/2015/06/200806_Solving-401k-Testing-Problems-With-New-Design-Options.pdf' },
  { slug: 'top-heavy-rules-may-impact-plan-design', title: 'Top Heavy Rules May Impact Plan Design', url: 'https://ldsco.com/wp-content/uploads/2015/06/200804_Top-Heavy-Rules-May-Impact-Plan-Design.pdf' },
  { slug: 'my-employer-declared-bankruptcy', title: 'My Employer Declared Bankruptcy', url: 'https://ldsco.com/wp-content/uploads/2015/06/200804_My-Employer-Declared-Bankruptcy.pdf' },
  { slug: 'may-2016', title: 'May 2016', url: 'https://ldsco.com/wp-content/uploads/2016/06/2016MayCC.pdf' },
  { slug: 'irs-announces-pension-plan-limitations-for-2012', title: 'IRS Announces Pension Plan Limitations for 2012', url: 'https://ldsco.com/wp-content/uploads/2015/06/201201_IRS-Announces-Pension-Plan-Limitations-for-2012.pdf' },
  { slug: 'form-5500-filing-deadline', title: 'Form 5500 Filing Deadline', url: 'https://ldsco.com/wp-content/uploads/2015/06/201110_Form-5500-Filing-Deadline.pdf' },
  { slug: 'mandatory-electronic-payment-of-retirement-plan-federal-tax-withholding', title: 'Mandatory Electronic Payment of Retirement Plan Federal Tax Withholding', url: 'https://ldsco.com/wp-content/uploads/2015/06/201101_Mandatory-Electronic-Payment-of-Retirement-Plan-Federal-Tax-Withholding.pdf' },
];

const FORMS = [
  { slug: 'sponsor-form', title: 'Sponsor Form', url: 'https://ldsco.com/wp-content/uploads/2015/06/Sponsor-Form.pdf', format: 'pdf' },
  { slug: 'new-business-census-form-xls', title: 'New Business Census Form (xls)', url: 'https://ldsco.com/wp-content/uploads/2015/06/New-Business-Census-Form.xls', format: 'xls' },
  { slug: 'new-business-census-form', title: 'New Business Census Form', url: 'https://ldsco.com/wp-content/uploads/2015/07/New-Business-Census-Form.pdf', format: 'pdf' },
  { slug: 'investment-policy-statement', title: 'Investment Policy Statement', url: 'https://ldsco.com/wp-content/uploads/2015/06/Investment-Policy-Statement.pdf', format: 'pdf' },
  { slug: 'beneficiary-form', title: 'Beneficiary Form', url: 'https://ldsco.com/wp-content/uploads/2015/06/Beneficiary-Form.pdf', format: 'pdf' },
];

const RECOGNITIONS = [
  {
    name: 'Houston Business Journal Fast 100',
    imageUrl: 'https://ldsco.com/wp-content/uploads/2017/12/HBJ-e1512415120908.jpg',
    href: 'https://www.bizjournals.com/houston/news/2017/07/20/houston-business-journal-reveals-2017-fast-100.html',
  },
  { name: 'Great Place To Work Certified', imageUrl: 'https://ldsco.com/wp-content/uploads/2015/06/gptw-e1550762596771.png', href: 'https://www.greatplacetowork.com/certified-company/1357105' },
  { name: 'American Heart Association Fit-Friendly Worksite, Gold Achievement', imageUrl: 'https://ldsco.com/wp-content/uploads/2016/11/FitFriendlyWorkSiteAward-e1478810859205.png', href: null },
  { name: 'Houston Chronicle Top Workplaces 2016', imageUrl: 'https://ldsco.com/wp-content/uploads/2016/11/top-workplaces-2016-e1478791386118.jpg', href: 'http://www.topworkplaces.com/frontend.php/regional-list/list/chron' },
];

const CURRENT_YEAR = new Date().getFullYear();
const FOUNDED_YEAR = 1910;

const LEGACY_MILESTONES = [
  {
    period: '1st',
    generation: '1st Generation',
    name: 'Leander Jesse Stark',
    image: '/images/1LJS.jpg',
    alt: '1LJS',
    body: 'With our origins beginning in seventeenth century England and our pioneer descendants migrating to America, the foundation of perseverance and integrity of Loren D. Stark’s company was established.\n\nLoren D. Stark’s grandfather Francis Marion Stark moved to Iowa in the late 1800’s and at the turn of the twentieth century circa 1901, Francis’s son Leander Jesse Stark, left Iowa with his wife Mary Evaline Dayton, and young son, Loren Dayton Stark, journeying to Navina in the Oklahoma Indian Territory. There Leander became a banker and in 1910 established L. J. Stark & Son as a life insurance consulting practice specializing in Estate Planning and Employee Benefits. Then in 1917 Leander became the state supervisor of American Life Insurance in Guthrie, Oklahoma. Loren D. Stark, at the time, was attending Northwestern University, but interrupted his studies to serve as a Second Lieutenant in the Artillery when the United States entered the First World War. Loren returned to finish his studies and graduate in 1921 then joined his father who expanded the business to Tulsa.',
  },
  {
    period: '2nd',
    generation: '2nd Generation',
    name: 'Loren D. Stark',
    image: '/images/2LDS.jpg',
    alt: '2LDS',
    body: 'After enduring the Depression for years and its grim trajectory continuing, Loren scanned the geographical horizon for a city that would become a metropolis of opportunity and prosperity. He chose Houston, Texas where in 1938 he brought his family and young son Donald Dayton Stark (Don). Loren continued to operate under the name L. J. Stark & Son until Leander’s death in 1940 when he changed the name to the Loren D. Stark Company.',
  },
  {
    period: '3rd',
    generation: '3rd Generation',
    name: 'Donald Dayton Stark',
    image: '/images/3DDS.jpg',
    alt: '3DDS',
    body: 'Don joined his father in 1957 following his graduation from Wharton Business School and serving as a First Lieutenant in the Navy. As he surveyed the business climate in Houston Don identified the greatest opportunity to be in Employee Benefits and foresaw the demand for increasing specialization. He received a law degree from South Texas College of Law in 1966 and opened a law practice that he operated in conjunction with the Loren D. Stark Company until the early 1990’s. During the recession of the 80’s, Don again envisioned a market demanding more specialization in Employee Benefits, specifically Retirement Plans, and directed all his attention to developing the Loren D. Stark Company into a boutique retirement plan consulting firm.',
  },
  {
    period: '4th',
    generation: '4th Generation',
    name: 'Loren Dayton Stark II',
    image: '/images/5DDSII.jpg',
    alt: '5DDSII',
    body: 'Loren Dayton Stark II (Dayton) joined his father, Don Stark, in 2006 after attending the University of Houston. Having been born into a family of entrepreneurs, the business environment came easily to him and Dayton anticipated the need for international operations in the twenty-first century. He opened the Loren D. Stark Company’s first back office in Vietnam in 2007 and then in 2011 expanded the operation to the Philippines, creating significant leverage that allowed the Loren D. Stark Company to enter into multiple cities and preserve a legacy that will continue for generations.\n\nWith the Stark tradition transcending a century the legacy of endurance and honor will persevere. As the family name Stark suggests when translated from its German origins; “stark” means “strong”.',
  },
  {
    period: 'Today',
    generation: null,
    name: null,
    image: null,
    alt: null,
    body: `${CURRENT_YEAR - FOUNDED_YEAR} years, four generations, and every plan still designed from scratch.`,
  },
];

const PARTNER_FAQS = [
  {
    question: 'Will this stay confidential?',
    answer: "Yes. Every conversation starts under a mutual NDA, and we don't share your firm's details with anyone outside the deal team until terms are agreed.",
  },
  {
    question: 'What happens to my staff?',
    answer: 'We look to retain administrative staff wherever possible — acquiring a team, not just a book of business, is part of what makes a deal a fit.',
  },
  {
    question: 'Will my clients notice a change?',
    answer: 'Sponsors keep their existing point of contact and service schedule through a planned transition; changes are communicated on a timeline, not sprung on day one.',
  },
  {
    question: 'How is a deal valued?',
    answer: "Valuation depends on plan mix, retention, and staff structure. We'll walk through our approach directly once there's mutual interest, rather than posting a formula here.",
  },
  {
    question: "What if it's not the right fit?",
    answer: "Plenty of conversations end without a deal. If it's not a fit, nothing shared in the conversation goes any further.",
  },
];

const PARTNER_CONSIDERATIONS = [
  { title: 'In-house design stays in-house', body: "LDSCO keeps actuarial and ERISA legal work on staff. An acquisition that fits should extend that model, not replace it with outsourced design." },
  { title: 'Continuity for your clients', body: "Plan sponsors keep their existing day-to-day contacts and service schedule through the transition. We don't force a new recordkeeper or a new point of contact on day one — changes happen on a timeline sponsors can see coming." },
  { title: 'A conversation, not a listing', body: "We start with a mutual NDA and a direct conversation with ownership — no broker process, no public listing, no marketing your book to other buyers. If it's not a fit, nothing about the conversation goes further." },
];

const PARTNER_FIT_CRITERIA = [
  { title: 'Book size', body: 'TPA practices administering roughly 50 to 500 qualified plans — big enough to matter, small enough that integration stays personal.' },
  { title: 'Plan design philosophy', body: "Firms that design plans around the sponsor's goals rather than defaulting to a bundled template — the same standard we hold ourselves to." },
  { title: 'Staff continuity', body: 'Owners who want their team to have a future here, not just a payout. We look to retain administrators, not just acquire a client list.' },
  { title: 'Geography', body: 'Priority given to firms in Texas and the broader South and Southwest, though every conversation is considered on its merits.' },
];

const PARTNER_PROCESS_STEPS = [
  { title: 'Confidential introduction', body: 'A direct conversation with ownership, under NDA before any details are shared.' },
  { title: 'High-level book review', body: 'A look at plan count, client mix, and staff structure — no client-identifying information required yet.' },
  { title: 'Mutual fit discussion', body: 'Both sides assess fit: culture, staff future, and what continuity looks like for your clients.' },
  { title: 'Letter of intent', body: "If it's a fit, we put terms in writing before either side commits further time." },
  { title: 'Transition planning', body: 'A joint plan for client communication, staff integration, and systems — built before close, not after it.' },
];

const CAREER_BENEFITS = [
  'Medical, dental, and vision insurance',
  '401(k) with employer match — administered on the same platform we build for clients',
  'Paid time off and paid holidays',
  'Exam fee and study material reimbursement for actuarial and ASPPA credentials',
  'Hybrid and flexible scheduling for most roles',
  'Paid parental leave',
];

const INTERNATIONAL_OFFICES = [
  { country: 'Vietnam', detail: 'Back-office plan administration support, opened 2007.' },
  { country: 'Philippines', detail: 'Back-office plan administration support, opened 2011.' },
];

const CULTURE_PANELS = [
  { title: 'Specialize without leaving', body: 'Actuarial, compliance, documents, and client service are distinct career tracks here — you go deep in one discipline instead of doing a little of everything.' },
  { title: 'Credential support', body: 'Exam fees, study materials, and paid study time are covered for staff working toward ASA, EA, QKA, and other industry credentials.' },
  { title: 'Work that outlasts you', body: `${CURRENT_YEAR - FOUNDED_YEAR} years and four generations in, plans designed here are still built to be handed off cleanly to the next person who administers them.` },
];

const HOME_DOORS = [
  { label: 'Business Owners', description: 'The buying decision — see how a custom-designed plan compares to a bundled one.', href: '/who-we-serve/business-owners/' },
  { label: 'Financial Advisors', description: 'Keep the investment relationship. We handle design and administration.', href: '/who-we-serve/financial-advisors/' },
  { label: 'CPAs', description: 'A plan design conversation that starts with the deduction.', href: '/who-we-serve/cpas/' },
  { label: 'Careers', description: 'Build a career designing plans, not just processing them.', href: '/careers/' },
];

const HOME_WHY_PANELS = [
  { title: 'In-house actuaries', body: "Your plan is designed and certified by actuaries on staff, not a third party the bundled provider doesn't control." },
  { title: 'In-house ERISA counsel', body: 'Plan documents and amendments are drafted by attorneys who work alongside the actuaries designing your plan.' },
  { title: '116 years of continuity', body: 'Four generations of the same firm, still designing every plan from scratch instead of assembling one from a template.' },
];

const HOME_PROOF_STATS = [
  { value: '200', label: 'Plans administered' },
  { value: '120', label: 'Participants served' },
  { value: '20', label: 'States served' },
  { value: '5', label: 'Current certification' },
];

const OFFICES = [
  { region: 'Dallas/Fort Worth', phone: '972.717.3800' },
  { region: 'Las Vegas', phone: '702.620.5175' },
  { region: 'North East', phone: '201.340.2379' },
  { region: 'Central Texas', phone: '832.370.9280' },
  { region: 'California', phone: '415.459.0504' },
  { region: 'New York', phone: '914.506.4610' },
];

const PORTALS = [
  { label: 'I sponsor a plan', description: 'Plan sponsor portal, powered by TPARPA.com.', href: 'https://tparpa.com' },
  { label: "I'm a plan participant", description: 'Participant portal, powered by go-retire.com.', href: 'https://go-retire.com/ldsco' },
];

const SOCIAL_LINKS = [
  { platform: 'facebook', href: 'https://www.facebook.com/LorenDStark/timeline' },
  { platform: 'twitter', href: 'https://twitter.com/ERISA_LDSCO' },
  { platform: 'linkedin', href: 'https://www.linkedin.com/company/loren-d--stark-company-inc-' },
];

const NAV_TREE = [
  {
    label: 'Who We Serve',
    href: '/who-we-serve/business-owners/',
    children: [
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

async function insertMediaAndGetIdMap(queryInterface, urls, now) {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  if (uniqueUrls.length === 0) return new Map();

  const rows = uniqueUrls.map((url) => {
    const fileName = url.split('/').pop() || url;
    const ext = fileName.split('.').pop()?.toLowerCase();
    const fileType = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)
      ? 'image'
      : ext === 'pdf'
        ? 'pdf'
        : ['xls', 'xlsx', 'doc', 'docx'].includes(ext)
          ? 'doc'
          : 'other';
    return {
      file_name: fileName,
      file_path: null,
      url,
      mime_type: null,
      file_type: fileType,
      size_bytes: null,
      alt_text: null,
      uploaded_by: null,
      created_at: now,
      updated_at: now,
    };
  });
  await queryInterface.bulkInsert('media_files', rows);

  const [inserted] = await queryInterface.sequelize.query(
    `SELECT id, url FROM media_files WHERE url IN (${uniqueUrls.map(() => '?').join(',')})`,
    { replacements: uniqueUrls }
  );
  const map = new Map();
  inserted.forEach((row) => map.set(row.url, row.id));
  return map;
}

module.exports = {
  up: async (queryInterface) => {
    const now = new Date();

    // -- Media (image/flyer/file references used by plan designs, services, etc.) --
    const allMediaUrls = [
      ...PLAN_DESIGNS.flatMap((p) => [p.imageUrl, p.flyerUrl]),
      ...SERVICES.flatMap((s) => [s.imageUrl, s.flyerUrl]),
      ...WHITEPAPERS.map((w) => w.url),
      ...NEWSLETTERS.map((n) => n.url),
      ...FORMS.map((f) => f.url),
      ...RECOGNITIONS.map((r) => r.imageUrl),
      ...LEGACY_MILESTONES.map((m) => m.image),
    ];
    const mediaIdByUrl = await insertMediaAndGetIdMap(queryInterface, allMediaUrls, now);

    // -- Plan designs --
    await queryInterface.bulkInsert(
      'plan_designs',
      PLAN_DESIGNS.map((p) => ({
        slug: p.slug,
        name: p.name,
        category: p.category,
        definition: p.definition,
        who_it_fits: p.whoItFits,
        worked_example: p.workedExample,
        requirements: p.requirements,
        image_media_id: mediaIdByUrl.get(p.imageUrl) || null,
        flyer_media_id: mediaIdByUrl.get(p.flyerUrl) || null,
        sort_order: 0,
        is_published: true,
        created_at: now,
        updated_at: now,
      }))
    );

    const [planRows] = await queryInterface.sequelize.query('SELECT id, slug FROM plan_designs');
    const planIdBySlug = new Map(planRows.map((r) => [r.slug, r.id]));

    const relatedRows = [];
    for (const plan of PLAN_DESIGNS) {
      for (const relatedSlug of plan.pairsWith) {
        const planId = planIdBySlug.get(plan.slug);
        const relatedId = planIdBySlug.get(relatedSlug);
        if (planId && relatedId) {
          relatedRows.push({ plan_design_id: planId, related_plan_design_id: relatedId });
        }
      }
    }
    if (relatedRows.length) {
      await queryInterface.bulkInsert('plan_design_related', relatedRows);
    }

    // -- Services --
    await queryInterface.bulkInsert(
      'services',
      SERVICES.map((s) => ({
        slug: s.slug,
        name: s.name,
        definition: s.definition,
        who_it_fits: s.whoItFits,
        included: s.included,
        requirements: s.requirements,
        image_media_id: mediaIdByUrl.get(s.imageUrl) || null,
        flyer_media_id: mediaIdByUrl.get(s.flyerUrl) || null,
        sort_order: 0,
        is_published: true,
        created_at: now,
        updated_at: now,
      }))
    );

    // -- Team members --
    await queryInterface.bulkInsert(
      'team_members',
      TEAM_MEMBERS.map((t, index) => ({
        name: t.name,
        role: t.role,
        credential: t.credential,
        photo_media_id: null,
        bio: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      }))
    );

    // -- Job openings --
    await queryInterface.bulkInsert(
      'job_openings',
      JOB_OPENINGS.map((j, index) => ({
        slug: j.slug,
        title: j.title,
        department: j.department,
        location: j.location,
        employment_type: j.employmentType,
        summary: j.summary,
        responsibilities: JSON.stringify(j.responsibilities),
        qualifications: JSON.stringify(j.qualifications),
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      }))
    );

    // -- Insight resources (whitepapers, newsletters, forms) --
    const insightRows = [
      ...WHITEPAPERS.map((w, index) => ({
        type: 'whitepaper',
        slug: w.slug,
        title: w.title,
        file_media_id: mediaIdByUrl.get(w.url) || null,
        format: 'pdf',
        published_date: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
      ...NEWSLETTERS.map((n, index) => ({
        type: 'newsletter',
        slug: n.slug,
        title: n.title,
        file_media_id: mediaIdByUrl.get(n.url) || null,
        format: 'pdf',
        published_date: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
      ...FORMS.map((f, index) => ({
        type: 'form',
        slug: f.slug,
        title: f.title,
        file_media_id: mediaIdByUrl.get(f.url) || null,
        format: f.format,
        published_date: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
    ];
    await queryInterface.bulkInsert('insight_resources', insightRows);

    // -- Recognitions --
    await queryInterface.bulkInsert(
      'recognitions',
      RECOGNITIONS.map((r, index) => ({
        name: r.name,
        image_media_id: mediaIdByUrl.get(r.imageUrl) || null,
        href: r.href,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      }))
    );

    // -- Legacy milestones --
    await queryInterface.bulkInsert(
      'legacy_milestones',
      LEGACY_MILESTONES.map((m, index) => ({
        period: m.period,
        generation: m.generation,
        name: m.name,
        photo_media_id: mediaIdByUrl.get(m.image) || null,
        alt: m.alt,
        body: m.body,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      }))
    );

    // -- FAQs (partner-with-us) --
    await queryInterface.bulkInsert(
      'faqs',
      PARTNER_FAQS.map((f, index) => ({
        page_key: 'partner-with-us',
        question: f.question,
        answer: f.answer,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      }))
    );

    // -- Career benefits & international offices --
    await queryInterface.bulkInsert(
      'career_benefits',
      CAREER_BENEFITS.map((text, index) => ({
        text,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      }))
    );
    await queryInterface.bulkInsert(
      'international_offices',
      INTERNATIONAL_OFFICES.map((o, index) => ({
        country: o.country,
        detail: o.detail,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      }))
    );

    // -- Content blocks: partner-with-us, careers culture, home page --
    const contentBlockRows = [
      ...PARTNER_CONSIDERATIONS.map((c, index) => ({
        page_key: 'partner-with-us',
        section_key: 'consideration',
        eyebrow: null,
        heading: c.title,
        subheading: null,
        body: c.body,
        image_media_id: null,
        link_label: null,
        link_href: null,
        extra: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
      ...PARTNER_FIT_CRITERIA.map((c, index) => ({
        page_key: 'partner-with-us',
        section_key: 'fit_criteria',
        eyebrow: null,
        heading: c.title,
        subheading: null,
        body: c.body,
        image_media_id: null,
        link_label: null,
        link_href: null,
        extra: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
      ...PARTNER_PROCESS_STEPS.map((c, index) => ({
        page_key: 'partner-with-us',
        section_key: 'process_step',
        eyebrow: null,
        heading: c.title,
        subheading: null,
        body: c.body,
        image_media_id: null,
        link_label: null,
        link_href: null,
        extra: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
      ...CULTURE_PANELS.map((c, index) => ({
        page_key: 'careers-working-at-ldsco',
        section_key: 'culture_panel',
        eyebrow: null,
        heading: c.title,
        subheading: null,
        body: c.body,
        image_media_id: null,
        link_label: null,
        link_href: null,
        extra: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
      {
        page_key: 'home',
        section_key: 'hero_video',
        eyebrow: null,
        heading: 'What happens when your business works as one?',
        subheading: null,
        body: null,
        image_media_id: null,
        // video_media_id is intentionally left null here — an admin sets the
        // actual hero video through the Video picker on this content block,
        // which uploads into the media library rather than a raw JSON path.
        video_media_id: null,
        link_label: 'Learn more',
        link_href: '/about',
        extra: null,
        sort_order: 0,
        is_published: true,
        created_at: now,
        updated_at: now,
      },
      {
        page_key: 'home',
        section_key: 'hero_section',
        eyebrow: null,
        heading: 'Your payroll provider administers your plan. We design it.',
        subheading: null,
        body: `Actuaries and ERISA attorneys in-house since ${FOUNDED_YEAR}. Custom plan design for business owners who want their retirement plan to actually work for them.`,
        image_media_id: null,
        link_label: 'Request a plan design',
        link_href: 'https://tparpa.com/plan-design/create-account',
        extra: JSON.stringify({
          image: '/images/upsidedownplan.png',
          secondaryCta: { label: "I'm an advisor", href: '/who-we-serve/financial-advisors/' },
        }),
        sort_order: 1,
        is_published: true,
        created_at: now,
        updated_at: now,
      },
      {
        page_key: 'home',
        section_key: 'legacy_teaser',
        eyebrow: null,
        heading: null,
        subheading: null,
        body: 'LDSCO was founded in 1910 and has been designing retirement plans for four generations since. The firm still operates the way it started: actuaries and attorneys on staff, designing every plan around the owner it’s built for.',
        image_media_id: null,
        link_label: null,
        link_href: '/about/legacy/',
        extra: null,
        sort_order: 2,
        is_published: true,
        created_at: now,
        updated_at: now,
      },
      ...HOME_DOORS.map((d, index) => ({
        page_key: 'home',
        section_key: 'four_doors_item',
        eyebrow: null,
        heading: d.label,
        subheading: null,
        body: d.description,
        image_media_id: null,
        link_label: null,
        link_href: d.href,
        extra: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
      ...HOME_WHY_PANELS.map((w, index) => ({
        page_key: 'home',
        section_key: 'why_panel',
        eyebrow: null,
        heading: w.title,
        subheading: null,
        body: w.body,
        image_media_id: null,
        link_label: null,
        link_href: null,
        extra: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
      ...HOME_PROOF_STATS.map((s, index) => ({
        page_key: 'home',
        section_key: 'proof_stat',
        eyebrow: null,
        heading: s.value,
        subheading: s.label,
        body: null,
        image_media_id: null,
        link_label: null,
        link_href: null,
        extra: null,
        sort_order: index,
        is_published: true,
        created_at: now,
        updated_at: now,
      })),
      {
        page_key: 'nav',
        section_key: 'primary_cta',
        eyebrow: null,
        heading: null,
        subheading: null,
        body: null,
        image_media_id: null,
        link_label: 'Request a plan design',
        link_href: 'https://tparpa.com/plan-design/create-account',
        extra: null,
        sort_order: 0,
        is_published: true,
        created_at: now,
        updated_at: now,
      },
      {
        page_key: 'nav',
        section_key: 'login_cta',
        eyebrow: null,
        heading: null,
        subheading: null,
        body: null,
        image_media_id: null,
        link_label: 'Login',
        link_href: '/login/',
        extra: null,
        sort_order: 1,
        is_published: true,
        created_at: now,
        updated_at: now,
      },
      {
        page_key: 'nav',
        section_key: 'pay_now_cta',
        eyebrow: null,
        heading: null,
        subheading: null,
        body: null,
        image_media_id: null,
        link_label: 'Pay Now',
        link_href: 'https://abt.rpropayments.com/Login/CheckOutFormLogin/NKRMl-0Pi9FzUMi-Fw6OuKAzbCE-',
        extra: null,
        sort_order: 2,
        is_published: true,
        created_at: now,
        updated_at: now,
      },
    ];
    await queryInterface.bulkInsert('content_blocks', contentBlockRows);

    // -- Site settings --
    await queryInterface.bulkInsert('site_settings', [
      {
        company_name: 'LDSCO',
        legal_name: 'Loren D. Stark Company',
        founded_year: FOUNDED_YEAR,
        email: 'info@ldsco.com',
        phone: '281.498.5777',
        telefax: '281.879.1204',
        description: "Retirement plan design and administration, built around the owner's objectives.",
        headquarters_label: 'Houston HQ',
        headquarters_address: JSON.stringify(['10101 Southwest Freeway', 'Suite 610', 'Houston, TX 77074']),
        headquarters_phone: '281.498.5777',
        headquarters_map_href:
          'https://www.google.com/maps/place/Loren+D.+Stark+Company/@29.66468,-95.567452,17z/data=!3m1!4b1!4m2!3m1!1s0x8640e7fb8c47a55f:0x4156ad46766f3a03',
        created_at: now,
        updated_at: now,
      },
    ]);

    // -- Offices, portals, social links --
    await queryInterface.bulkInsert(
      'offices',
      OFFICES.map((o, index) => ({ region: o.region, phone: o.phone, sort_order: index, created_at: now, updated_at: now }))
    );
    await queryInterface.bulkInsert(
      'portals',
      PORTALS.map((p, index) => ({
        label: p.label,
        description: p.description,
        href: p.href,
        sort_order: index,
        created_at: now,
        updated_at: now,
      }))
    );
    await queryInterface.bulkInsert(
      'social_links',
      SOCIAL_LINKS.map((s, index) => ({ platform: s.platform, href: s.href, sort_order: index, created_at: now, updated_at: now }))
    );

    // -- Nav items (recursive) --
    for (let i = 0; i < NAV_TREE.length; i += 1) {
      const item = NAV_TREE[i];
      await queryInterface.bulkInsert('nav_items', [
        { parent_id: null, label: item.label, href: item.href, sort_order: i, created_at: now, updated_at: now },
      ]);
      if (item.children?.length) {
        const [[{ id: parentId }]] = await queryInterface.sequelize.query(
          'SELECT id FROM nav_items WHERE label = ? AND parent_id IS NULL ORDER BY id DESC LIMIT 1',
          { replacements: [item.label] }
        );
        await queryInterface.bulkInsert(
          'nav_items',
          item.children.map((child, childIndex) => ({
            parent_id: parentId,
            label: child.label,
            href: child.href,
            sort_order: childIndex,
            created_at: now,
            updated_at: now,
          }))
        );
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('nav_items', null, {});
    await queryInterface.bulkDelete('social_links', null, {});
    await queryInterface.bulkDelete('portals', null, {});
    await queryInterface.bulkDelete('offices', null, {});
    await queryInterface.bulkDelete('site_settings', null, {});
    await queryInterface.bulkDelete('content_blocks', null, {});
    await queryInterface.bulkDelete('international_offices', null, {});
    await queryInterface.bulkDelete('career_benefits', null, {});
    await queryInterface.bulkDelete('faqs', null, {});
    await queryInterface.bulkDelete('legacy_milestones', null, {});
    await queryInterface.bulkDelete('recognitions', null, {});
    await queryInterface.bulkDelete('insight_resources', null, {});
    await queryInterface.bulkDelete('job_openings', null, {});
    await queryInterface.bulkDelete('team_members', null, {});
    await queryInterface.bulkDelete('services', null, {});
    await queryInterface.bulkDelete('plan_design_related', null, {});
    await queryInterface.bulkDelete('plan_designs', null, {});
    await queryInterface.bulkDelete('media_files', null, {});
  },
};
