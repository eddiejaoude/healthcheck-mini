'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

type CheckStatus = 'passed' | 'failed' | 'warning'

interface StatusCheck {
  name: string
  status: CheckStatus
  description: string
}

export function RepoChecker() {
  const [repoUrl, setRepoUrl] = useState('')
  const [statusChecks, setStatusChecks] = useState<StatusCheck[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would fetch this data from an API
    // Here we're simulating the checks with dummy data
    setStatusChecks([
      { name: 'README', status: 'passed', description: 'README.md file is present and detailed.' },
      { name: 'Contributing Guidelines', status: 'warning', description: 'CONTRIBUTING.md is present but could use more detail.' },
      { name: 'License', status: 'passed', description: 'LICENSE file is present.' },
      { name: 'Code of Conduct', status: 'failed', description: 'CODE_OF_CONDUCT.md is missing.' },
      { name: 'Issue Templates', status: 'passed', description: 'Issue templates are set up.' },
      { name: 'Pull Request Template', status: 'warning', description: 'PR template could be more comprehensive.' },
    ])
  }

  const StatusIcon = ({ status }: { status: CheckStatus }) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="text-green-500" />
      case 'failed':
        return <XCircle className="text-red-500" />
      case 'warning':
        return <AlertCircle className="text-yellow-500" />
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>GitHub Repository Contributor Readiness Check</CardTitle>
          <CardDescription>Enter a GitHub repository URL to check its readiness for contributors</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="https://github.com/username/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                required
              />
              <Button type="submit">Check</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {statusChecks.length > 0 && (
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
      )}
    </div>
  )
}