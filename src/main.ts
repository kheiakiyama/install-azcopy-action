import * as core from '@actions/core'
import * as installer from './installer'
import * as exec from '@actions/exec'

import {FormatType, SecretParser} from 'actions-secret-parser'

async function run(): Promise<void> {
  let azcopyPath = ''
  try {
    const version = core.getInput('version', {required: true})
    azcopyPath = await installer.installAzCopy(version)
  } catch (error) {
    core.setFailed(error.message)
    return
  }
  const creds = core.getInput('creds', {required: false})
  if (creds === '') {
    core.debug('creds is not difined.')
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
  core.exportVariable('AZCOPY_SPA_CLIENT_SECRET', servicePrincipalKey)
  try {
    await exec.exec(
      `"${azcopyPath}" login --service-principal --application-id ${servicePrincipalId} --tenant-id ${tenantId}`,
      [],
      {}
    )
  } catch (error) {
    core.error('Login failed. Please check the credentials.')
    core.setFailed(error.message)
  }
}

run()
