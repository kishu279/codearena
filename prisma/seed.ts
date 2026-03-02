import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";

const contestsData = JSON.parse(
    readFileSync(join(__dirname, "data/contests.json"), "utf-8")
);
const problemsData = JSON.parse(
    readFileSync(join(__dirname, "data/problems.json"), "utf-8")
);

const prisma = new PrismaClient();

interface RawProblem {
    id: string;
    title: string;
    slug: string;
    description: string;
    difficulty: string;
    tag: string;
    inputFormat?: string | null;
    outputFormat?: string | null;
    constraints?: string | null;
    sampleInput?: string | null;
    sampleOutput?: string | null;
    testCases?: unknown;
    timeLimit: number;
    memoryLimit: number;
    contestId?: string | null;
    order?: number | null;
}

interface RawContest {
    id: string;
    title: string;
    slug: string;
    description?: string;
    startTime: string;
    endTime: string;
    duration: number;
    status: string;
    isPublic: boolean;
    problems?: { id: string; title: string; slug: string; difficulty: string; order: number | null }[];
}

async function main() {
    console.log("🌱 Seeding database...\n");

    // ── 1. Clear existing data (in correct order due to FK constraints) ──
    console.log("🗑️  Clearing existing data...");
    await prisma.submission.deleteMany();
    await prisma.problem.deleteMany();
    await prisma.contest.deleteMany();
    console.log("   ✅ Cleared submissions, problems, contests\n");

    // ── 2. Seed Contests (without problems — problems reference contests via FK) ──
    console.log("🏆 Seeding contests...");
    for (const c of contestsData as RawContest[]) {
        await prisma.contest.create({
            data: {
                id: c.id,
                title: c.title,
                slug: c.slug,
                description: c.description || null,
                startTime: new Date(c.startTime),
                endTime: new Date(c.endTime),
                duration: c.duration,
                status: c.status as "UPCOMING" | "ACTIVE" | "ENDED",
                isPublic: c.isPublic,
                hostedBy: "CODEARENA",
                isRecurring: false,
            },
        });
        console.log(`   ✅ ${c.title}`);
    }
    console.log(`   📊 Total: ${contestsData.length} contests\n`);

    // ── 3. Seed Problems ──
    console.log("📝 Seeding problems...");
    for (const p of problemsData as RawProblem[]) {
        await prisma.problem.create({
            data: {
                id: p.id,
                title: p.title,
                slug: p.slug,
                description: p.description,
                difficulty: p.difficulty as "EASY" | "MEDIUM" | "HARD",
                tag: p.tag as "PRACTICE" | "CONTEST" | "LAB",
                inputFormat: p.inputFormat || null,
                outputFormat: p.outputFormat || null,
                constraints: p.constraints || null,
                sampleInput: p.sampleInput || null,
                sampleOutput: p.sampleOutput || null,
                testCases: p.testCases ? JSON.parse(JSON.stringify(p.testCases)) : undefined,
                timeLimit: p.timeLimit,
                memoryLimit: p.memoryLimit,
                contestId: p.contestId || null,
                order: p.order ?? null,
            },
        });
        console.log(`   ✅ ${p.title} [${p.difficulty}] [${p.tag}]`);
    }
    console.log(`   📊 Total: ${problemsData.length} problems\n`);

    // ── Summary ──
    const contestCount = await prisma.contest.count();
    const problemCount = await prisma.problem.count();
    const practiceCount = await prisma.problem.count({ where: { tag: "PRACTICE" } });
    const contestProbCount = await prisma.problem.count({ where: { tag: "CONTEST" } });
    const labCount = await prisma.problem.count({ where: { tag: "LAB" } });

    console.log("─────────────────────────────────");
    console.log("📊 Seed Summary:");
    console.log(`   Contests:  ${contestCount}`);
    console.log(`   Problems:  ${problemCount}`);
    console.log(`     PRACTICE: ${practiceCount}`);
    console.log(`     CONTEST:  ${contestProbCount}`);
    console.log(`     LAB:      ${labCount}`);
    console.log("─────────────────────────────────");
    console.log("\n✅ Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
