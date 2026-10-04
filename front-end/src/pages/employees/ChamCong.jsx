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
  return (
    <>
      <div className="flex justify-between">
        <p className="text-[#4154F1] text-2xl font-semibold mb-4">
          Bảng chấm công
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <div className="flex items-center justify-center bg-white text-center w-[48%] h-[100px] rounded-md">
          <div>
            <h2 className="text-xl mb-2 font-semibold">Số ngày làm việc</h2>
            <p className="text-2xl">16</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white text-center w-[48%] h-[100px] rounded-md">
          <div>
            <h2 className="text-xl mb-2 font-semibold">Số ngày nghỉ</h2>
            <p className="text-2xl">16</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white text-center w-[48%] h-[100px] rounded-md">
          <div>
            <h2 className="text-xl mb-2 font-semibold">Đi muộn</h2>
            <p className="text-2xl">16</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white text-center w-[48%] h-[100px] rounded-md">
          <div>
            <h2 className="text-xl mb-2 font-semibold">Đúng giờ</h2>
            <p className="text-2xl">16</p>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-white w-[100%] p-4 rounded-md">
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
          />
        </div>
        <div className="ml-10">
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
        </div>
      </div>
      <div className="w-full bg-white p-4 mt-6 rounded-md">
        <table className="w-full text-center rounded-md">
          <thead>
            <tr className="bg-[#F6F6FE]">
              <td className="p-2">STT</td>
              <td className="p-2">Mã nhân viên</td>
              <td className="p-2">Ngày</td>
              <td className="p-2">Giờ vào</td>
              <td className="p-2">Trạng thái vào</td>
              <td className="p-2">Giờ ra</td>
              <td className="p-2">Trạng thái ra</td>
            </tr>
          </thead>

          {mockData.map((emp) => {
            return (
              <tr>
                <td className="p-2 border">{emp.stt}</td>
                <td className="p-2 border">{emp.maNhanVien}</td>
                <td className="p-2 border">{emp.ngay}</td>
                <td className="p-2 border">{emp.gioVao}</td>
                <td className="p-2 border">Đúng giờ</td>
                <td className="p-2 border">{emp.gioRa}</td>
                <td className="p-2 border">Về sớm</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default ChamCong;
