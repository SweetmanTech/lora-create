import { useZoraCreate } from '@/providers/ZoraCreateProvider'
import { Input } from '../ui/Input'

const Title = () => {
  const { name, setName } = useZoraCreate()

  return <Input value={name} onChange={(e) => setName(e.target.value)} />
}

export default Title
