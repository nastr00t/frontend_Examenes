import { Outlet } from "react-router-dom"
import HeaderMenuBar from "./public/HeaderMenuBar"

export const PublicLayout = () => {
    return (
        <>
            <HeaderMenuBar />
            <section >
                <Outlet />
            </section>
        </>
    )
}
