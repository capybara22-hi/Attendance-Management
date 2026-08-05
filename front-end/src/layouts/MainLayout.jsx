import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="bg-[#F0F4FB] min-h-screen text-gray-900">
            <header className="fixed top-0 left-0 right-0">
                <Header></Header>
            </header>
            <div className="flex mt-[60px]">
                <aside className="fixed">
                    <Sidebar></Sidebar>
                </aside>
                <main className="ml-[256px] flex-1 pt-4 pl-12 pr-12 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout;