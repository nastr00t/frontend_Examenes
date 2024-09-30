import { Outlet } from "react-router-dom"
import HeaderMenuBar from "../public/HeaderMenuBar"

export const PrivateLayout = () => {
    return (
        <>
            <HeaderMenuBar />
            <section >
                <Outlet />
            </section>
        </>
    )
}
