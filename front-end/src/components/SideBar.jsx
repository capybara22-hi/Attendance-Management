import dashboard from "@/assets/logo/dashboard.svg";
import diemdanh from "@/assets/logo/diemdanh.svg";
import baocao from "@/assets/logo/carbon_report.svg";
import user from "@/assets/logo/ph_student-bold.svg";
import review from "@/assets/logo/review.svg";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <div className="bg-white w-[256px] h-[100vh] min-h-screen">
                <ul className="p-3">
                    <NavLink to={"/"}>
                        <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md"><img src={dashboard} alt="" className="mr-2 w-[20px] h-[20px]" />Tổng quan</li>
                    </NavLink>
                    <NavLink to="/bangchamcong">
                        <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md"><img src={diemdanh} alt="" className="mr-2 w-[20px] h-[20px]" />Chấm công</li>
                    </NavLink>
                    <NavLink to="/nhanvien">
                        <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md"><img src={user} alt="" className="mr-2 w-[20px] h-[20px]" />Nhân viên</li>
                    </NavLink>
                    <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md"><img src={baocao} alt="" className="mr-2 w-[20px] h-[20px]" />Báo cáo</li>
                    <NavLink to="/donnghiphep">
                        <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md"><img src={review} alt="" className="mr-2 w-[20px] h-[20px]" />Đơn nghỉ phép</li>
                    </NavLink>
                </ul>
            </div >
        </>
    )
}

export default Sidebar; 