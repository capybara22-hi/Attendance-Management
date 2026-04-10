import { useState } from "react";

const cards = [
    { title: "Tổng đơn nghỉ phép", value: "23", color: "bg-white", textColor: "text-orange-400" },
    { title: "Số đơn chấp thuận", value: "12", color: "bg-sky-50", textColor: "text-green-400" },
    { title: "Đang chờ duyệt", value: "20", color: "bg-white", textColor: "text-yellow-400" },
    { title: "Số đơn từ chối", value: "4", color: "bg-sky-50", textColor: "text-red-400" }
];

const ds_xin_nghi = [
    { code: "NV0025", name: "Nguyễn Viết Tuấn", depart: "IT", date: "06/04/2026", why: "Nghỉ ốm" },
    { code: "NV0011", name: "Quách Tất Hoàn", depart: "IT", date: "07/04/2026", why: "Việc gia đình" },
    { code: "NV0032", name: "Trần Minh Huy", depart: "Kế toán", date: "08/04/2026", why: "Khám bệnh" },
    { code: "NV0008", name: "Phạm Thu Trang", depart: "Nhân sự", date: "09/04/2026", why: "Nghỉ phép năm" },
    { code: "NV0040", name: "Lê Quốc Bảo", depart: "Marketing", date: "10/04/2026", why: "Công việc cá nhân" }
];

const ds_da_duyet = [
    {
        code: "NV0023",
        name: "Nguyễn Viết Tuấn",
        depart: "IT",
        date: "23/04/2026 - 26/04/2026",
        days: 4,
        why: "Nghỉ ốm",
        approver: "Nguyễn Đức Mạnh",
        approvedDate: "08/04/2026",
        status: "Đồng ý"
    },
    {
        code: "NV0025",
        name: "Nguyễn Thị Huyền Thương",
        depart: "IT",
        date: "23/04/2026",
        days: 1,
        why: "Nghỉ ốm",
        approver: "Nguyễn Đức Mạnh",
        approvedDate: "08/04/2026",
        status: "Từ chối"
    },
    {
        code: "NV0031",
        name: "Đặng Hoàng Nam",
        depart: "Kế toán",
        date: "15/04/2026 - 16/04/2026",
        days: 2,
        why: "Việc gia đình",
        approver: "Lê Minh Tuấn",
        approvedDate: "09/04/2026",
        status: "Đồng ý"
    },
    {
        code: "NV0017",
        name: "Trần Thị Mỹ Linh",
        depart: "Nhân sự",
        date: "20/04/2026",
        days: 1,
        why: "Khám bệnh",
        approver: "Phạm Quốc Huy",
        approvedDate: "10/04/2026",
        status: "Đồng ý"
    },
    {
        code: "NV0042",
        name: "Lý Quốc Cường",
        depart: "Marketing",
        date: "18/04/2026 - 19/04/2026",
        days: 2,
        why: "Công việc cá nhân",
        approver: "Nguyễn Đức Mạnh",
        approvedDate: "10/04/2026",
        status: "Từ chối"
    }
];

const ds_nghi_phep = [
    { code: "NV0023", name: "Nguyễn Viết Tuấn", ngay_nghi: "4", ngay_con_lai: "9" },
    { code: "NV0015", name: "Phạm Quốc Anh", ngay_nghi: "2", ngay_con_lai: "11" },
    { code: "NV0036", name: "Lê Thị Ngọc Mai", ngay_nghi: "5", ngay_con_lai: "8" },
    { code: "NV0041", name: "Trần Minh Quân", ngay_nghi: "3", ngay_con_lai: "10" },
    { code: "NV0009", name: "Nguyễn Thu Hà", ngay_nghi: "1", ngay_con_lai: "12" }
]

function DonNghiPhep() {
    const [modal, setModal] = useState(false);

    return (
        <>
            <div className="text-[#4154F1] text-2xl font-semibold">
                Đơn nghỉ phép
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-4">
                {cards.map((card) => (
                    <div className={`p-4 ${card.color} border border-sky-200 rounded-md`}>
                        <p className="mb-4 font-bold">{card.title}</p>
                        <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <div className="bg-white px-2 py-4 rounded-md">
                    <p className="text-xl text-center font-semibold px-4 mb-6">Danh sách chờ duyệt</p>
                    <table className="w-full text-center rounded-md">
                        <thead>
                            <tr className="bg-[#F6F6FE] border-b-2 flex">
                                <th className="p-2 flex-1">Mã nhân viên</th>
                                <th className="p-2 flex-1">Họ và tên</th>
                                <th className="p-2 flex-1">Phòng ban</th>
                                <th className="p-2 flex-1">Ngày xin nghỉ</th>
                                <th className="p-2 flex-1">Lý do xin nghỉ</th>
                                <th className="p-2 flex-1">Duyệt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ds_xin_nghi.map((item) => (
                                <tr className="flex" key={item.code}>
                                    <td className="p-2 flex-1 border">{item.code}</td>
                                    <td className="p-2 flex-1 border">{item.name}</td>
                                    <td className="p-2 flex-1 border">{item.depart}</td>
                                    <td className="p-2 flex-1 border">{item.date}</td>
                                    <td className="p-2 flex-1 border">{item.why}</td>
                                    <td className="p-2 flex items-center justify-center gap-2 flex-1 border text-blue-500 text-sm">
                                        <button className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg">Đồng ý</button>
                                        <button className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg">Từ chối</button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    {/* <p className="p-4 text-center italic">Không có dữ liệu</p> */}
                </div>
            </div>

            <div className="mt-8 mb-8">
                <div className="bg-white px-2 py-4 rounded-md">
                    <p className="text-xl text-center font-semibold px-4 mb-6">Danh sách đã duyệt</p>
                    <div className="flex justify-center gap-12 border mb-6 rounded-md p-2 bg-slate-100">
                        <input type="text" placeholder="Tìm kiếm" className="border p-2 rounded-md outline-none w-[300px]" />
                        <div>
                            <span>Ngày</span>
                            <input type="date" name="" id="" className="border p-2 ml-2 rounded-md outline-none" placeholder="Ngafy" />
                        </div>

                        <div>
                            <span>Loại nghỉ</span>
                            <select name="" id="" className="border p-2 rounded-md outline-none ml-2">
                                <option value="">Tất cả</option>
                                <option value="">Nghỉ ốm</option>
                                <option value="">Khám bệnh</option>
                                <option value="">Việc gia đình</option>
                                <option value="">Công việc cá nhân</option>
                                <option value="">Khác</option>
                            </select>
                        </div>
                        <div>
                            <span>Trạng thái</span>
                            <select name="" id="" className="border p-2 rounded-md outline-none ml-2">
                                <option value="">Tất cả</option>
                                <option value="">Đồng ý</option>
                                <option value="">Từ chối</option>
                            </select>
                        </div>
                    </div>
                    <table className="w-full text-center rounded-md border">
                        <thead>
                            <tr className="bg-[#F6F6FE] border-b-2 flex">
                                <th className="p-2 flex-1">Mã nhân viên</th>
                                <th className="p-2 flex-1">Họ và tên</th>
                                <th className="p-2 flex-1">Phòng ban</th>
                                <th className="p-2 flex-1">Ngày xin nghỉ</th>
                                <th className="p-2 flex-1">Số ngày</th>
                                <th className="p-2 flex-1">Lý do xin nghỉ</th>
                                <th className="p-2 flex-1">Người duyệt</th>
                                <th className="p-2 flex-1">Ngày duyệt</th>
                                <th className="p-2 flex-1">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ds_da_duyet.map((item) => (
                                <tr className="flex border-b last:border-b-0" key={item.code + item.date}>
                                    <td className="p-2 flex-1 border">{item.code}</td>
                                    <td className="p-2 flex-1 border">{item.name}</td>
                                    <td className="p-2 flex-1 border">{item.depart}</td>
                                    <td className="p-2 flex-1 border">{item.date}</td>
                                    <td className="p-2 flex-1 border">{item.days}</td>
                                    <td className="p-2 flex-1 border">{item.why}</td>
                                    <td className="p-2 flex-1 border">{item.approver}</td>
                                    <td className="p-2 flex-1 border">{item.approvedDate}</td>
                                    <td className={`p-2 flex-1 border italic font-bold ${item.status === "Đồng ý" ? "text-green-500" : "text-red-500"}`}>
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <p className="p-4 text-center italic">Không có dữ liệu</p> */}
                </div>
            </div>

            <div className="flex gap-4 w-full mb-8">
                <div className="bg-white w-[70%] p-2 rounded-md">
                    <p className="text-center text-xl font-semibold mt-2 mb-6">Danh sách ngày phép</p>
                    <div className="flex justify-center rounded-md p-2 mb-4 bg-slate-100">
                        <input type="text" placeholder="Tìm kiếm" className="border p-2 rounded-md outline-none w-[300px]" />
                    </div>
                    <table className="w-full text-center rounded-md border">
                        <thead>
                            <tr className="bg-[#F6F6FE] border-b-2 flex">
                                <th className="p-2 flex-1">Mã nhân viên</th>
                                <th className="p-2 flex-1">Họ và tên</th>
                                <th className="p-2 flex-1">Số ngày nghỉ phép </th>
                                <th className="p-2 flex-1">Số ngày còn lại</th>
                                <th className="p-2 flex-1">Danh sách đơn nghỉ phép</th>
                            </tr>
                        </thead>
                        <tbody>

                            {ds_nghi_phep.map((item) => (
                                <tr className="flex">
                                    <td className="p-2 flex-1 border">{item.code}</td>
                                    <td className="p-2 flex-1 border">{item.name}</td>
                                    <td className="p-2 flex-1 border">{item.ngay_nghi}</td>
                                    <td className="p-2 flex-1 border">{item.ngay_con_lai}</td>
                                    <td className="p-2 flex-1 border cursor-pointer text-blue-500" onClick={() => setModal(true)}>Xem</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-[30%] bg-white px-4 py-2 flex flex-col rounded-md">
                    <p className="text-center text-xl font-semibold mt-2 mb-6">Lịch sử hoạt động</p>
                    <ul className="list-disc list-inside text-green-500 italic h-[275px] overflow-y-scroll border-2 py-4 pl-2">
                        <li className="mb-2 text-yellow-500">Ngày 03/04/2026: Nguyễn Viết Tuấn gửi đơn nghỉ phép</li>
                        <li className="mb-2">Ngày 05/04/2026: Đồng ý đơn xin nghỉ phép của nhân viên Nguyễn Viết Tuấn</li>
                        <li className="mb-2">Ngày 05/04/2026: Đồng ý đơn xin nghỉ phép của nhân viên Nguyễn Hải Đăng</li>
                        <li className="mb-2 text-red-500">Ngày 03/04/2026: Từ chối đơn xin nghỉ phép của nhân viên Lê Thị Hoa</li>
                        <li className="mb-2">Ngày 02/04/2026: Đồng ý đơn xin nghỉ phép của nhân viên Nguyễn Hải Đăng</li>
                        <li className="mb-2">Ngày 02/04/2026: Đồng ý đơn xin nghỉ phép của nhân viên Nguyễn Hải Đăng</li>
                        <li className="mb-2">Ngày 02/04/2026: Đồng ý đơn xin nghỉ phép của nhân viên Nguyễn Hải Đăng</li>
                    </ul>
                </div>
            </div>

            {/* modal xem chi tiết */}
            {modal && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setModal(false)}></div>

                    <div className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-8 z-50 w-[1000px] h-[400px] border rounded">
                        <p className="text-center text-xl font-semibold">Danh sách đơn nghỉ phép</p>
                        <div className="my-6">
                            <p><span className="font-bold">Mã nhân viên:</span> NV0025</p>
                            <p><span className="font-bold">Họ và tên:</span> Nguyễn Đức Mạnh</p>
                            <p><span className="font-bold">Tổng số đơn nghỉ phép:</span> 8</p>
                        </div>
                        <table className="w-full text-center rounded-md">
                            <thead>
                                <tr className="bg-[#F6F6FE] border-b-2 flex">
                                    <th className="p-2 w-[40px]">STT</th>
                                    <th className="p-2 flex-1">Ngày nghỉ phép</th>
                                    <th className="p-2 flex-1">Số ngày</th>
                                    <th className="p-2 flex-1">Lý do xin nghỉ</th>
                                    <th className="p-2 flex-1">Ngày gửi</th>
                                    <th className="p-2 flex-1">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="flex text-center">
                                    <td className="p-2 w-[40px] border">1</td>
                                    <td className="p-2 flex-1 border">08/04/2026</td>
                                    <td className="p-2 flex-1 border">1</td>
                                    <td className="p-2 flex-1 border">Nghỉ ốm</td>
                                    <td className="p-2 flex-1 border">06/04/2026</td>
                                    <td className="p-2 flex-1 border text-green-500 italic">Đã duyệt</td>
                                </tr>
                                <tr className="flex text-center">
                                    <td className="p-2 w-[40px] border">2</td>
                                    <td className="p-2 flex-1 border">09/04/2026 - 11/04/2026</td>
                                    <td className="p-2 flex-1 border">3</td>
                                    <td className="p-2 flex-1 border">Nghỉ ốm</td>
                                    <td className="p-2 flex-1 border">06/04/2026</td>
                                    <td className="p-2 flex-1 border text-green-500 italic">Đã duyệt</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>

            )}
        </>
    )
}

export default DonNghiPhep;