import Data from "@/models/data";
import getRepoApi from "./getRepoApi";
import getIssuesApi from "./getIssuesApi";
import getCommunityApi from "./getCommunityApi";
import getBranchesApi from "./getBranchesApi";
import getReleaseApi from "./getReleaseApi";
import getLabelsApi from "./getLabelsApi";

export default async function getAllApi(repoUrl: string): Promise<Data> {
  const calls = await Promise.all([
    getRepoApi(repoUrl),
    getIssuesApi(repoUrl),
    getCommunityApi(repoUrl),
    getBranchesApi(repoUrl),
    getReleaseApi(repoUrl),
    getLabelsApi(repoUrl),
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
