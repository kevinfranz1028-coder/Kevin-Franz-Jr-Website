import React, {useState} from 'react'
import {Card, Button, Stack, Text} from '@sanity/ui'
import {RocketIcon} from '@sanity/icons'

export default function ManualDeployTool() {
  const [deploying, setDeploying] = useState(false)
  const [result, setResult] = useState(null)

  const handleDeploy = async () => {
    setDeploying(true)
    setResult(null)

    try {
      // Trigger Cloudflare deploy hook
      const webhookUrl = 'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/0cd98915-c72b-4b06-bdc3-afed6ae8f9a6'

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setResult({
          success: true,
          message: 'Deployment started! Website will update in 2-3 minutes.'
        })
      } else {
        setResult({
          success: false,
          message: 'Deployment failed. Check Cloudflare dashboard.'
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error.message}`
      })
    } finally {
      setDeploying(false)
    }
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Text size={2} weight="bold">🚀 Deploy to Website</Text>
        <Text size={1} muted>
          Click the button below to manually deploy your changes to the live website.
          This will rebuild the site with the latest content from Sanity.
        </Text>

        <Button
          text="Deploy Now"
          icon={RocketIcon}
          tone="primary"
          onClick={handleDeploy}
          disabled={deploying}
          loading={deploying}
        />

        {result && (
          <Card padding={3} tone={result.success ? 'positive' : 'critical'}>
            <Text>{result.message}</Text>
          </Card>
        )}

        <Card padding={3} tone="transparent" border>
          <Stack space={2}>
            <Text size={1} weight="semibold">After clicking Deploy:</Text>
            <Text size={1}>1. Wait 2-3 minutes for build to complete</Text>
            <Text size={1}>2. Check: https://kevin-franz-jr-website-2.pages.dev</Text>
            <Text size={1}>3. Hard refresh (Cmd+Shift+R) to see changes</Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}
