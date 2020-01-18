import {wait} from '../src/wait'
import io from '@actions/io'
import fs from 'fs'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

const tempPath = path.join(__dirname, 'runner', 'temp')
const cachePath = path.join(__dirname, 'runner', 'cache')

process.env['RUNNER_TEMP'] = tempPath
process.env['RUNNER_TOOL_CACHE'] = cachePath

import * as installer from '../src/installer'

const IS_WINDOWS = process.platform === 'win32'

describe('installer tests', () => {
  beforeAll(async () => {
    await io.rmRF(tempPath)
    await io.rmRF(cachePath)
  }, 100000)

  afterAll(async () => {
    await io.rmRF(tempPath)
    await io.rmRF(cachePath)
  }, 100000)

  it('Getting azcopy is installed', async () => {
    await installer.getAzCopy('v10')
    const targetDir = cachePath

    expect(fs.existsSync(`${targetDir}.complete`)).toBe(true)
    if (IS_WINDOWS) {
      expect(fs.existsSync(path.join(targetDir, 'azcopy.exe'))).toBe(true)
    } else {
      expect(fs.existsSync(path.join(targetDir, 'azcopy'))).toBe(true)
    }
  }, 100000)

  it('Unsupported version raise error', async () => {
    let thrown = false
    try {
      await installer.getAzCopy('v7')
    } catch {
      thrown = true
    }
    expect(thrown).toBe(true)
  }, 100000)
})
