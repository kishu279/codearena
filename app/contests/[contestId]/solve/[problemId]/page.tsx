import SolveWorkspace from "@/components/solve/SolveWorkspace";

type ContestSolvePageProps = {
    params: Promise<{ contestId: string; problemId: string }>;
};

export default async function ContestSolvePage({ params }: ContestSolvePageProps) {
    const { contestId, problemId } = await params;

    return <SolveWorkspace initialQuestionId={problemId} contestId={contestId} />;
}
