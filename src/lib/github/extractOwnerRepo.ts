export default function extractOwnerRepo(url: string) {
  const urlObject = new URL(url);
  const path = urlObject.pathname.split("/");

  const owner = path[1] || undefined;
  const repo = path[2] || undefined;

  return { owner, repo };
}
