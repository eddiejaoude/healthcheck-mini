import { Issue } from "@/models/github/issue";
import extractOwnerRepo from "./extractOwnerRepo";

export default async function getIssuesApi(repoUrl: string) {
  const { owner, repo } = extractOwnerRepo(repoUrl);
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data: Issue[] = await res.json();

  return data;
}
