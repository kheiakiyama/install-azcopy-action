import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import * as installer from '../__fixtures__/installer.js'

jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('../src/installer.js', () => installer)

const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    installer.installAzCopy.mockResolvedValue('dummy-path')
  })

  it('runs successfully without creds', async () => {
    core.getInput.mockImplementation((name) => {
      if (name === 'version') return 'v10'
      if (name === 'creds') return ''
      return ''
    })

    await run()

    expect(installer.installAzCopy).toHaveBeenCalledWith('v10')
    expect(core.setFailed).not.toHaveBeenCalled()
    expect(core.exportVariable).not.toHaveBeenCalled()
  })

  it('sets failed when installer throws', async () => {
    installer.installAzCopy.mockRejectedValue(new Error('Download failed'))
    core.getInput.mockImplementation((name) => {
      if (name === 'version') return 'v10'
      return ''
    })

    await run()

    expect(core.setFailed).toHaveBeenCalledWith('Download failed')
    expect(core.exportVariable).not.toHaveBeenCalled()
  })

  it('exports variables when valid creds are provided', async () => {
    const credsObj = {
      clientId: 'dummy-client-id',
      clientSecret: 'dummy-client-secret',
      tenantId: 'dummy-tenant-id',
      subscriptionId: 'dummy-sub-id'
    }

    core.getInput.mockImplementation((name) => {
      if (name === 'version') return 'v10'
      if (name === 'creds') return JSON.stringify(credsObj)
      return ''
    })

    await run()

    expect(core.exportVariable).toHaveBeenCalledWith(
      'AZCOPY_AUTO_LOGIN_TYPE',
      'SPN'
    )
    expect(core.exportVariable).toHaveBeenCalledWith(
      'AZCOPY_SPA_APPLICATION_ID',
      'dummy-client-id'
    )
    expect(core.exportVariable).toHaveBeenCalledWith(
      'AZCOPY_SPA_CLIENT_SECRET',
      'dummy-client-secret'
    )
    expect(core.exportVariable).toHaveBeenCalledWith(
      'AZCOPY_TENANT_ID',
      'dummy-tenant-id'
    )
  })

  it('throws error when creds is missing required fields', async () => {
    const invalidCreds = {
      clientId: 'dummy-client-id'
    }

    core.getInput.mockImplementation((name) => {
      if (name === 'version') return 'v10'
      if (name === 'creds') return JSON.stringify(invalidCreds)
      return ''
    })

    await expect(run()).rejects.toThrow(
      'Not all values are present in the creds object.'
    )
  })
})
