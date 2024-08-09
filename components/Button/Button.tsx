'use client'

const Button = ({ onClick, children, className }: any) => (
  <button
    onClick={onClick}
    type="button"
    className={`cursor-pointer bg-black hover:bg-white hover:text-black font-bold leading-normal text-ock-inverse inline-flex min-w-[153px] items-center justify-center rounded-xl p-3 text-xl ${className}`}
  >
    {children}
  </button>
)

export default Button
