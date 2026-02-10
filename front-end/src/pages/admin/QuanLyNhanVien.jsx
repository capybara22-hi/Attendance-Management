import { useState, useEffect } from "react";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/users")
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
            <p className="text-[#4154F1] text-2xl font-semibold mb-4">Danh sách nhân viên</p>
            <div className="flex items-center bg-white p-4 w-[100%] rounded-md">
                <div>
                    <input type="text" placeholder="Tìm kiếm" className="border rounded outline-0 px-3 py-2 w-[280px]" />
                </div>
                <div className="ml-10">
                    <label className="mr-1">Trạng thái</label>
                    <select name="" id="" className="border px-3 py-2 rounded outline-0">
                        <option value="">Tất cả</option>
                        <option value="">Đang làm</option>
                        <option value="">Đã nghỉ</option>
                    </select>
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
            </div>
            <div className="w-full bg-white p-4 mt-6 rounded-md">
                <table className="w-full text-center rounded-md">
                    <tr className="bg-[#F6F6FE] border-b-2">
                        <th className="p-2">STT</th>
                        <th className="p-2">Mã nhân viên</th>
                        <th className="p-2">Họ và tên</th>
                        {/* <th className="p-2">Giới tính</th> */}
                        <th className="p-2">Phòng ban</th>
                        <th className="p-2">Trạng thái</th>
                    </tr>
                    {employees.map((emp, index) => (
                        <tr key={emp.employeeNo}>
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{emp.employeeNo}</td>
                            <td className="p-2">{emp.name}</td>
                            {/* <td className="p-2">-</td> */}
                            <td className="p-2">{emp.department_id || '-'}</td>
                            <td className="p-2">Đang làm</td>
                        </tr>
                    ))}
                </table>
            </div >
        </>
    )
}

export default Employee;