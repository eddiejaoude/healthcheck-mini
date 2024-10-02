import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckStatus, Report as ReportType } from "@/types/checks";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Progress } from "./ui/progress";

const StatusIcon = ({
  status,
  size = 32,
}: {
  status: CheckStatus;
  size?: number;
}) => {
  switch (status) {
    case "success":
      return <CheckCircle2 size={size} color="green" />;
    case "error":
      return <XCircle size={size} color="red" />;
    case "warning":
      return <AlertCircle size={size} color="orange" />;
  }
};

export default function Report({
  repoUrl,
  statusChecks,
}: {
  repoUrl: string;
  statusChecks: ReportType;
}) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Contributor Readiness Report</CardTitle>
        <CardDescription>Status checks for {repoUrl}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-2 border-b-2 pb-4">
          <h3 className="text-lg font-semibold">Result Summary</h3>
          <Progress value={statusChecks.score} className="w-full" />
          <p className="text-sm text-gray-600">
            Overall Score: {statusChecks.score}% ({statusChecks.summary.success}{" "}
            of {statusChecks.allChecks.length} checks passed)
          </p>
          <div className="flex space-x-4 text-sm">
            <span className="text-green-500 flex items-center gap-2">
              <StatusIcon status="success" size={24} />
              {statusChecks.summary.success} Passed
            </span>
            <span className="text-yellow-500 flex items-center gap-2">
              <StatusIcon status="warning" size={24} />
              {statusChecks.summary.warning} Warnings
            </span>
            <span className="text-red-500 flex items-center gap-2">
              <StatusIcon status="error" size={24} />
              {statusChecks.summary.error} Failed
            </span>
          </div>
        </div>
        <ul className="space-y-4">
          {statusChecks.allChecks.map((check, index) => (
            <li key={index} className="flex items-start space-x-2">
              <StatusIcon status={check.status} />
              <div>
                <h3 className="font-semibold">{check.title}</h3>
                <p className="text-sm text-gray-600">{check.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
