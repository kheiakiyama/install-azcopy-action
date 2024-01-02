import * as core from '@actions/core'
import * as installer from './installer'

import {FormatType, SecretParser} from 'actions-secret-parser'

async function run(): Promise<void> {
  try {
    const version = core.getInput('version', {required: true})
    await installer.installAzCopy(version)
  } catch (error) {
    if (typeof error === 'string') {
      core.setFailed(error)
    } else if (error instanceof Error) {
      core.setFailed(error.message)
    }
    return
  }
  const creds = core.getInput('creds', {required: false})
  if (creds === '') {
    core.debug('creds is not defined.')
    return
  }
  const secrets = new SecretParser(creds, FormatType.JSON)
  const servicePrincipalId = secrets.getSecret('$.clientId', false)
  const servicePrincipalKey = secrets.getSecret('$.clientSecret', true)
  const tenantId = secrets.getSecret('$.tenantId', false)
  if (!servicePrincipalId || !servicePrincipalKey || !tenantId) {
    throw new Error(
      'Not all values are present in the creds object. Ensure clientId, clientSecret, tenantId and subscriptionId are supplied.'
    )
  }
  core.exportVariable('AZCOPY_AUTO_LOGIN_TYPE', 'SPN')
  core.exportVariable('AZCOPY_SPA_APPLICATION_ID', servicePrincipalId)
  core.exportVariable('AZCOPY_SPA_CLIENT_SECRET', servicePrincipalKey)
  core.exportVariable('AZCOPY_TENANT_ID', tenantId)
}

run()
