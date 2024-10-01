export type CheckStatus = "success" | "error" | "warning" | "unknown";

export interface StatusCheck {
  title: string;
  status: CheckStatus;
  description: string;
  extra: string;
}
