const saveFile = async (data: any, jwt?: string) => {
  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt ?? process.env.PINATA_JWT}`,
    },
    body: data,
  })
  const { IpfsHash } = await response.json()
  return IpfsHash
}

export default saveFile
