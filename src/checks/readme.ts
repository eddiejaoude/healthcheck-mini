import { Community } from "@/models/github/community";
import { StatusCheck } from "@/types/checks";

export default function readme(community: Community) {
  const response: StatusCheck = {
    title: "Readme",
    status: "unknown",
    description: "-",
    extra: "-",
  };

  if (community.files?.readme) {
    response.status = "success";
    response.description = "You have a README file.";
    response.extra = "No action required.";
  }

  if (!community.files || !community.files.readme) {
    response.status = "error";
    response.description = "You do not have a readme.md file in your repo.";
    response.extra = "This is the most important file in your project.";
  }

  return response;
}
