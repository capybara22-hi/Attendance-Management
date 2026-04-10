import { useEffect, useState } from "react";

const activities = [
    { time: "08:02", user: "NV-0101", action: "Check-in tai Cong A", status: "On time" },
    { time: "08:11", user: "NV-0215", action: "Check-in tai Cong B", status: "Late" },
    { time: "11:59", user: "NV-0039", action: "Xin nghi nua ngay", status: "Approved" },
    { time: "13:05", user: "NV-0178", action: "Check-in bo sung", status: "Review" },
    { time: "17:31", user: "NV-0101", action: "Check-out thanh cong", status: "Done" }
];

function TongQuan() {
    const [totalUser, setTotalUser] = useState();
    const [em_in_depart, setDepart] = useState([]);
    const [checked, setChecked] = useState();
    const [loading, setLoading] = useState(true);


    // Viết API lấy dữ liệu nhân viên
    useEffect(() => {
        fetch('http://localhost:8000/api/users')
            .then(res => res.json())
            .then(data => {
                setTotalUser(data.totalUser);
                setDepart(data.user_in_department);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

    }, [loading]);
    console.log(em_in_depart);

    const overviewCards = [
        {
            title: "Tổng nhân viên",
            value: `${totalUser}`,
            change: "",
            tone: "text-emerald-600",
            bg: "from-emerald-50 to-emerald-100"
        },
        {
            title: "Đã chấm công",
            value: `${checked}`,
            change: "84.5% tong luot cham cong",
            tone: "text-blue-600",
            bg: "from-blue-50 to-blue-100"
        },
        {
            title: "Chưa chấm công",
            value: `${totalUser - checked}`,
            change: "Tang 3 luot",
            tone: "text-amber-600",
            bg: "from-amber-50 to-amber-100"
        },
        {
            title: "Nghỉ phép",
            value: "0",
            change: "Khong doi",
            tone: "text-rose-600",
            bg: "from-rose-50 to-rose-100"
        }
    ];

    const departmentStats = [
        { name: "IT", value: `${em_in_depart.find(item => item.department_id === 1)?.total}`, color: "bg-[#4d4def]" },
        { name: "Sales", value: `${em_in_depart.find(item => item.department_id === 2)?.total}`, color: "bg-[#00A8CC]" },
        { name: "CSKH", value: `${em_in_depart.find(item => item.department_id === 3)?.total}`, color: "bg-[#17B978]" },
        { name: "HR", value: `${em_in_depart.find(item => item.department_id === 4)?.total}`, color: "bg-[#FF9F1C]" },
        { name: "Khac", value: `${em_in_depart.find(item => item.department_id === 5)?.total}`, color: "bg-[#8B5CF6]" }
    ];

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/attendances')
            .then(res => res.json())
            .then(data => {
                setChecked(data.checked_in);
            })
            .finally(() => setLoading(false));

    }, [loading]);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="pb-10">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-[#4154F1] text-2xl font-semibold">Tổng quan hệ thống chấm công</p>
                    <p className="text-sm text-gray-500">Cập nhật vào 26/03/2026</p>
                </div>
            </div>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {overviewCards.map((card) => (
                    <article
                        key={card.title}
                        className={`rounded-md bg-gradient-to-br ${card.bg} p-4 shadow-sm ring-1 ring-black/5`}
                    >
                        <p className="text-sm font-medium text-gray-600">{card.title}</p>
                        <p className="mt-3 text-3xl font-bold text-gray-800">{card.value}</p>
                        {/* <p className={`mt-2 text-xs font-semibold ${card.tone}`}>{card.change}</p> */}
                    </article>
                ))}
            </section>

            <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_1fr]">
                <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-[#012970]">Xu hướng chấm công theo giờ</h2>
                        <span className="rounded-full bg-[#F6F9FF] px-3 py-1 text-xs font-semibold text-[#4154F1]">
                            07:00 - 18:00
                        </span>
                    </div>

                    <div className="grid h-[220px] grid-cols-12 items-end gap-2 rounded-lg bg-[#F8FAFF] p-4">
                        {[36, 52, 68, 84, 78, 63, 45, 30, 48, 72, 58, 40].map((bar, index) => (
                            <div key={index} className="flex h-full flex-col justify-end">
                                <div
                                    className="w-full rounded-t-md bg-gradient-to-t from-[#4d4def] to-[#7C83FF]"
                                    style={{ height: `${bar}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-gray-600 sm:grid-cols-6">
                        {[
                            "07h", "09h", "11h", "13h", "15h", "17h"
                        ].map((label) => (
                            <p key={label} className="text-center font-medium">{label}</p>
                        ))}
                    </div>
                </article>

                <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                    <h2 className="text-lg font-semibold text-[#012970]">Nhân sự theo phòng ban</h2>
                    <p className="mt-1 text-sm text-gray-500">Tong 122 nhan su dang hoat dong</p>

                    <div className="mt-5 space-y-4">
                        {departmentStats.map((item) => (
                            <div key={item.name}>
                                <div className="mb-1 flex items-center justify-between text-sm">
                                    <span className="font-medium text-gray-700">{item.name}</span>
                                    <span className="text-gray-500">{item.value} người</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-100">
                                    <div
                                        className={`h-2 rounded-full ${item.color}`}
                                        style={{ width: `${(item.value / totalUser) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_1fr]">
                <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-[#012970]">Hoạt động gần đây</h2>
                        <button type="button" className="text-sm font-semibold text-[#4154F1] hover:underline">
                            Xem tất cả
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr className="border-b bg-[#F8FAFF] text-gray-600">
                                    <th className="px-3 py-2 font-semibold">Thời gian</th>
                                    <th className="px-3 py-2 font-semibold">Nhân viên</th>
                                    <th className="px-3 py-2 font-semibold">Sự kiện</th>
                                    <th className="px-3 py-2 font-semibold">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((item, index) => (
                                    <tr key={`${item.user}-${index}`} className="border-b last:border-b-0">
                                        <td className="px-3 py-3 font-medium text-gray-700">{item.time}</td>
                                        <td className="px-3 py-3 text-gray-700">{item.user}</td>
                                        <td className="px-3 py-3 text-gray-600">{item.action}</td>
                                        <td className="px-3 py-3">
                                            <span className="rounded-full bg-[#EEF2FF] px-2.5 py-1 text-xs font-semibold text-[#4154F1]">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>

                <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                    <h2 className="text-lg font-semibold text-[#012970]">Lịch hôm nay</h2>
                    <p className="mt-1 text-sm text-gray-500">Cac moc quan trong trong ngay</p>

                    <div className="mt-5 space-y-3">
                        {[
                            { time: "07:45", title: "Kiem tra camera cong vao", type: "He thong" },
                            { time: "08:30", title: "Dong bo du lieu cham cong", type: "Tu dong" },
                            { time: "12:00", title: "Thong ke di muon buoi sang", type: "Bao cao" },
                            { time: "17:45", title: "Khoa ca lam viec ngay", type: "He thong" }
                        ].map((event) => (
                            <div key={event.time} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <div className="w-[56px] rounded-md bg-white py-1 text-center text-sm font-semibold text-[#4154F1] shadow-sm">
                                    {event.time}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{event.title}</p>
                                    <p className="text-xs text-gray-500">{event.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
}

export default TongQuan;