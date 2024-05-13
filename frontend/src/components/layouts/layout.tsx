import Footer from "../homepage/footer";
import Pageheader from "../homepage/pageheader";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Pageheader />
      <div className="flex-1 mt-[184px]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
