"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Report from "./report";
import { StatusCheck } from "@/types/checks";
import extractOwnerRepo from "@/lib/extractOwnerRepo";
import checks from "@/checks/index";

export function RepoChecker() {
  const [repoUrl, setRepoUrl] = useState("");
  const [statusChecks, setStatusChecks] = useState<StatusCheck[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // get repo data from github
    const data = { repo: {} };
    const { owner, repo } = extractOwnerRepo(repoUrl);
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      next: { revalidate: 3600 },
    });
    data.repo = await res.json();

    // run checks
    const reportData = checks(data);
    console.log(reportData);

    // In a real application, you would fetch this data from an API
    // Here we're simulating the checks with dummy data
    setStatusChecks(reportData.allChecks);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>GitHub Repository Contributor Readiness Check</CardTitle>
          <CardDescription>
            Enter a GitHub repository URL to check its readiness for
            contributors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="https://github.com/username/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                required
              />
              <Button type="submit">Check</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {statusChecks.length > 0 && (
        <Report repoUrl={repoUrl} statusChecks={statusChecks} />
      )}
    </div>
  );
}
