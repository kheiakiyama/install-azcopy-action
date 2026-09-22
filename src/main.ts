import * as core from '@actions/core'
import * as installer from './installer.js'

export async function run(): Promise<void> {
  try {
    const version = core.getInput('version', { required: true })
    await installer.installAzCopy(version)
  } catch (error) {
    if (typeof error === 'string') {
      core.setFailed(error)
    } else if (error instanceof Error) {
      core.setFailed(error.message)
    }
    return
  }

  const creds = core.getInput('creds', { required: false })
  if (creds === '') {
    core.debug('creds is not defined.')
    return
  }

  let credsObj: Record<string, unknown>
  try {
    credsObj = JSON.parse(creds)
  } catch {
    throw new Error('Content is not a valid JSON object')
  }

  const servicePrincipalId = credsObj.clientId
  const servicePrincipalKey = credsObj.clientSecret
  const tenantId = credsObj.tenantId

  if (
    typeof servicePrincipalId !== 'string' ||
    typeof servicePrincipalKey !== 'string' ||
    typeof tenantId !== 'string' ||
    !servicePrincipalId ||
    !servicePrincipalKey ||
    !tenantId
  ) {
    throw new Error(
      'Not all values are present in the creds object. Ensure clientId, clientSecret, tenantId and subscriptionId are supplied.'
    )
  }

  core.setSecret(servicePrincipalKey)
  core.exportVariable('AZCOPY_AUTO_LOGIN_TYPE', 'SPN')
  core.exportVariable('AZCOPY_SPA_APPLICATION_ID', servicePrincipalId)
  core.exportVariable('AZCOPY_SPA_CLIENT_SECRET', servicePrincipalKey)
  core.exportVariable('AZCOPY_TENANT_ID', tenantId)
}
