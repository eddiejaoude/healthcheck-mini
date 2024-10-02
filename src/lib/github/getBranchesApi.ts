import extractOwnerRepo from "./extractOwnerRepo";
import { Branch } from "@/models/github/branch";

export default async function getBranchesApi(repoUrl: string) {
  const { owner, repo } = extractOwnerRepo(repoUrl);
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/branches`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data: Branch[] = await res.json();

  return data;
}
