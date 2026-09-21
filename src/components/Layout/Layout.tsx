import Header from "../Header/Header.tsx";
import {Outlet} from "react-router";

function Layout(){
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout;