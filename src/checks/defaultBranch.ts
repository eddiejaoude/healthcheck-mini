import { Repo } from "@/models/github/repo";
import { StatusCheck } from "@/types/checks";

export default function defaultBranch(repo: Repo) {
  const defaultBranchName = "main";

  const response: StatusCheck = {
    title: "Default Branch",
    status: "unknown",
    description: "-",
    extra: "-",
  };

  if (repo.default_branch === defaultBranchName) {
    response.status = "success";
    response.description = "You are using the recommend default branch name.";
    response.extra = "No action required.";
  }

  if (repo.default_branch !== defaultBranchName) {
    response.status = "warning";
    response.description =
      "You are not using the recommended default branch name.";
    response.extra = "This may confuse contributors on your project.";
  }

  return response;
}
