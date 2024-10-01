export type CheckStatus = "success" | "error" | "warning";

export interface StatusCheck {
  title: string;
  status: CheckStatus;
  description: string;
  extra: string;
}
