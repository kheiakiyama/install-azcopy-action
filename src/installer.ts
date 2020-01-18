import * as tc from '@actions/tool-cache'
import * as core from '@actions/core'

export async function getAzCopy(version: string): Promise<void> {
  if (version !== 'v10') {
    throw new Error('version must be set `v10`.')
  }
  const downloadUrl: string = getDownloadUrl()
  let downloadPath: string | null = null
  try {
    downloadPath = await tc.downloadTool(downloadUrl)
  } catch (error) {
    core.debug(error)

    throw new Error(`Failed to download version ${version}: ${error}`)
  }
  let extPath: string | null = null
  if (IS_WINDOWS) {
    extPath = await tc.extractZip(downloadPath)
  } else {
    extPath = await tc.extractTar(downloadPath)
  }

  const toolPath = await tc.cacheDir(extPath, 'azcopy', version)
  core.addPath(toolPath)
}

const IS_WINDOWS = process.platform === 'win32'

// https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10
function getDownloadUrl(): string {
  if (IS_WINDOWS) {
    return 'https://aka.ms/downloadazcopy-v10-windows'
  } else {
    return 'https://aka.ms/downloadazcopy-v10-linux'
  }
}
