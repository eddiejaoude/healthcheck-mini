export type CheckStatus = "passed" | "failed" | "warning";

export interface StatusCheck {
  name: string;
  status: CheckStatus;
  description: string;
}
