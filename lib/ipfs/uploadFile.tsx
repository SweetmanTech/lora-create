import { hashFiles } from './hash'
import saveFile from './saveFile'

export type IPFSUploadResponse = {
  cid: string
  uri: string
}

const uploadCache = {
  prefix: 'Pinata/IPFSUploadCache',
  get(files: File[]): IPFSUploadResponse | undefined {
    const digest = hashFiles(files)
    try {
      const cid = localStorage.getItem(`${this.prefix}/${digest}`)
      if (cid) {
        return { cid, uri: `ipfs://${cid}` }
      }
    } catch (error) {
      console.error(error)
    }
  },
  put(files: File[], cid: string) {
    const digest = hashFiles(files)
    try {
      localStorage.setItem(`${this.prefix}/${digest}`, cid)
    } catch (error) {
      console.error(error)
    }
  },
}

export const uploadFile = async (file: File, jwt?: string): Promise<IPFSUploadResponse> => {
  try {
    const data = new FormData()
    data.set('file', file)
    const cached = uploadCache.get([file])
    if (cached) return cached

    let cid: any
    if (jwt) {
      cid = await saveFile(data, jwt)
    } else {
      const res = await fetch('/api/ipfs', { method: 'POST', body: data })
      const json = await res.json()
      cid = json.cid
    }

    uploadCache.put([file], cid)
    return { cid, uri: `ipfs://${cid}` }
  } catch (error) {
    console.error(error)
    return { cid: '', uri: '' }
  }
}
