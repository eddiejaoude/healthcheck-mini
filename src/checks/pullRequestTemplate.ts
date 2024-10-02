import { Community } from "@/models/github/community";
import { StatusCheck } from "@/types/checks";

export default function pullRequestTemplate(community: Community) {
  const response: StatusCheck = {
    title: "Pull Request template",
    status: "unknown",
    description: "-",
    extra: "-",
  };

  if (community.files?.pull_request_template) {
    response.status = "success";
    response.description = "You have a Pull Request template.";
    response.extra = "No action required.";
  }

  if (!community.files || !community.files.pull_request_template) {
    response.status = "error";
    response.description =
      "You do not have a pull request template in your repo.";
    response.extra = "This helps people create better pull requests.";
  }

  return response;
}
