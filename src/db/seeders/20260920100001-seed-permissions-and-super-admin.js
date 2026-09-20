'use strict';

const bcrypt = require('bcrypt');

const RESOURCES = [
  'roles',
  'permissions',
  'users',
  'media',
  'site_settings',
  'offices',
  'portals',
  'social_links',
  'nav_items',
  'plan_designs',
  'services',
  'team_members',
  'job_openings',
  'insight_resources',
  'regulatory_updates',
  'recognitions',
  'legacy_milestones',
  'faqs',
  'career_benefits',
  'international_offices',
  'content_blocks',
  'contact_submissions',
];
const ACTIONS = ['create', 'read', 'update', 'delete'];

module.exports = {
  up: async (queryInterface) => {
    const now = new Date();

    const permissionRows = RESOURCES.flatMap((resource) =>
      ACTIONS.map((action) => ({
        resource,
        action,
        description: `${action} ${resource}`,
        created_at: now,
        updated_at: now,
      }))
    );
    await queryInterface.bulkInsert('permissions', permissionRows);

    await queryInterface.bulkInsert('roles', [
      {
        name: 'Super Admin',
        slug: 'super-admin',
        description: 'Full, unrestricted access to every module.',
        is_super_admin: true,
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Content Editor',
        slug: 'content-editor',
        description: 'Can read and update site content but not manage users, roles, or delete records.',
        is_super_admin: false,
        created_at: now,
        updated_at: now,
      },
    ]);

    const [roles] = await queryInterface.sequelize.query(
      "SELECT id, slug FROM roles WHERE slug IN ('super-admin', 'content-editor')"
    );
    const contentEditorRole = roles.find((r) => r.slug === 'content-editor');

    const [permissions] = await queryInterface.sequelize.query('SELECT id, resource, action FROM permissions');
    const contentResources = RESOURCES.filter(
      (r) => !['users', 'roles', 'permissions'].includes(r)
    );
    const editorPermissionIds = permissions
      .filter(
        (p) => contentResources.includes(p.resource) && (p.action === 'read' || p.action === 'update' || p.action === 'create')
      )
      .map((p) => p.id);

    if (contentEditorRole) {
      await queryInterface.bulkInsert(
        'role_permissions',
        editorPermissionIds.map((permissionId) => ({
          role_id: contentEditorRole.id,
          permission_id: permissionId,
          created_at: now,
          updated_at: now,
        }))
      );
    }

    const superAdminRole = roles.find((r) => r.slug === 'super-admin');
    const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!', 12);
    await queryInterface.bulkInsert('users', [
      {
        name: process.env.SEED_ADMIN_NAME || 'Super Admin',
        email: process.env.SEED_ADMIN_EMAIL || 'admin@example.com',
        password_hash: passwordHash,
        role_id: superAdminRole.id,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
