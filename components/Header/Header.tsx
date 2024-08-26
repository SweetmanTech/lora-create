'use client'

import LoginButton from '../LoginButton'

const Header = () => {
  return (
    <div className="flex justify-between fixed top-0 left-0 w-screen z-[100] p-4">
      <div className="font-nounish text-4xl">myco.wtf</div>
      <LoginButton />
    </div>
  )
}

export default Header
