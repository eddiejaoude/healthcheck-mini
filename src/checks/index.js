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
import projects from "./projects";
import pullRequestTemplate from "./pullRequestTemplate";
import readme from "./readme";
import release from "./release";
import topics from "./topics";
import url from "./url";

export default function checks(data) {
  const allChecks = [
    description(data.repo),
    // url(data.repo),
    // topics(data.repo),
    // activity(data.repo),
    // issues(data.repo),
    // defaultBranch(data.repo),
    // goodFirstIssue(data.issues),
    // branches(data.branches),
    // release(data.release),
    // readme(data.communityMetrics),
    // license(data.communityMetrics),
    // contributing(data.communityMetrics),
    // pullRequestTemplate(data.communityMetrics),
    // codeOfConduct(data.communityMetrics),
    // labels(data.labels),
    // projects(data.repo, data.projects),
  ];

  const summary = checkSummary(allChecks);

  return { summary, allChecks };
}

export function checkSummary(checks) {
  return Object.groupBy(checks, ({ status }) => status);
}

export function worstCheck(
  check,
  error = "error",
  warning = "warning",
  success = "success"
) {
  if (!check) {
    return "unknow";
  }
  return check.red > 0 ? error : check.amber > 0 ? warning : success;
}
