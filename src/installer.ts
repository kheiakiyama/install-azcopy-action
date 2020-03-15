import * as tc from '@actions/tool-cache'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as path from 'path'

export async function installAzCopy(version: string): Promise<string> {
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
  let toolPath: string | null = null
  if (IS_WINDOWS) {
    const extPath = await tc.extractZip(downloadPath)
    const cache = await tc.cacheDir(extPath, 'azcopy.exe', version)
    toolPath = path.join(cache, 'azcopy.exe')
  } else {
    const extPath = await tc.extractTar(downloadPath)
    const cache = await tc.cacheDir(extPath, 'azcopy', version)
    toolPath = path.join(cache, 'azcopy')
  }
  core.debug(toolPath)
  try {
    core.debug('alias setting started')
    if (IS_WINDOWS) {
      await exec.exec(`doskey azcopy.exe='${toolPath}'`, [], {})
    } else {
      await exec.exec(`alias azcopy='${toolPath}'`, [], {})
    }
    core.debug('alias setting finished')
  } catch (error) {
    core.error(`set alias failed. toolPath:${toolPath}`)
    await exec.exec(`ls '${toolPath}'`, [], {})
    core.setFailed(error.message)
  }
  return toolPath
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
