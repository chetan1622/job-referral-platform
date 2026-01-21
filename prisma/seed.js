const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const jobs = [
        { title: "Frontend Developer", company: "Google", location: "Bangalore", salary: "₹18-25 LPA", type: "Full-time" },
        { title: "Backend Engineer", company: "Microsoft", location: "Hyderabad", salary: "₹20-28 LPA", type: "Full-time" },
        { title: "Product Designer", company: "Cred", location: "Bangalore", salary: "₹15-22 LPA", type: "Full-time" },
        { title: "Data Scientist", company: "Amazon", location: "Bangalore", salary: "₹25-35 LPA", type: "Full-time" },
    ]

    for (const job of jobs) {
        await prisma.job.create({
            data: job,
        })
    }

    console.log('Database seeded!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
