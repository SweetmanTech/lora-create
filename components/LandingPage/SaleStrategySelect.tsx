import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'

const SaleStrategySelect = () => {
  const { saleStrategy, setSaleStrategy } = useZoraCreateProvider()

  const handleChange = (value) => {
    setSaleStrategy(value)
  }

  return (
    <Select defaultValue={saleStrategy} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sale Strategy" />
      </SelectTrigger>
      <SelectContent className="bg-background opacity-100">
        <SelectItem value="ZoraTimedSaleStrategy">✧111 + Uniswap V3 Pool✧</SelectItem>
        <SelectItem value="ZoraFixedPriceSaleStrategy">✧777✧</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SaleStrategySelect
