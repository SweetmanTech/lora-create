'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import useDialog from '@/hooks/useDialog'
import Dialog from './Dialog'
import { useAccount } from 'wagmi'
import { Address } from 'viem'
import { useEffect, useState } from 'react'
import getLoginEvents from '@/lib/stack/getLoginPoints'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import getTooltipText from '@/lib/getTooltipText'

const LandingPage = () => {
  const [containerRef, { height }] = useMeasure() as any
  const {
    close,
    showTooltip,
    closeTooltip,
    isVisibleToolTip,
    isDialogOpen,
    tooltipX,
    tooltipY,
    clickMap,
    tooltipId,
  } = useDialog()

  const { address } = useAccount()
  const [mapperKey, setMapperKey] = useState(0)

  useEffect(() => {
    const init = async () => {
      if (address) {
        const events: Array<any> = await getLoginEvents(address)

        if (!events.length) {
          await trackLoginPoints(address)
        }
        setMapperKey(Math.floor(Math.random() * 1000))
      }
    }

    if (!address) return

    init()
  }, [address])

  return (
    <div
      className="relative w-screen h-screen overflow-hidden
      flex items-center justify-center bg-background"
      ref={containerRef}
      onClick={close}
    >
      <div className="cursor-pointer relative">
        <ImageMapper
          src="/images/home.jpeg"
          map={map}
          responsive
          parentWidth={(height / 914) * 1600}
          onMouseMove={(area, index, e) => showTooltip(area, e)}
          onMouseLeave={closeTooltip}
          onClick={(area) => clickMap(area, address as Address)}
          key={mapperKey}
        />
      </div>
      {isVisibleToolTip && (
        <div
          className="bubble-name"
          style={{
            left: tooltipX,
            top: tooltipY,
          }}
        >
          {getTooltipText(tooltipId)}
        </div>
      )}
      {isDialogOpen && <Dialog />}
    </div>
  )
}

export default LandingPage
