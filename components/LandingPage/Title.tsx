import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import { Input } from '../ui/Input'

const Title = () => {
  const { name, setName } = useZoraCreateProvider()

  return <Input value={name} onChange={(e) => setName(e.target.value)} />
}

export default Title
