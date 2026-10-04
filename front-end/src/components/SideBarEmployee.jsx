import dashboard from "@/assets/logo/dashboard.svg";
import diemdanh from "@/assets/logo/diemdanh.svg";
import baocao from "@/assets/logo/carbon_report.svg";
import { NavLink } from "react-router-dom";

function SideBarEmployee() {
  return (
    <>
      <div className="bg-white w-[256px] h-[100px] min-h-screen">
        <ul className="p-3">
          <NavLink to="/employee/chamcong">
            <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
              <img src={diemdanh} alt="" className="mr-2 w-[20px] h-[20px]" />
              Chấm công
            </li>
          </NavLink>
          <NavLink to="/employee/donnghiphep">
            <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
              <img src={baocao} alt="" className="mr-2 w-[20px] h-[20px]" />
              Đơn nghỉ phép
            </li>
          </NavLink>
          <NavLink to="/employee/thongbao">
            <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
              <img src={baocao} alt="" className="mr-2 w-[20px] h-[20px]" />
              Thông báo
            </li>
          </NavLink>
          <NavLink to="/employee/thongtincanhan">
            <li className="flex items-center p-3 hover:bg-[#F6F9FF] hover:text-[#4d4def] text-[#012970] font-semibold rounded-md">
              <img src={baocao} alt="" className="mr-2 w-[20px] h-[20px]" />
              Thông tin cá nhân
            </li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default SideBarEmployee;
