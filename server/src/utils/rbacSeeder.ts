import { FastifyInstance } from 'fastify'
import { prisma } from './lib'
import bcrypt from 'bcrypt'

export async function rbacSeeder(server: FastifyInstance) {
  server.log.info('🔄 Seeding roles & permissions...')

  const existingPermissions = await prisma.permission.findFirst()
  if (existingPermissions) {
    server.log.info('✅ Permissions already seeded.')
    return
  }

  const permissions = [
    // User permissions
    {
      name: 'user:read:own',
      description: 'Read own user data',
      resource: 'user',
      action: 'read',
      category: 'self',
    },
    {
      name: 'user:update:own',
      description: 'Update own user data',
      resource: 'user',
      action: 'update',
      category: 'self',
    },
    {
      name: 'user:read:all',
      description: 'Read all users',
      resource: 'user',
      action: 'read',
      category: 'all',
    },
    {
      name: 'user:update:all',
      description: 'Update any user',
      resource: 'user',
      action: 'update',
      category: 'all',
    },
    {
      name: 'user:delete:all',
      description: 'Delete any user',
      resource: 'user',
      action: 'delete',
      category: 'all',
    },

    // Product permissions
    {
      name: 'product:read:all',
      description: 'View products',
      resource: 'product',
      action: 'read',
      category: 'all',
    },
    {
      name: 'product:create',
      description: 'Create product',
      resource: 'product',
      action: 'create',
      category: 'all',
    },
    {
      name: 'product:update',
      description: 'Update product',
      resource: 'product',
      action: 'update',
      category: 'all',
    },
    {
      name: 'product:delete',
      description: 'Delete product',
      resource: 'product',
      action: 'delete',
      category: 'all',
    },

    // Category & Brand
    {
      name: 'category:manage',
      description: 'Manage categories',
      resource: 'category',
      action: 'manage',
      category: 'all',
    },
    {
      name: 'brand:manage',
      description: 'Manage brands',
      resource: 'brand',
      action: 'manage',
      category: 'all',
    },

    // Role & Permission
    {
      name: 'role:read',
      description: 'View roles',
      resource: 'role',
      action: 'read',
      category: 'all',
    },
    {
      name: 'role:create',
      description: 'Create roles',
      resource: 'role',
      action: 'create',
      category: 'all',
    },
    {
      name: 'role:update',
      description: 'Update roles',
      resource: 'role',
      action: 'update',
      category: 'all',
    },
    {
      name: 'role:delete',
      description: 'Delete roles',
      resource: 'role',
      action: 'delete',
      category: 'all',
    },
    {
      name: 'permission:assign',
      description: 'Assign permissions',
      resource: 'permission',
      action: 'assign',
      category: 'all',
    },

    // Orders
    {
      name: 'order:read',
      description: 'View orders',
      resource: 'order',
      action: 'read',
      category: 'all',
    },
    {
      name: 'order:update',
      description: 'Update orders',
      resource: 'order',
      action: 'update',
      category: 'all',
    },

    // Logs
    {
      name: 'logs:view',
      description: 'View system logs',
      resource: 'logs',
      action: 'read',
      category: 'all',
    },
    {
      name: 'logs:search',
      description: 'Search logs',
      resource: 'logs',
      action: 'search',
      category: 'all',
    },

    // System
    {
      name: 'system:admin:all',
      description: 'System admin access',
      resource: 'system',
      action: 'admin',
      category: 'all',
    },
  ]

  // Seed permissions
  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm,
    })
  }

  // Seed roles
  const [adminRole, superAdminRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        description: 'System administrator',
        priority: 3,
        isActive: true,
        metadata: { isAdmin: true },
      },
    }),
    prisma.role.upsert({
      where: { name: 'super_admin' },
      update: {},
      create: {
        name: 'super_admin',
        description: 'Super admin (full access)',
        priority: 4,
        isActive: true,
        metadata: { isSuperAdmin: true },
      },
    }),
  ])

  const allPermissions = await prisma.permission.findMany()

  // Gán tất cả permission cho super_admin và admin
  for (const perm of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: perm.id,
        },
      },
      update: {},
      create: { roleId: superAdminRole.id, permissionId: perm.id },
    })

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: { roleId: adminRole.id, permissionId: perm.id },
      },
      update: {},
      create: { roleId: adminRole.id, permissionId: perm.id },
    })
  }

  // Tạo user super_admin mặc định
  const hashed = await bcrypt.hash('phongphandev123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'super_admin@gmail.com' },
    update: {},
    create: {
      email: 'super_admin@gmail.com',
      password: hashed,
      name: 'Super Admin',
    },
  })

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: superAdminRole.id } },
    update: {},
    create: { userId: user.id, roleId: superAdminRole.id },
  })

  server.log.info('✅ RBAC seed completed.')
}
