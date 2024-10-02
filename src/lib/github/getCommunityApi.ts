import extractOwnerRepo from "./extractOwnerRepo";
import { Community } from "@/models/github/community";

export default async function getCommunityApi(repoUrl: string) {
  const { owner, repo } = extractOwnerRepo(repoUrl);
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/community/profile`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data: Community = await res.json();

  return data;
}
