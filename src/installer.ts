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
  const toolSrcPath = path.join(extPath, files[0].name) //first file has azcopy
  let azCopyFileName: string | null = null
  let toolPath: string | null = null
  if (IS_WINDOWS) {
    toolPath = await tc.cacheFile(
      path.join(toolSrcPath, 'azcopy.exe'),
      `azcopy_${version}.exe`,
      `azcopy_${version}.exe`,
      version
    )
    azCopyFileName = path.join(toolPath, `azcopy_${version}.exe`)
  } else {
    azCopyFileName = toolPath = await tc.cacheFile(
      path.join(toolSrcPath, 'azcopy'),
      `azcopy_${version}`,
      `azcopy_${version}`,
      version
    )
    azCopyFileName = path.join(toolPath, `azcopy_${version}`)
  }
  core.addPath(toolPath)
  core.debug(azCopyFileName)
  return azCopyFileName
}

const IS_WINDOWS = process.platform === 'win32'
const IS_MAC = process.platform === 'darwin'

// https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10
function getDownloadUrl(): string {
  if (IS_WINDOWS) {
    return 'https://aka.ms/downloadazcopy-v10-windows'
  } else if (IS_MAC) {
    return 'https://aka.ms/downloadazcopy-v10-mac'
  } else {
    return 'https://aka.ms/downloadazcopy-v10-linux'
  }
}
