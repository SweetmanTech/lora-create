const KEY_RESTRICTIONS = {
  maxUses: 1,
  keyName: 'Signed Upload JWT',
  permissions: {
    endpoints: {
      data: {
        pinList: false,
        userPinnedDataTotal: false,
      },
      pinning: {
        pinFileToIPFS: true,
        pinJSONToIPFS: true,
        pinJobs: false,
        unpin: false,
        userPinPolicy: false,
      },
    },
  },
}

async function generatePinataJWT() {
  const res = await fetch('https://api.pinata.cloud/users/generateApiKey', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: JSON.stringify(KEY_RESTRICTIONS),
  })
  const data = await res.json()

  if (!res.ok) throw data ?? { message: res.statusText }

  return { JWT: data?.JWT }
}

export default generatePinataJWT
