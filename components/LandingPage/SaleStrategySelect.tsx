import { Switch } from '@/components/ui/Switch'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import { Label } from '@/components/ui/Label'

const SaleStrategySelect = () => {
  const { isTimedSale, setIsTimedSale } = useZoraCreateProvider()

  return (
    <div className="flex flex-col items-start space-y-2">
      <Label htmlFor="sale-strategy" className="text-xl">
        {isTimedSale ? '✧111 + Uniswap✧' : '✧777✧'}
      </Label>
      <div className="flex items-center space-x-2">
        <Switch
          id="sale-strategy"
          checked={isTimedSale}
          onCheckedChange={setIsTimedSale}
          className="bg-black"
        />
      </div>
    </div>
  )
}

export default SaleStrategySelect
