import { ReactNode } from "react";
import { AuthContextProvider } from "./_utils/auth-context";
 
const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
 
export default Layout;