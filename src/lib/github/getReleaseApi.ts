import { Release } from "@/models/github/release";
import extractOwnerRepo from "./extractOwnerRepo";

export default async function getReleaseApi(repoUrl: string) {
  const { owner, repo } = extractOwnerRepo(repoUrl);
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data: Release = await res.json();

  return data;
}
