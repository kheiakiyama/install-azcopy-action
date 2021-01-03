# install-azcopy-action

<a href="https://github.com/kheiakiyama/install-azcopy-action/actions"><img alt="install-azcopy-action status" src="https://github.com/kheiakiyama/install-azcopy-action/workflows/build-test/badge.svg"></a>

# Usage

## Basic
```
steps:
- uses: actions/checkout@v2
- uses: kheiakiyama/install-azcopy-action@v1
  with:
    version: 'v10'
- run: azcopy_v10 --source {SOURCE} --destination {DEST} --dest-key ${{ secrets.STORAGE_KEY }} --recursive --set-content-type
```

## Use with credential
```
steps:
- uses: actions/checkout@v2
- uses: kheiakiyama/install-azcopy-action@v1
  with:
    version: 'v10'
    creds: ${{ secrets.AZURE_CREDENTIALS }}
- run: azcopy_v10 --source {SOURCE} --destination {DEST} --recursive --set-content-type
```

This credentials feature is for sharing same credentials with [azure-login](https://github.com/marketplace/actions/azure-login).  
How to create Azure credentials?  
-> Please check [azure-login page](https://github.com/marketplace/actions/azure-login#configure-azure-credentials).

# Develop

install-azcopy-action is tested below.
- ubuntu-20.04
- ubuntu-18.04(ubuntu-latest)
- ~~ubuntu-16.04~~
- macos-11.0
- macos-10.15(macos-latest)
- windows-2019(windows-latest)

[GitHub - Supported runners](https://docs.github.com/en/free-pro-team@latest/actions/reference/specifications-for-github-hosted-runners#supported-runners-and-hardware-resources)
If you need to add another environment, please post a issue.

See [develop-references.yml](develop-references.yml)
