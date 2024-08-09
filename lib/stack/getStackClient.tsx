import { StackClient } from '@stackso/js-core'

const getStackClient = () => {
  const stack = new StackClient({
    apiKey: process.env.NEXT_PUBLIC_STACK_KEY as string,
    pointSystemId: parseInt(process.env.NEXT_PUBLIC_POINT_SYSTEM_ID as string, 10),
  })

  return stack
}

export default getStackClient
