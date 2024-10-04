import Data from "@/models/data";
import extractOwnerRepo from "./extractOwnerRepo";
import { Repo } from "@/models/github/repo";
import { Issue } from "@/models/github/issue";
import { Community } from "@/models/github/community";
import { Branch } from "@/models/github/branch";
import { Release } from "@/models/github/release";
import { Label } from "@/models/github/label";
import { apiRequest } from "./apiRequest";

export default async function getAllApi(repoUrl: string): Promise<Data> {
  const { owner, repo } = extractOwnerRepo(repoUrl);

  const calls = await Promise.all([
    apiRequest<Repo>(`https://api.github.com/repos/${owner}/${repo}`),
    apiRequest<Issue[]>(`https://api.github.com/repos/${owner}/${repo}/issues`),
    apiRequest<Community>(
      `https://api.github.com/repos/${owner}/${repo}/community/profile`
    ),
    apiRequest<Branch[]>(
      `https://api.github.com/repos/${owner}/${repo}/branches`
    ),
    apiRequest<Release>(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`
    ),
    apiRequest<Label[]>(`https://api.github.com/repos/${owner}/${repo}/labels`),
  ]);

  const data: Data = {
    repo: calls[0],
    issues: calls[1],
    community: calls[2],
    branches: calls[3],
    release: calls[4],
    labels: calls[5],
  };

  return data;
}
