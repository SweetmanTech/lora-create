import { SUPPORTED_FILES } from './consts'

function isSupportedFileType(mimeType) {
  return SUPPORTED_FILES.some((type) => mimeType.includes(type))
}

export default isSupportedFileType
