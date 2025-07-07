import zodToJsonSchema from 'zod-to-json-schema'

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// helpers/fixZodSchemaForFastify.ts
type AnyObject = Record<string, any>

/**
 * Fixes:
 * - exclusiveMinimum: true → exclusiveMinimum: 0
 * - required must be array (add required: [] if missing)
 */
export function fixZodSchemaForFastify(schema: AnyObject): AnyObject {
  if (typeof schema !== 'object' || schema === null) return schema

  const clone = { ...schema }

  for (const key in clone) {
    if (typeof clone[key] === 'object') {
      clone[key] = fixZodSchemaForFastify(clone[key])
    }

    // ✅ Fix chính xác chỗ gây lỗi:
    if (key === 'exclusiveMinimum' && clone[key] === true) {
      console.warn('🟡 Fixing invalid exclusiveMinimum:true → 0')
      clone[key] = 0 // hoặc 1 tuỳ vào logic
    }
  }
  // ✅ Bắt buộc: required phải là array
  if (clone.type === 'object' && !Array.isArray(clone.required)) {
    clone.required = []
  }

  return clone
}

export function toJsonSchema(zodSchema: any) {
  return fixZodSchemaForFastify(
    zodToJsonSchema(zodSchema, {
      target: 'openApi3',
      $refStrategy: 'none',
    })
  )
}
