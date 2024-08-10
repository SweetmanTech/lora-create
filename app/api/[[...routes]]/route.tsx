/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog'
import { handle } from 'frog/next'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { createSystem } from 'frog/ui'

const { Text, Image, vars } = createSystem()

const app = new Frog({
  basePath: '/api',
  ui: { vars },
  browserLocation: '/',
  title: 'Myco Create',
})

app.frame('/', (c) => {
  return c.res({
    image: (
      <div
        style={{
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: 60,
          backgroundColor: '#f2e8cd',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text color="gray100" size="64">
            Myco Create
          </Text>
          <Text color="gray100" size="12">
            Publish on Base with Zora&apos;s Protocols
          </Text>
          <Text size="32" color="gray100">
            create.myco.wtf
          </Text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderRadius: '100px' }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            borderRadius="128"
            src="https://ipfs.decentralized-content.com/ipfs/QmUryncU4ExZcHSJmfHj1J3uvMZqwuWTwCQ11GYsS9my6o"
            width="128"
            height="128"
            objectFit="contain"
          />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            borderRadius="128"
            src="https://ipfs.decentralized-content.com/ipfs/QmfQPBTHc9RwiaV21jqK1VWMYZYHJ15ZeRzFhSFgmFfMaV"
            width="128"
            height="128"
            objectFit="contain"
          />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            borderRadius="128"
            src="https://ipfs.decentralized-content.com/ipfs/QmUm7zDkuH8jq7mnVVPjgteubXvTQYHQXa7FoivyRLsE8t"
            width="128"
            height="128"
            objectFit="contain"
          />
        </div>
      </div>
    ),
    intents: [
      // eslint-disable-next-line react/jsx-key
      <Button.Link href="https://create.myco.wtf">Create</Button.Link>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
