import * as io from '@actions/io'
import * as fs from 'fs'
import * as path from 'path'
import * as process from 'process'
import { fileURLToPath } from 'url'
import * as installer from '../src/installer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tempPath = path.join(__dirname, 'runner', 'temp')
const cachePath = path.join(__dirname, 'runner', 'cache')

process.env['RUNNER_TEMP'] = tempPath
process.env['RUNNER_TOOL_CACHE'] = cachePath

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
    const azCopyPath = await installer.installAzCopy('v10')
    expect(fs.existsSync(azCopyPath)).toBe(true)
  }, 100000)

  it('Unsupported version raise error', async () => {
    let thrown = false
    try {
      await installer.installAzCopy('v7')
    } catch {
      thrown = true
    }
    expect(thrown).toBe(true)
  }, 100000)
})
