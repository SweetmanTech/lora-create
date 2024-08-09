import Image from 'next/image'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { useState } from 'react'

const Dialog = () => {
  const [isTypingEnded, setIsTypingEnded] = useState(false)

  return (
    <motion.div
      className="absolute left-[10px] bottom-[20px] z-[10]
      flex items-end"
      animate={{
        scale: 1,
      }}
      initial={{
        scale: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="w-[120px] md:w-[200px] aspect-[320/324] relative z-[10]">
        <Image
          src="/images/mbo-character.webp"
          layout="fill"
          className="absolute object-fit"
          alt=""
        />
      </div>
      <div
        className={`ml-[-10px] relative bg-white z-[9]
            w-[200px] h-[70px] md:w-[270px] md:h-[100px] 
            p-2 md:p-3 border-[4px] border-[black]
            text-[14px] md:text-[18px] font-[700] ${isTypingEnded && 'no_typecursor'}`}
      >
        <Typewriter
          onInit={(tyepwriter) => {
            tyepwriter
              .typeString("We're cooking something! ")
              .pauseFor(70)
              .start()
              .callFunction(() => {
                setIsTypingEnded(true)
              })
          }}
          options={{
            autoStart: true,
            loop: false,
            delay: 70,
          }}
        />
      </div>
    </motion.div>
  )
}

export default Dialog
