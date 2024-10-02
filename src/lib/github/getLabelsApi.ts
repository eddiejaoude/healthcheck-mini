import extractOwnerRepo from "./extractOwnerRepo";
import { Label } from "@/models/github/label";

export default async function getLabelsApi(repoUrl: string) {
  const { owner, repo } = extractOwnerRepo(repoUrl);
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/labels`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data: Label[] = await res.json();

  return data;
}
