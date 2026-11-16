import { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import sortFromTopToBottomIcon from "../../assets/logo/sort-from-top-to-bottom-svgrepo-com.svg";
import sortFromBottomToTopIcon from "../../assets/logo/sort-from-bottom-to-top-svgrepo-com.svg";

const ds_nghi_phep = [
    { code: "NV0023", name: "Nguyễn Viết Tuấn", ngay_nghi: "4", ngay_con_lai: "9" },
    { code: "NV0015", name: "Phạm Quốc Anh", ngay_nghi: "2", ngay_con_lai: "11" },
    { code: "NV0036", name: "Lê Thị Ngọc Mai", ngay_nghi: "5", ngay_con_lai: "8" },
    { code: "NV0041", name: "Trần Minh Quân", ngay_nghi: "3", ngay_con_lai: "10" },
    { code: "NV0009", name: "Nguyễn Thu Hà", ngay_nghi: "1", ngay_con_lai: "12" }
]

function DonNghiPhep() {
    const [modal, setModal] = useState(false);
    const [ds_cho_duyet, set_ds_cho_duyet] = useState([]);
    const [ds_da_duyet, set_ds_da_duyet] = useState([]);
    const [approved_by, set_approved_by] = useState();
    const [tong_quan, set_tong_quan] = useState({});
    const [search, setSearch] = useState("");
    const [search1, setSearch1] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [reason, setReason] = useState("");
    const [log, setLog] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");
    const [infor, setInfor] = useState(null);
    const [employeeNo, setEmployeeNo] = useState('');

    const today = new Date().toISOString().split("T")[0];

    const fetchDonNghiPhep = () => {
        fetch(`http://127.0.0.1:8000/api/donnghiphep?search=${search}&date=${date}&status=${status}&reason=${reason}`)
            .then(res => res.json())
            .then(data => {
                set_ds_cho_duyet(data.ds_don_cho_duyet || []);
                set_ds_da_duyet(data.ds_don_da_duyet || []);

                set_tong_quan({
                    tong_don: data.tong_don,
                    so_don_cho_duyet: data.so_don_cho_duyet,
                    so_don_dong_y: data.so_don_dong_y,
                    so_don_tu_choi: data.so_don_tu_choi,
                    so_don_da_duyet: data.so_don_da_duyet
                })
            })
            .catch((error) => {
                console.log(error);
                set_ds_cho_duyet([]);
                set_ds_da_duyet([]);
            });
    };

    const cards = [
        { title: "Tổng đơn nghỉ phép", value: tong_quan.tong_don, color: "bg-white", textColor: "text-orange-400" },
        { title: "Số đơn chấp thuận", value: tong_quan.so_don_dong_y, color: "bg-sky-50", textColor: "text-green-400" },
        { title: "Đang chờ duyệt", value: tong_quan.so_don_cho_duyet, color: "bg-white", textColor: "text-yellow-400" },
        { title: "Số đơn từ chối", value: tong_quan.so_don_tu_choi, color: "bg-sky-50", textColor: "text-red-400" }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDonNghiPhep();
        }, 500);

        try {
            const rawUser = localStorage.getItem("auth_user") || sessionStorage.getItem("auth_user");
            if (!rawUser) return;

            const user = JSON.parse(rawUser);
            set_approved_by(user?.employeeNo || "");
        } catch (error) {
            set_approved_by("");
        }

        return () => clearTimeout(timer);
    }, [search, date, status, reason]);

    const duyet_don = async function (id, status) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/donnghiphep`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    status,
                    today,
                    approved_by: approved_by
                })
            });

            if (response.ok) {
                fetchDonNghiPhep();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const show_log = () => {
        fetch(`http://127.0.0.1:8000/api/leave-requests-log`)
            .then(res => res.json())
            .then(data => {
                setLog(data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    // Hiển thị dữ liệu lịch sử hoạt động
    useEffect(() => {
        show_log();
    }, []);

    const send_log = async function (id, employeeNo, status) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/leave-requests-log`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    employeeNo,
                    today,
                    status
                })
            })

            if (response.ok) {
                show_log();
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            const keyword = encodeURIComponent(search1.trim());

            fetch(`http://127.0.0.1:8000/api/donnghiphep/so-ngay-nghi-con-lai?search=${keyword}`)
                .then((res) => res.json())
                .then((response) => {
                    setLeaveRequests(response.data);
                })
                .catch((err) => console.log(err))
        }, 500);

        return () => clearTimeout(timer);
    }, [search1]);

    // Xem danh sách chi tiết
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/donnghiphep/danh-sach-chi-tiet?employeeNo=${employeeNo.employeeNo}`)
            .then((res) => res.json())
            .then((data) => {
                setInfor(data);
                console.log(data.data);
            })
    }, [employeeNo]);

    const sortedLeaveRequests = useMemo(() => {
        return [...leaveRequests].sort((a, b) => {
            const soNgayConLaiA = Number(a.so_ngay_con_lai) || 0;
            const soNgayConLaiB = Number(b.so_ngay_con_lai) || 0;

            return sortOrder === "asc"
                ? soNgayConLaiA - soNgayConLaiB
                : soNgayConLaiB - soNgayConLaiA;
        });
    }, [leaveRequests, sortOrder]);

    return (
        <>
            <div className="text-[#0c0c0e] text-2xl font-semibold">
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
                                <th className="p-2 flex-1">Từ ngày</th>
                                <th className="p-2 flex-1">Đến ngày</th>
                                <th className="p-2 flex-1">Lý do xin nghỉ</th>
                                <th className="p-2 flex-1">Duyệt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ds_cho_duyet.map((item) => (
                                <tr className="flex" key={item.id}>
                                    <td className="p-2 flex-1 border">{item.employeeNo}</td>
                                    <td className="p-2 flex-1 border">{item.name}</td>
                                    <td className="p-2 flex-1 border">{item.name_department}</td>
                                    <td className="p-2 flex-1 border">{item.start_date}</td>
                                    <td className="p-2 flex-1 border">{item.end_date}</td>
                                    <td className="p-2 flex-1 border">{item.reason}</td>
                                    <td className="p-2 flex items-center justify-center gap-2 flex-1 border text-blue-500 text-sm">
                                        <button className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg" onClick={() => {
                                            duyet_don(item.id, 1);
                                            send_log(item.id, item.employeeNo, "đồng ý");
                                        }}>Đồng ý</button>
                                        <button className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg" onClick={() => {
                                            duyet_don(item.id, 0);
                                            send_log(item.id, item.employeeNo, "từ chối");
                                        }}>Từ chối</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!tong_quan.so_don_cho_duyet && (
                        <p className="p-4 text-center italic">Không có dữ liệu</p>
                    )}
                </div>
            </div>

            <div className="mt-8 mb-8">
                <div className="bg-white px-2 py-4 rounded-md">
                    <p className="text-xl text-center font-semibold px-4 mb-6">Danh sách đã duyệt</p>
                    <div className="flex justify-center items-center gap-12 border mb-6 rounded-md p-2 bg-slate-300">
                        <input type="text" placeholder="Tìm kiếm" value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 rounded-md outline-none w-[250px]" />
                        <div>
                            <span>Ngày nghỉ</span>
                            <input type="date" name="" id="" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 ml-2 rounded-md outline-none" />
                        </div>

                        <div>
                            <span>Loại nghỉ</span>
                            <select name="" id="" value={reason} onChange={(e) => setReason(e.target.value)} className="border p-2 rounded-md outline-none ml-2">
                                <option value="">Tất cả</option>
                                <option value="1">Nghỉ ốm</option>
                                <option value="2">Khám bệnh</option>
                                <option value="3">Việc gia đình</option>
                                <option value="4">Công việc cá nhân</option>
                                <option value="5">Khác</option>
                            </select>
                        </div>
                        <div>
                            <span>Trạng thái</span>
                            <select name="" id="" value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded-md outline-none ml-2">
                                <option value="">Tất cả</option>
                                <option value="0">Từ chối</option>
                                <option value="1">Đồng ý</option>
                            </select>
                        </div>
                        <button title="Hủy bộ lọc" onClick={() => {
                            setSearch("");
                            setDate("");
                            setReason("");
                            setStatus("");
                        }}>
                            <RotateCcw size={18} color="white" />
                        </button>
                    </div>
                    <table className="w-full text-center rounded-md border">
                        <thead>
                            <tr className="bg-[#F6F6FE] border-b-2 flex">
                                <th className="p-2 flex-1">Mã nhân viên</th>
                                <th className="p-2 flex-1">Họ và tên</th>
                                <th className="p-2 flex-1">Phòng ban</th>
                                <th className="p-2 flex-1">Từ ngày</th>
                                <th className="p-2 flex-1">Đến ngày</th>
                                <th className="p-2 flex-1">Lý do xin nghỉ</th>
                                <th className="p-2 flex-1">Người duyệt</th>
                                <th className="p-2 flex-1">Ngày duyệt</th>
                                <th className="p-2 flex-1">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ds_da_duyet.map((item) => (
                                <tr className="flex border-b last:border-b-0" key={item.id}>
                                    <td className="p-2 flex-1 border">{item.employeeNo}</td>
                                    <td className="p-2 flex-1 border">{item.name}</td>
                                    <td className="p-2 flex-1 border">{item.name_department}</td>
                                    <td className="p-2 flex-1 border">{item.start_date}</td>
                                    <td className="p-2 flex-1 border">{item.end_date}</td>
                                    <td className="p-2 flex-1 border">{item.reason}</td>
                                    <td className="p-2 flex-1 border">{item.approved_by}</td>
                                    <td className="p-2 flex-1 border">{item.approval_date}</td>
                                    <td className={`p-2 flex-1 border italic font-bold ${item.status === 1 ? "text-green-500" : "text-red-500"}`}>
                                        {item.name_status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!tong_quan.so_don_da_duyet && (
                        <p className="p-4 text-center italic">Không có dữ liệu</p>
                    )}
                </div>
            </div>

            <div className="flex gap-4 w-full mb-8">
                <div className="bg-white w-[70%] p-2 rounded-md">
                    <p className="text-center text-xl font-semibold mt-2 mb-6">Danh sách ngày phép</p>
                    <div className="flex justify-center items-center gap-4 rounded-md p-2 mb-4 bg-slate-300">
                        <input type="text" placeholder="Tìm kiếm" value={search1} onChange={(e) => setSearch1(e.target.value)} className="border p-2 rounded-md outline-none w-[300px]" />
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                title="Sắp xếp cao đến thấp"
                                onClick={() => setSortOrder("desc")}
                                className={`p-2 rounded-md border ${sortOrder === "desc" ? "bg-sky-200 border-sky-400" : "bg-white"}`}
                            >
                                <img src={sortFromTopToBottomIcon} alt="Sắp xếp cao đến thấp" className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                title="Sắp xếp thấp đến cao"
                                onClick={() => setSortOrder("asc")}
                                className={`p-2 rounded-md border ${sortOrder === "asc" ? "bg-sky-200 border-sky-400" : "bg-white"}`}
                            >
                                <img src={sortFromBottomToTopIcon} alt="Sắp xếp thấp đến cao" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto rounded-md border">
                        <table className="w-full text-center">
                            <thead className="sticky top-0 z-10">
                                <tr className="bg-[#F6F6FE] border-b-2 flex">
                                    <th className="p-2 flex-1">Mã nhân viên</th>
                                    <th className="p-2 flex-1">Họ và tên</th>
                                    <th className="p-2 flex-1">Số ngày nghỉ phép </th>
                                    <th className="p-2 flex-1">Số ngày còn lại</th>
                                    <th className="p-2 flex-1">Danh sách đơn nghỉ phép</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedLeaveRequests.map((item) => (
                                    <tr className="flex" key={item.employeeNo}>
                                        <td className="p-2 flex-1 border">{item.employeeNo}</td>
                                        <td className="p-2 flex-1 border">{item.name}</td>
                                        <td className="p-2 flex-1 border">{item.so_ngay_da_nghi}</td>
                                        <td className="p-2 flex-1 border">{item.so_ngay_con_lai}</td>
                                        <td className="p-2 flex-1 border cursor-pointer text-blue-500" onClick={() => {
                                            setModal(true);
                                            setEmployeeNo({
                                                employeeNo: item.employeeNo,
                                                name: item.name
                                            })
                                        }}>Xem</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-[30%] bg-white px-4 py-2 flex flex-col rounded-md">
                    <p className="text-center text-xl font-semibold mt-2 mb-6">Lịch sử hoạt động</p>
                    <ul className="list-disc list-inside italic h-[275px] overflow-y-scroll border-2 py-4 pl-2">
                        {log.map((item) => (
                            <li key={item.id} className={`mb-2 ${item.action === "đồng ý" ? 'text-green-500' : 'text-red-500'} `}>Ngày {item.date}: Bạn {item.action} đơn nghỉ phép của {item.name}</li>
                        ))}
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
                            <p><span className="font-bold">Mã nhân viên:</span> {employeeNo.employeeNo}</p>
                            <p><span className="font-bold">Họ và tên:</span> {employeeNo.name}</p>
                            <p><span className="font-bold">Tổng số đơn nghỉ phép:</span> {infor?.total ?? 0}</p>
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
                                {(infor?.data || []).map((item, index) => (
                                    <tr className="flex text-center" key={item.id ?? index}>
                                        <td className="p-2 w-[40px] border">{index + 1}</td>
                                        <td className="p-2 flex-1 border">{item.date_range}</td>
                                        <td className="p-2 flex-1 border">{item.number_date}</td>
                                        <td className="p-2 flex-1 border">{item.reason}</td>
                                        <td className="p-2 flex-1 border">{new Date(item.created_at).toLocaleDateString("vi-VN")}</td>
                                        <td className={`p-2 flex-1 border text-green-500 italic ${item.name_status === "Đồng ý" ? "text-green-500" : "text-red-500"}`}>{item.name_status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>

            )}
        </>
    )
}

export default DonNghiPhep;