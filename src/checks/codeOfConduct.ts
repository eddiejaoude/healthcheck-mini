import { Community } from "@/models/github/community";
import { StatusCheck } from "@/types/checks";

export default function codeOfConduct(community: Community) {
  const response: StatusCheck = {
    title: "Code of Conduct",
    status: "unknown",
    description: "-",
    extra: "-",
  };

  if (community.files?.code_of_conduct) {
    response.status = "success";
    response.description = "You have a CoC.";
    response.extra = "No action required.";
  }

  if (!community.files || !community.files.code_of_conduct) {
    response.status = "error";
    response.description = "You do not have a CoC in your repo.";
    response.extra =
      "This is important for people to know your project and community is safe.";
  }

  return response;
}
