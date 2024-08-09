import LoginButton from '../LoginButton'

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-screen z-[100] flex justify-end p-4">
      <LoginButton />
    </div>
  )
}

export default Header
