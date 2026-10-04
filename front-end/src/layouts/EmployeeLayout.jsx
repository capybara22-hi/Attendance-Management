import Header from "../components/Header";
import SideBarEmployee from "../components/SideBarEmployee";
import { Outlet } from "react-router-dom";

function EmployeeLayout() {
    return (
        <div className="bg-[#F0F4FB] min-h-screen text-gray-900">
            <header className="fixed top-0 left-0 right-0">
                <Header></Header>
            </header>
            
            <div className="flex mt-[60px]">
                <aside className="fixed">
                    <SideBarEmployee></SideBarEmployee>
                </aside>
                <main className="ml-[256px] flex-1 pt-4 px-12 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default EmployeeLayout;