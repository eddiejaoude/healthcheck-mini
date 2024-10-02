import { Community } from "@/models/github/community";
import { StatusCheck } from "@/types/checks";

export default function license(community: Community) {
  const response: StatusCheck = {
    title: "License",
    status: "unknown",
    description: "-",
    extra: "-",
  };

  if (community.files?.license) {
    response.status = "success";
    response.description = "You have a license.";
    response.extra = "No action required.";
  }

  if (!community.files || !community.files.license) {
    response.status = "error";
    response.description = "You do not have a license in your repo.";
    response.extra = "This does not mean it is moe Open Source but less.";
  }

  return response;
}
