import { useState, useEffect } from "react";

function Main() {
    const [attendances, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch("http://localhost:8000/api/attendances")
    //         .then((res) => res.json())
    //         .then((response) => {
    //             if (response.success) {
    //                 setEmployees(response.data);
    //             }
    //         })
    //         .catch((err) => console.error(err))
    //         .finally(() => setLoading(false));
    // }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/attendances")
            .then((res) => res.json())
            .then((data) => setAttendance(data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <p className="text-[#4154F1] text-2xl font-semibold mb-4">Bảng chấm công</p>
            <div className="flex items-center bg-white p-4 w-[100%] rounded-md">
                <div>
                    <input type="text" placeholder="Tìm kiếm" className="border rounded outline-0 px-3 py-2 w-[280px]" />
                </div>
                <div className="ml-10">
                    <label className="mr-1">Ngày</label>
                    <input type="date" className="border rounded px-3 py-2" />
                </div>
                <div className="ml-10">
                    <label className="mr-1">Phòng</label>
                    <select name="" id="" className="border px-3 py-2 rounded outline-0">
                        <option value="all">Tất cả</option>
                        <option value="it">IT</option>
                        <option value="sale">Sales</option>
                        <option value="cskh">CSKH</option>
                        <option value="hr">HR</option>
                    </select>
                </div>
                <div className="ml-10">
                    <label className="mr-1">Loại</label>
                    <select name="" id="" className="border px-3 py-2 rounded outline-0">
                        <option value="all">Vào</option>
                        <option value="it">Ra</option>
                    </select>
                </div>
            </div>
            <div className="w-full bg-white p-4 mt-6 rounded-md">
                <table className="w-full text-center rounded-md">
                    <thead>
                        <tr className="bg-[#F6F6FE] border-b-2">
                            <th className="p-2">STT</th>
                            <th className="p-2">Mã nhân viên</th>
                            <th className="p-2">Họ và tên</th>
                            <th className="p-2">Ngày</th>
                            <th className="p-2">Giờ vào</th>
                            <th className="p-2">Giờ ra</th>
                            <th className="p-2">Tổng giờ</th>
                            <th className="p-2">Hình ảnh</th>
                        </tr>
                    </thead>

                    {attendances.map((emp, index) => {
                        return (
                            <tr key={emp.id}>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{emp.employeeNo}</td>
                                <td className="p-2">{emp.name || '-'}</td>
                                <td className="p-2">{emp.date}</td>
                                <td className="p-2">{emp.check_in}</td>
                                <td className="p-2">{emp.check_out}</td>
                                <td className="p-2">8</td>
                                <td className="p-2 text-blue-500">Xem</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )
}

export default Main;