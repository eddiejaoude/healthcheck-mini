import { Repo } from "@/models/github/repo";
import { StatusCheck } from "@/types/checks";
import { differenceInDays } from "date-fns";

export default function activity(repo: Repo) {
  const min = 7; // days
  const max = 30; // days
  const now = new Date();
  const last = new Date(repo.pushed_at);
  const diff = differenceInDays(now, last);

  const response: StatusCheck = {
    title: "Activity",
    status: "unknown",
    description: "-",
    extra: "-",
  };

  if (diff <= min) {
    response.status = "success";
    response.description = "Your project is active.";
    response.extra = "No action required.";
  }

  if (diff > min && diff < max) {
    response.status = "warning";
    response.description = "Your project needs more recent activity.";
    response.extra = "Are there any bugs that can be fixed?";
  }

  if (diff >= max) {
    response.status = "error";
    response.description = `There has been no activity for ${diff} days.`;
    response.extra = "Are there any features that can be implemented?";
  }

  return response;
}
