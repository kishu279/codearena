import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  PrismaClient,
  type ContestStatus,
  type ContestHost,
  type RecurringType,
  type Difficulty,
  type ProblemTag,
  type ProblemVisibility,
  type ResourceType,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const usersData = JSON.parse(
  readFileSync(join(__dirname, "data/users.json"), "utf-8"),
);
const institutesData = JSON.parse(
  readFileSync(join(__dirname, "data/institutes.json"), "utf-8"),
);
const labsData = JSON.parse(
  readFileSync(join(__dirname, "data/labs.json"), "utf-8"),
);
const assignmentsData = JSON.parse(
  readFileSync(join(__dirname, "data/assignments.json"), "utf-8"),
);
const instituteMembersData = JSON.parse(
  readFileSync(join(__dirname, "data/institute-members.json"), "utf-8"),
);
const labMembersData = JSON.parse(
  readFileSync(join(__dirname, "data/lab-members.json"), "utf-8"),
);
const contestsData = JSON.parse(
  readFileSync(join(__dirname, "data/contests.json"), "utf-8"),
);
const problemsData = JSON.parse(
  readFileSync(join(__dirname, "data/problems.json"), "utf-8"),
);
const resourcesData = JSON.parse(
  readFileSync(join(__dirname, "data/resources.json"), "utf-8"),
);

interface RawResource {
  id: string;
  title: string;
  description?: string | null;
  type: string;
  url?: string | null;
  fileUrl?: string | null;
  content?: string | null;
  assignmentId?: string | null;
  labId?: string | null;
  uploadedById: string;
  order?: number | null;
  isPublic?: boolean;
}

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
  assignmentId?: string | null;
  order?: number | null;
  visibility?: string;
  instituteId?: string | null;
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
  hostedBy?: string;
  isRecurring?: boolean;
  recurringType?: string | null;
  parentContestId?: string | null;
  instituteId?: string | null;
  createdById?: string | null;
}

async function main() {
  console.log("🌱 Seeding database...\n");

  // ── 1. Clear existing data (in correct order due to FK constraints) ──
  console.log("🗑️  Clearing existing data...");
  await prisma.resource.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.problem.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.labMember.deleteMany();
  await prisma.lab.deleteMany();
  await prisma.instituteMember.deleteMany();
  await prisma.contest.deleteMany();
  await prisma.institute.deleteMany();
  await prisma.user.deleteMany();
  console.log("   ✅ Cleared all data\n");

  // ── 2. Seed Users ──
  console.log("👤 Seeding users...");
  for (const u of usersData) {
    await prisma.user.create({
      data: {
        id: u.id,
        name: u.name,
        email: u.email,
        image: u.image,
        role: u.role,
      },
    });
    console.log(`   ✅ ${u.name} (${u.email})`);
  }
  console.log(`   📊 Total: ${usersData.length} users\n`);

  // ── 3. Seed Institutes ──
  console.log("🏛️  Seeding institutes...");
  for (const i of institutesData) {
    await prisma.institute.create({
      data: {
        id: i.id,
        name: i.name,
        slug: i.slug,
        description: i.description,
      },
    });
    console.log(`   ✅ ${i.name}`);
  }
  console.log(`   📊 Total: ${institutesData.length} institutes\n`);

  // ── 4. Seed Institute Members ──
  console.log("👥 Seeding institute members...");
  for (const im of instituteMembersData) {
    await prisma.instituteMember.create({
      data: {
        id: im.id,
        userId: im.userId,
        instituteId: im.instituteId,
        role: im.role,
      },
    });
  }
  console.log(
    `   📊 Total: ${instituteMembersData.length} institute members\n`,
  );

  // ── 5. Seed Labs ──
  console.log("🧪 Seeding labs...");
  for (const l of labsData) {
    await prisma.lab.create({
      data: {
        id: l.id,
        title: l.title,
        slug: l.slug,
        description: l.description,
        instituteId: l.instituteId,
        createdById: l.createdById,
      },
    });
    console.log(`   ✅ ${l.title}`);
  }
  console.log(`   📊 Total: ${labsData.length} labs\n`);

  // ── 6. Seed Lab Members ──
  console.log("👥 Seeding lab members...");
  for (const lm of labMembersData) {
    await prisma.labMember.create({
      data: {
        id: lm.id,
        userId: lm.userId,
        labId: lm.labId,
        role: lm.role,
      },
    });
  }
  console.log(`   📊 Total: ${labMembersData.length} lab members\n`);

  // ── 7. Seed Assignments ──
  console.log("📋 Seeding assignments...");
  for (const a of assignmentsData) {
    await prisma.assignment.create({
      data: {
        id: a.id,
        title: a.title,
        description: a.description,
        labId: a.labId,
        startTime: new Date(a.startTime),
        endTime: new Date(a.endTime),
        isRecurring: a.isRecurring,
        recurringType: a.recurringType,
        parentId: a.parentId,
      },
    });
    console.log(`   ✅ ${a.title}`);
  }
  console.log(`   📊 Total: ${assignmentsData.length} assignments\n`);

  // ── 8. Seed Contests ──
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
        status: c.status as ContestStatus,
        isPublic: c.isPublic,
        hostedBy: (c.hostedBy || "CODEARENA") as ContestHost,
        isRecurring: c.isRecurring || false,
        recurringType: (c.recurringType || null) as RecurringType | null,
        parentContestId: c.parentContestId || null,
        instituteId: c.instituteId || null,
        createdById: c.createdById || null,
      },
    });
    console.log(`   ✅ ${c.title}`);
  }
  console.log(`   📊 Total: ${contestsData.length} contests\n`);

  // ── 9. Seed Problems ──
  console.log("📝 Seeding problems...");
  for (const p of problemsData as RawProblem[]) {
    await prisma.problem.create({
      data: {
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        difficulty: p.difficulty as Difficulty,
        tag: p.tag as ProblemTag,
        inputFormat: p.inputFormat || null,
        outputFormat: p.outputFormat || null,
        constraints: p.constraints || null,
        sampleInput: p.sampleInput || null,
        sampleOutput: p.sampleOutput || null,
        testCases: p.testCases
          ? JSON.parse(JSON.stringify(p.testCases))
          : undefined,
        timeLimit: p.timeLimit,
        memoryLimit: p.memoryLimit,
        contestId: p.contestId || null,
        assignmentId: p.assignmentId || null,
        order: p.order ?? null,
        visibility: (p.visibility || "PUBLIC") as ProblemVisibility,
        instituteId: p.instituteId || null,
      },
    });
    console.log(`   ✅ ${p.title} [${p.difficulty}] [${p.tag}]`);
  }
  console.log(`   📊 Total: ${problemsData.length} problems\n`);

  // ── 10. Seed Resources ──
  console.log("📚 Seeding resources...");
  for (const r of resourcesData as RawResource[]) {
    await prisma.resource.create({
      data: {
        id: r.id,
        title: r.title,
        description: r.description || null,
        type: r.type as ResourceType,
        url: r.url || null,
        fileUrl: r.fileUrl || null,
        content: r.content || null,
        assignmentId: r.assignmentId || null,
        labId: r.labId || null,
        uploadedById: r.uploadedById,
        order: r.order ?? null,
        isPublic: r.isPublic ?? false,
      },
    });
    console.log(`   ✅ ${r.title} [${r.type}]`);
  }
  console.log(`   📊 Total: ${resourcesData.length} resources\n`);

  // ── Summary ──
  const userCount = await prisma.user.count();
  const instituteCount = await prisma.institute.count();
  const labCount = await prisma.lab.count();
  const assignmentCount = await prisma.assignment.count();
  const contestCount = await prisma.contest.count();
  const problemCount = await prisma.problem.count();
  const practiceCount = await prisma.problem.count({
    where: { tag: "PRACTICE" },
  });
  const contestProbCount = await prisma.problem.count({
    where: { tag: "CONTEST" },
  });
  const labProbCount = await prisma.problem.count({ where: { tag: "LAB" } });
  const resourceCount = await prisma.resource.count();

  console.log("─────────────────────────────────");
  console.log("📊 Seed Summary:");
  console.log(`   Users:        ${userCount}`);
  console.log(`   Institutes:   ${instituteCount}`);
  console.log(`   Labs:         ${labCount}`);
  console.log(`   Assignments:  ${assignmentCount}`);
  console.log(`   Contests:     ${contestCount}`);
  console.log(`   Problems:     ${problemCount}`);
  console.log(`     PRACTICE:   ${practiceCount}`);
  console.log(`     CONTEST:    ${contestProbCount}`);
  console.log(`     LAB:        ${labProbCount}`);
  console.log(`   Resources:    ${resourceCount}`);
  console.log("─────────────────────────────────");
  console.log("\n✅ Seeding complete!");
}

main()
  .catch((e: Error) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
