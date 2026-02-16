import { SkillsExplorer } from "@/components/SkillsExplorer";
import { getSkills } from "@/lib/store";

export default function SkillsPage() {
  const skills = getSkills();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6">
      <h1 className="text-3xl text-zinc-100">OpenClaw Skills Database</h1>
      <p className="mt-2 text-sm text-zinc-400">Search and filter by trust status and risk level.</p>
      <div className="mt-6">
        <SkillsExplorer skills={skills} />
      </div>
    </main>
  );
}
