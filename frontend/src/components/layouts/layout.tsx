import Pageheader from "../homepage/pageheader"

interface Props {
    children: React.ReactNode;
  }

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Pageheader/>
        <div className="flex-1 pt-[232px]">
            {children}
        </div>
    </div>
  )
}

export default Layout