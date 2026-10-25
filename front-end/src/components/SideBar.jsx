import dashboard from "@/assets/logo/dashboard.svg";
import diemdanh from "@/assets/logo/diemdanh.svg";
import baocao from "@/assets/logo/carbon_report.svg";
import user from "@/assets/logo/ph_student-bold.svg";
import review from "@/assets/logo/review.svg";
import { NavLink } from "react-router-dom";
import { FileText, User, Users, CalendarCheck } from "lucide-react";

function Sidebar() {
  return (
    <>
      <div className="bg-white w-[256px] h-[100vh] min-h-screen">
        <ul className="p-3">
          <NavLink to="/admin">
            <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
              <img src={dashboard} alt="" className="mr-2 w-[20px] h-[20px]" />
              Tổng quan
            </li>
          </NavLink>
          <NavLink to="/admin/bangchamcong">
            <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
              <CalendarCheck size={20} className="mr-2"></CalendarCheck> Chấm
              công
            </li>
          </NavLink>
          <NavLink to="/admin/nhanvien">
            <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
              {" "}
              <Users size={20} className="mr-2"></Users>Nhân viên
            </li>
          </NavLink>
          <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
            <img src={baocao} alt="" className="mr-2 w-[20px] h-[20px]" />
            Báo cáo
          </li>
          <NavLink to="/admin/donnghiphep">
            <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
              <FileText size={20} className="mr-2" />
              Đơn nghỉ phép
            </li>
          </NavLink>
          <NavLink to="/admin/thongtincanhan">
            <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
              {" "}
              <User size={20} className="mr-2"></User> Thông tin cá nhân
            </li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
