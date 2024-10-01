import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckStatus, StatusCheck } from "@/types/checks";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function Report({
  repoUrl,
  statusChecks,
}: {
  repoUrl: string;
  statusChecks: StatusCheck[];
}) {
  const StatusIcon = ({ status }: { status: CheckStatus }) => {
    switch (status) {
      case "passed":
        return <CheckCircle2 className="text-green-500" />;
      case "failed":
        return <XCircle className="text-red-500" />;
      case "warning":
        return <AlertCircle className="text-yellow-500" />;
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Contributor Readiness Report</CardTitle>
        <CardDescription>Status checks for {repoUrl}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {statusChecks.map((check, index) => (
            <li key={index} className="flex items-start space-x-2">
              <StatusIcon status={check.status} />
              <div>
                <h3 className="font-semibold">{check.name}</h3>
                <p className="text-sm text-gray-600">{check.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
