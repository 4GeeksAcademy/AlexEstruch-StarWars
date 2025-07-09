import { Outlet } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { StoreProvider } from "../hooks/useGlobalReducer";


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <StoreProvider>
            <ScrollToTop>
                <Navbar />
                <Outlet />
                
                
            </ScrollToTop>
        </StoreProvider>
    )
}