import { jest } from '@jest/globals'
import type * as installer from '../src/installer.js'

export const installAzCopy = jest.fn<typeof installer.installAzCopy>()
