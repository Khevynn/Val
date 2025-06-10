import { ReactNode } from "react"

interface AuthFormProps {
  title: string,
  subtitle: string,
  children: ReactNode,
  onSubmit: any
}

function AuthForm({children, title, subtitle, onSubmit} : AuthFormProps) {
  return (
    <div className="w-[500px] h-screen lg:h-[700px] rounded-xl bg-dark-200 flex items-center justify-center flex-col shadow-md">
        <img src="logo2.png" className="w-10"/>
        <h1 className="font-bold text-3xl text-white">{title}</h1>
        <h3 className="text-grey-100">{subtitle}</h3>
        <form className="w-[80%] mt-5 space-y-3" onSubmit={onSubmit}>
            {children}
        </form>
    </div>
  )
}

export default AuthForm