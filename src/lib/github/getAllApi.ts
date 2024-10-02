import Data from "@/models/data";
import getRepoApi from "./getRepoApi";
import getIssuesApi from "./getIssuesApi";

export default async function getAllApi(repoUrl: string): Promise<Data> {
  const calls = await Promise.all([getRepoApi(repoUrl), getIssuesApi(repoUrl)]);

  const data: Data = {
    repo: calls[0],
    issues: calls[1],
  };

  return data;
}
