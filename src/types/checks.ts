export type CheckStatus = "success" | "error" | "warning" | "unknown";

export interface StatusCheck {
  title: string;
  status: CheckStatus;
  description: string;
  extra: string;
}

export interface Report {
  allChecks: StatusCheck[];
  score: number;
  summary: {
    success: number;
    warning: number;
    error: number;
  };
}
