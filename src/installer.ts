import * as tc from '@actions/tool-cache'
import * as core from '@actions/core'
import * as path from 'path'
import * as fs from 'fs'

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
  const extPath = IS_WINDOWS
    ? await tc.extractZip(downloadPath)
    : await tc.extractTar(downloadPath)
  const files = fs.readdirSync(extPath, {withFileTypes: true})
  let toolPath = path.join(extPath, files[0].name) //first file has azcopy
  if (IS_WINDOWS) {
    toolPath = path.join(toolPath, 'azcopy.exe')
    toolPath = await tc.cacheFile(
      toolPath,
      `azcopy-${version}.exe`,
      `azcopy-${version}.exe`,
      version
    )
  } else {
    toolPath = path.join(toolPath, 'azcopy')
    toolPath = await tc.cacheFile(
      toolPath,
      `azcopy-${version}`,
      `azcopy-${version}`,
      version
    )
  }
  core.addPath(path.dirname(toolPath))
  core.debug(toolPath)
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
