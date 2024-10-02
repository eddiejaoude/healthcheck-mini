import { Community } from "./github/community";
import { Issue } from "./github/issue";
import { Repo } from "./github/repo";

export default interface Data {
  repo: Repo;
  issues: Issue[];
  community: Community;
}
