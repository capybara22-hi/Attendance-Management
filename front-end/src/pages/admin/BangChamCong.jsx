import { useState, useEffect } from "react";

function Main() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/attendances")
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    setEmployees(response.data);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

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
                    <tr className="bg-[#F6F6FE] border-b-2">
                        <th className="p-2">STT</th>
                        <th className="p-2">Mã nhân viên</th>
                        <th className="p-2">Họ và tên</th>
                        {/* <th className="p-2">Phòng ban</th> */}
                        <th className="p-2">Ngày</th>
                        <th className="p-2">Giờ chấm công</th>
                        <th className="p-2">Loại</th>
                    </tr>
                    {employees.map((emp, index) => {
                        const checkTime = new Date(emp.check_time);
                        const date = checkTime.toLocaleDateString('vi-VN');
                        const time = checkTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

                        return (
                            <tr key={emp.id}>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{emp.user_id}</td>
                                <td className="p-2">{emp.user?.name || '-'}</td>
                                {/* <td className="p-2">{emp.user?.department_id || '-'}</td> */}
                                <td className="p-2">{date}</td>
                                <td className="p-2">{time}</td>
                                <td className="p-2">
                                    <span className={`px-2 py-1 rounded ${emp.type === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {emp.type === 'in' ? 'Vào' : 'Ra'}
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )
}

export default Main;