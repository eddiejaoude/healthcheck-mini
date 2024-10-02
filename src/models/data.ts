import { Branch } from "./github/branch";
import { Community } from "./github/community";
import { Issue } from "./github/issue";
import { Release } from "./github/release";
import { Repo } from "./github/repo";

export default interface Data {
  repo: Repo;
  issues: Issue[];
  community: Community;
  branches: Branch[];
  release: Release;
}
