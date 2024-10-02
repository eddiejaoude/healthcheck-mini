import Data from "@/models/data";
import extractOwnerRepo from "./extractOwnerRepo";

export default async function getRepoApi(repoUrl: string) {
  const { owner, repo } = extractOwnerRepo(repoUrl);
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    next: { revalidate: 3600 },
  });
  const data: Data = {
    repo: await res.json(),
  };

  return data;
}
