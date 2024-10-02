import Data from "@/models/data";
import getRepoApi from "./getRepoApi";
import getIssuesApi from "./getIssuesApi";
import getCommunityApi from "./getCommunityApi";

export default async function getAllApi(repoUrl: string): Promise<Data> {
  const calls = await Promise.all([
    getRepoApi(repoUrl),
    getIssuesApi(repoUrl),
    getCommunityApi(repoUrl),
  ]);

  const data: Data = {
    repo: calls[0],
    issues: calls[1],
    community: calls[2],
  };

  return data;
}
