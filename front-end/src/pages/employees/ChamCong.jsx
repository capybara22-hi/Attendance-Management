import { useEffect, useState } from "react";

const mockData = [
  {
    stt: 1,
    maNhanVien: "NV001",
    ngay: "18/09/2026",
    gioVao: "08:02",
    gioRa: "17:05",
  },
  {
    stt: 2,
    maNhanVien: "NV001",
    ngay: "19/09/2026",
    gioVao: "07:58",
    gioRa: "17:01",
  },
  {
    stt: 3,
    maNhanVien: "NV001",
    ngay: "20/09/2026",
    gioVao: "08:10",
    gioRa: "17:15",
  },
  {
    stt: 4,
    maNhanVien: "NV001",
    ngay: "21/09/2026",
    gioVao: "08:00",
    gioRa: "17:03",
  },
  {
    stt: 5,
    maNhanVien: "NV001",
    ngay: "22/09/2026",
    gioVao: "07:55",
    gioRa: "17:00",
  },
];

function ChamCong() {
  const [attendance, setAttendance] = useState([]);
  const [workingDays, setWorkingDays] = useState(0);
  const [leaveDays, setLeaveDays] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [moy, setMoy] = useState(true);

  const account = JSON.parse(
    localStorage.getItem("auth_user") || sessionStorage.getItem("auth_user"),
  );

  const date = new Date();

  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  console.log(month);

  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/chamcong/${account.employeeNo}?start_date=${startDate}&end_date=${endDate}`,
      );

      const data = await response.json();

      setAttendance(data.kq);
      setWorkingDays(data.count_attendance);
      setLeaveDays(data.leaveDay);
    };

    const timer = setTimeout(fetchAttendance, 1000);

    return () => clearTimeout(timer);
  }, [startDate, endDate]);

  // console.log(attendance);
  console.log(startDate);

  return (
    <>
      <div className="flex justify-between">
        <p className="text-[#4154F1] text-2xl font-semibold mb-4">
          Bảng chấm công
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-white justify-between mb-4">
        {/* <div className="col-span-2 flex justify-between">
          <div>
            <p className="text-2xl font-semibold">{moy ? `Tháng ${month}` : `Năm ${year}`}</p>
          </div>
          <div className="">
            <span className={`${moy ? "bg-white border shadow-md" : ""} rounded-2xl px-3 py-1 cursor-pointer`} onClick={() => setMoy(true)}>Tháng</span>
            <span className={`${moy ? "" : "bg-white border shadow-md"} rounded-2xl px-3 py-1 cursor-pointer`} onClick={() => setMoy(false)}>Năm</span>
          </div>
        </div> */}
        <div className="flex items-center justify-center bg-white text-center shadow-md border border-gray-100  h-[100px] rounded-md">
          <div>
            <h2 className="text-xl mb-2 font-semibold">Số ngày làm việc</h2>
            <p className="text-2xl">{workingDays}</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white text-center shadow-md border border-gray-100  h-[100px] rounded-md">
          <div>
            <h2 className="text-xl mb-2 font-semibold">Số ngày nghỉ phép</h2>
            <p className="text-2xl">{leaveDays}</p>
          </div>
        </div>
        {/* <div className="flex items-center justify-center bg-white text-center shadow-md border border-gray-100  h-[100px] rounded-md">
          <div>
            <h2 className="text-xl mb-2 font-semibold">Đúng giờ</h2>
            <p className="text-2xl">16</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white text-center shadow-md border border-gray-100  h-[100px] rounded-md">
          <div>
            <h2 className="text-xl mb-2 font-semibold">Đi muộn</h2>
            <p className="text-2xl">16</p>
          </div>
        </div> */}
      </div>

      <div className="flex items-center justify-center bg-white w-[100%] p-4 rounded-md">
        {/* <div className="flex border rounded">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="outline-none px-3 py-2 w-[340px]"
          />
        </div> */}
        <div className="ml-4">
          <label className="mr-2">Từ ngày</label>
          <input
            type="date"
            name=""
            id=""
            className="border rounded px-3 py-2"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="ml-4">-</div>
        <div className="ml-4">
          <label className="mr-2">Đến ngày</label>
          <input
            type="date"
            name=""
            id=""
            className="border rounded px-3 py-2"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {/* <div className="ml-10">
          <label htmlFor="">Trạng thái</label>
          <select
            name=""
            id=""
            className="border rounded px-3 py-2 ml-2 outline-none"
          >
            <option value="">Tất cả</option>
            <option value="">Đi muộn</option>
            <option value="">Đúng giờ</option>
            <option value="">Về sớm</option>
            <option value="">Về muộn</option>
          </select>
        </div> */}
      </div>
      <div className="w-full bg-white p-4 mt-6 rounded-md">
        <table className="w-full text-center rounded-md">
          <thead>
            <tr className="bg-[#F6F6FE]">
              <td className="p-2">STT</td>
              <td className="p-2">Mã nhân viên</td>
              <td className="p-2">Ngày</td>
              <td className="p-2">Giờ vào</td>
              {/* <td className="p-2">Trạng thái vào</td> */}
              <td className="p-2">Giờ ra</td>
              {/* <td className="p-2">Trạng thái ra</td> */}
            </tr>
          </thead>
          <tbody>
            {attendance.map((emp, index) => {
              return (
                <tr>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{emp.user_id}</td>
                  <td className="p-2 border">{emp.date}</td>
                  <td className="p-2 border">{emp.check_in}</td>
                  {/* <td className="p-2 border">Đúng giờ</td> */}
                  <td className="p-2 border">{emp.check_out}</td>
                  {/* <td className="p-2 border">Về sớm</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
        {attendance.length === 0 && (
          <p className="text-center text-gray-500 py-4">Không có dữ liệu</p>
        )}
      </div>
    </>
  );
}

export default ChamCong;
