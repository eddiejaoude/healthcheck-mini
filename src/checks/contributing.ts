import { Community } from "@/models/github/community";
import { StatusCheck } from "@/types/checks";

export default function contributing(community: Community) {
  const response: StatusCheck = {
    title: "Contributing",
    status: "unknown",
    description: "-",
    extra: "-",
  };

  if (community.files?.contributing) {
    response.status = "success";
    response.description = "You have a contributing guide.";
    response.extra = "No action required.";
  }

  if (!community.files || !community.files.contributing) {
    response.status = "error";
    response.description = "You do not have a contributing guide in your repo.";
    response.extra =
      "This is important, so people know how to get started with your project.";
  }

  return response;
}
