import { Label } from "@/models/github/label";
import { StatusCheck } from "@/types/checks";

export default function labels(labels: Label[]) {
  const min = 3;
  const max = 12;

  const response: StatusCheck = {
    title: "Labels",
    status: "unknown",
    description: "-",
    extra: "-",
  };

  if (labels.length >= max) {
    response.status = "success";
    response.description = "You have multiple custom labels.";
    response.extra = "No action required.";
  }

  if (labels.length > min && labels.length < max) {
    response.status = "warning";
    response.description = "You might need more custom labels.";
    response.extra =
      "Try creating some more, have a look at other repos for ideas.";
  }

  if (labels.length <= min) {
    response.status = "error";
    response.description = "There are not enough custom labels.";
    response.extra = "This is useful for filtering issues.";
  }

  return response;
}
