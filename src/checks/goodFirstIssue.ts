import { Issue } from "@/models/github/issue";
import { StatusCheck } from "@/types/checks";

export default function goodFirstIssue(issues: Issue[]) {
  const min = 3;

  const response: StatusCheck = {
    title: "Good First Issue",
    status: "unknown",
    description: "-",
    extra: "-",
  };

  const gfi = issues.filter(
    (issue) =>
      issue.labels.includes("good first issue") ||
      issue.labels.includes("good-first-issue")
  );

  if (gfi.length === 0) {
    response.status = "error";
    response.description = "You have no open and unassigned good first issues";
    response.extra =
      "You will not be appearing in the issue and label search on GitHub";
  }

  if (gfi.length > 0 && gfi.length <= min) {
    response.status = "warning";
    response.description = `You currently only have ${gfi.length} issue that has the label good first issue and is not already assigned`;
    response.extra = "These need to be open and not already assigned";
  }

  if (gfi.length > min) {
    response.status = "success";
    response.description =
      "Great you have open issues with the label good first issue that are ready to be assigned";
    response.extra = "No action required";
  }

  return response;
}
