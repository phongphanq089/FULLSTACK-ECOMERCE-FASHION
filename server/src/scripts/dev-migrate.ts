import { execSync } from 'child_process'
import fs from 'fs'

function getTimestamp() {
  return new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 14)
}

function hasSchemaChanged(): boolean {
  const schema = fs.readFileSync('prisma/schema.prisma', 'utf-8')
  const hashFile = '.schema.hash'

  const crypto = require('crypto')
  const currentHash = crypto.createHash('sha256').update(schema).digest('hex')

  if (!fs.existsSync(hashFile)) {
    fs.writeFileSync(hashFile, currentHash)
    return true
  }

  const lastHash = fs.readFileSync(hashFile, 'utf-8')
  if (lastHash !== currentHash) {
    fs.writeFileSync(hashFile, currentHash)
    return true
  }

  return false
}

function autoMigrate() {
  if (hasSchemaChanged()) {
    const name = `auto_${getTimestamp()}`
    console.log(`🛠  Schema changed. Running migration: ${name}`)
    execSync(`npx prisma migrate dev --name ${name}`, { stdio: 'inherit' })
    // try {
    //   execSync(`npx prisma migrate dev --name ${name}`, { stdio: 'inherit' })
    // } catch (error) {
    //   if (process.env.NODE_ENV !== 'development') {
    //     console.log('❌ Not in dev mode. Skip reset.')
    //     return
    //   }
    //   console.error('❗ Migration failed. Trying to reset DB...')
    //   execSync(`npx prisma migrate reset --force`, { stdio: 'inherit' })
    // }
  } else {
    console.log('✅ No schema change. Skip migration.')
  }
}

autoMigrate()
