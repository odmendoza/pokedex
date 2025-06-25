// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// const globalForPrisma = global as unknown as { prisma: typeof prisma }

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// export default prisma

import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    const globalForPrisma = global as unknown as { prisma: typeof prisma }
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient()
    }
    prisma = globalForPrisma.prisma
}

export default prisma
