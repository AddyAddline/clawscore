"use client";

import { useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { SkillRecord, SkillStatus } from "@/lib/types";

function statusClass(status: SkillStatus) {
  if (status === "verified") return "text-emerald-300 border-emerald-500/40 bg-emerald-500/10";
  if (status === "unverified") return "text-yellow-300 border-yellow-500/40 bg-yellow-500/10";
  return "text-red-300 border-red-500/40 bg-red-500/10";
}

export function SkillsExplorer({ skills }: { skills: SkillRecord[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | SkillStatus>("all");

  const filtered = useMemo(
    () =>
      skills.filter((skill) => {
        const searchMatch = skill.name.toLowerCase().includes(search.toLowerCase());
        const statusMatch = status === "all" ? true : skill.status === status;
        return searchMatch && statusMatch;
      }),
    [search, skills, status],
  );

  return (
    <>
      <div className="terminal-panel mb-6 grid gap-3 rounded-2xl border border-zinc-700/60 bg-[#0b0d0c]/75 p-4 md:grid-cols-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by skill name"
          className="rounded-lg border border-zinc-700 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-emerald-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "all" | SkillStatus)}
          className="rounded-lg border border-zinc-700 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-emerald-500"
        >
          <option value="all">All statuses</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
          <option value="malicious">Malicious</option>
        </select>
        <div className="rounded-lg border border-zinc-800 bg-black/30 px-3 py-2 text-sm text-zinc-300">
          Showing {filtered.length} of {skills.length} skills
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((skill) => (
          <article key={skill.name} className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-mono text-lg text-zinc-100">{skill.name}</h2>
              <span className={`rounded-full border px-2 py-1 text-xs uppercase ${statusClass(skill.status)}`}>
                {skill.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{skill.notes}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-zinc-500">Risk</p>
                <p className="font-mono uppercase text-zinc-200">{skill.riskLevel}</p>
              </div>
              <div>
                <p className="text-zinc-500">Reports</p>
                <p className="font-mono text-zinc-200">{skill.reports}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-500">Last checked: {new Date(skill.lastChecked).toLocaleString()}</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200 transition hover:bg-red-500/20">
              <ShieldAlert className="h-4 w-4" />
              Report this skill
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
