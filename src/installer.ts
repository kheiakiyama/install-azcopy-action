export async function getAzCopy(version: string): Promise<void> {
  if (version !== 'v10') {
    throw new Error('version must be set `v10`.')
  }
}
