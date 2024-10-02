import { Report, StatusCheck } from "@/types/checks";
import activity from "./activity";
import branches from "./branches";
import codeOfConduct from "./codeOfConduct";
import contributing from "./contributing";
import defaultBranch from "./defaultBranch";
import description from "./description";
import goodFirstIssue from "./goodFirstIssue";
import issues from "./issues";
import labels from "./labels";
import license from "./license";
import pullRequestTemplate from "./pullRequestTemplate";
import readme from "./readme";
import release from "./release";
import topics from "./topics";
import url from "./url";
import Data from "@/models/data";

export default function checks(data: Data): Report {
  const allChecks: StatusCheck[] = [
    description(data.repo),
    url(data.repo),
    topics(data.repo),
    activity(data.repo),
    issues(data.repo),
    defaultBranch(data.repo),
    goodFirstIssue(data.issues),
    branches(data.branches),
    release(data.release),
    readme(data.community),
    license(data.community),
    contributing(data.community),
    pullRequestTemplate(data.community),
    codeOfConduct(data.community),
    // labels(data.labels),
  ];

  const summary = checkSummary(allChecks);
  const score = Math.round((summary.success / allChecks.length) * 100);

  return { summary, allChecks, score };
}

export function checkSummary(checks: StatusCheck[]) {
  const groups = Object.groupBy(checks, ({ status }) => status);

  return {
    success: groups.success?.length || 0,
    warning: groups.warning?.length || 0,
    error: groups.error?.length || 0,
  };
}
