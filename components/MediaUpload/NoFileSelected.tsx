import UploadIcon from '../Icons/UploadIcon'

const NoFileSelected = ({ onClick }) => (
  <div
    className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-muted-foreground cursor-pointer"
    onClick={onClick}
  >
    <UploadIcon className="w-8 h-8" />
    <p className="text-sm font-medium">click to upload</p>
  </div>
)

export default NoFileSelected
