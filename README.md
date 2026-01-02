# install-azcopy-action

<a href="https://github.com/kheiakiyama/install-azcopy-action/actions"><img alt="install-azcopy-action status" src="https://github.com/kheiakiyama/install-azcopy-action/actions/workflows/test.yml/badge.svg"></a>
<a href="https://img.shields.io/github/v/release/kheiakiyama/install-azcopy-action"><img alt="release" src="https://img.shields.io/github/v/release/kheiakiyama/install-azcopy-action"></a>

# Usage

## Basic
```
steps:
- uses: actions/checkout@v6
- uses: kheiakiyama/install-azcopy-action@v1
  with:
    version: 'v10'
- run: azcopy_v10 --source {SOURCE} --destination {DEST} --dest-key ${{ secrets.STORAGE_KEY }} --recursive --set-content-type
```

## Use with credential
```
steps:
- uses: actions/checkout@v6
- uses: kheiakiyama/install-azcopy-action@v1
  with:
    version: 'v10'
    creds: ${{ secrets.AZURE_CREDENTIALS }}
- run: azcopy_v10 --source {SOURCE} --destination {DEST} --recursive --set-content-type
```

This credentials feature is for sharing same credentials with [azure-login](https://github.com/marketplace/actions/azure-login).  
How to create Azure credentials?  
-> Please check [azure-login page](https://github.com/marketplace/actions/azure-login#configure-azure-credentials).

install-azcopy-action only support authorize with a service principal using a client secret.  
https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-authorize-azure-active-directory#authorize-a-service-principal-by-using-a-client-secret

# Develop

install-azcopy-action is tested below.
- ubuntu-24.04(ubuntu-latest)
- ubuntu-22.04
- ubuntu-slim
- macos-26
- macos-15-intel
- macos-15
- macos-14-large
- macos-14
- windows-2025
- windows-2022

[GitHub - Supported runners](https://docs.github.com/en/free-pro-team@latest/actions/reference/specifications-for-github-hosted-runners#supported-runners-and-hardware-resources)
If you need to add another environment, please post a issue.

See [develop-references.yml](develop-references.yml)
