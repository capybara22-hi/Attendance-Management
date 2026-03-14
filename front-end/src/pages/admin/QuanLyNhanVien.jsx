import { useState, useEffect } from "react";
import edit from "@/assets/logo/edit.svg";
import x from "@/assets/logo/x.svg";
import trash from "@/assets/logo/trash-2.svg";



function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [image, setImage] = useState(false);
    const [infor, setInfor] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [del, setDel] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [saveEdit, setSaveEdit] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            fetch(`http://localhost:8000/api/users?search=${search}`)
                .then((res) => res.json())
                .then((response) => {
                    if (response.success) {
                        setEmployees(response.data);
                    }
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }, 500);

        return () => clearTimeout(timer);
    }, [search]); // Xóa infor ở đây để tránh bị re-fetch liên tục khi gõ phím

    // Thông báo
    useEffect(() => {
        if (confirmDel) {
            const timer = setTimeout(() => {
                setConfirmDel(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [confirmDel]);

    useEffect(() => {
        if (saveEdit) {
            const timer = setTimeout(() => {
                setSaveEdit(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [saveEdit]);

    const updateUser = async function () {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${infor.employeeNo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: infor.name,
                    employeeNo: infor.employeeNo,
                    image: infor.image,
                    department_id: infor.department,
                    gender: infor.gender,
                    email: infor.email,
                    phone_number: infor.phone,
                    bank_name: infor.bank,
                    bank_account_number: infor.bank_account,
                    status: infor.status
                })
            });

            const data = await response.json();
            console.log(data);

            // Cập nhật lại UI ngay lập tức
            setEmployees(prev => prev.map(emp =>
                emp.employeeNo === infor.employeeNo
                    ? {
                        ...emp,
                        name: infor.name,
                        department_id: infor.department,
                        gender: infor.gender,
                        email: infor.email,
                        phone_number: infor.phone,
                        bank_name: infor.bank,
                        bank_account_number: infor.bank_account,
                        status: infor.status
                    }
                    : emp
            ));

        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <p className="text-[#4154F1] text-2xl font-semibold mb-4">Danh sách nhân viên</p>
            <div className="flex items-center bg-white p-4 w-[100%] rounded-md">
                <div>
                    <input type="text" placeholder="Tìm kiếm" onChange={(e) => setSearch(e.target.value)} className="border rounded outline-0 px-3 py-2 w-[280px]" />
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
                        <option value="hr">Khác</option>
                    </select>
                </div>
            </div>
            <div className="w-full bg-white p-4 mt-6 rounded-md">
                <table className="w-full text-center rounded-md">
                    <tr className="bg-[#F6F6FE] border-b-2">
                        <th className="p-2">STT</th>
                        <th className="p-2">Mã nhân viên</th>
                        <th className="p-2">Họ và tên</th>
                        <th className="p-2">Giới tính</th>
                        <th className="p-2">Phòng ban</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2">Chi tiết</th>
                    </tr>
                    {employees.map((emp, index) => (
                        <tr key={emp.employeeNo}>
                            <td className="p-2 border">{index + 1}</td>
                            <td className="p-2 border">{emp.employeeNo}</td>
                            <td className="p-2 border">{emp.name}</td>
                            <td className="p-2 border">{emp.gender == 0 ? "Nam" : "Nữ"}</td>
                            <td className="p-2 border">
                                {
                                    (() => {
                                        switch (Number(emp.department_id)) {
                                            case 0:
                                                return "IT";
                                            case 1:
                                                return "Sales";
                                            case 2:
                                                return "CSKH";
                                            case 3:
                                                return "HR";
                                            case 4:
                                                return "Khác";
                                            default:
                                                return "Không xác định";
                                        }
                                    })()
                                }
                            </td>
                            <td className="p-2 border">{emp.status}</td>
                            <td className="p-2 border text-blue-500 cursor-pointer" onClick={() => {
                                setImage(true);
                                setInfor({
                                    name: emp.name,
                                    employeeNo: emp.employeeNo,
                                    image: emp.image,
                                    department: emp.department_id,
                                    gender: emp.gender,
                                    email: emp.email,
                                    phone: emp.phone_number,
                                    bank: emp.bank_name,
                                    bank_account: emp.bank_account_number,
                                    status: emp.status
                                })
                                setIsEdit(false);
                            }}>Xem</td>
                        </tr>
                    ))}
                </table>
            </div>

            {image && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => {
                        setImage(false);
                    }}></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-8 z-50 w-[600px] h-[680px] border rounded bg-white shadow-lg">
                        <p className="text-right cursor-pointer" onClick={() => setImage(false)}>x</p>
                        <div className="flex items-center">
                            <img src="" alt="" className="border rounded-full w-16 h-16" />
                            <p className="ml-4 text-[24px]">{infor.name}</p>

                            <img src={edit} alt="" onClick={() => setIsEdit(!isEdit)} className="w-[18px] h-[18px] mx-1 mt-1" />
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between py-4 border-b-2">
                                <p>Mã nhân viên</p>
                                {/* <p className="font-light">{infor.employeeNo}</p> */}
                                <div className="flex justify-end items-center w-[80%]">
                                    <input type="text" value={infor.employeeNo} onChange={(e) => setInfor((prev) => ({ ...prev, employeeNo: e.target.value }))} className="text-right w-[90%] outline-none font-light" readOnly={!isEdit} />
                                    <img src={x} alt="" className="w-3 h-3 ml-1" hidden={!isEdit} />
                                </div>
                            </div>
                            <div className="flex justify-between py-4 border-b-2">
                                <p>Phòng ban</p>
                                {/* <p className="font-light">IT</p> */}
                                <div className="flex justify-end items-center w-[80%]">
                                    {/* <input type="text" className="text-right w-[90%] outline-none" readOnly={!isEdit} /> */}
                                    <select name="" id="" value={infor.department} onChange={(e) => setInfor((prev) => ({ ...prev, department: e.target.value }))} className={`outline-none ${!isEdit ? "appearance-none text-right" : "text-center"} font-light`} disabled={!isEdit}>
                                        <option value="0">IT</option>
                                        <option value="1">Sales</option>
                                        <option value="2">CSKH</option>
                                        <option value="3">HR</option>
                                        <option value="4">Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between py-4 border-b-2">
                                <p>Giới tính</p>
                                {/* <p className="font-light">Nam</p> */}
                                <div className="flex justify-end items-center w-[80%]">
                                    {/* <input type="text" className="text-right w-[90%] outline-none" readOnly={!isEdit} /> */}
                                    <select name="" id="" value={infor.gender} onChange={(e) => setInfor((prev) => ({ ...prev, gender: Number(e.target.value) }))} className={`outline-none ${!isEdit ? "appearance-none text-right" : "text-center"} font-light`} disabled={!isEdit}>
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between py-4 border-b-2">
                                <p>Email</p>
                                {/* <p className="font-light">nguyenviettuan23122004@gmail.com</p> */}
                                <div className="flex justify-end items-center w-[80%]">
                                    <input type="text" value={infor.email} onChange={(e) => setInfor((prev) => ({ ...prev, email: e.target.value }))} className="text-right w-[90%] outline-none font-light" readOnly={!isEdit} />
                                    <img src={x} alt="" className="w-3 h-3 ml-1" hidden={!isEdit} />
                                </div>
                            </div>
                            <div className="flex justify-between py-4 border-b-2">
                                <p>Số điện thoại</p>
                                {/* <p className="font-light">0293827162</p> */}
                                <div className="flex justify-end items-center w-[80%]">
                                    <input type="text" value={infor.phone} onChange={(e) => setInfor((prev) => ({ ...prev, phone: e.target.value }))} className="text-right w-[90%] outline-none font-light" readOnly={!isEdit} />
                                    <img src={x} alt="" className="w-3 h-3 ml-1" hidden={!isEdit} />
                                </div>
                            </div>
                            <div className="flex justify-between py-4 border-b-2">
                                <p>Tên ngân hàng</p>
                                {/* <p className="font-light">BIDV</p> */}
                                <div className="flex justify-end items-center w-[80%]">
                                    <input type="text" value={infor.bank} onChange={(e) => setInfor((prev) => ({ ...prev, bank: e.target.value }))} className="text-right w-[90%] outline-none font-light" readOnly={!isEdit} />
                                    <img src={x} alt="" className="w-3 h-3 ml-1" hidden={!isEdit} />
                                </div>
                            </div>
                            <div className="flex justify-between py-4 border-b-2">
                                <p>Số tài khoản</p>
                                {/* <p className="font-light">46010005024628</p> */}
                                <div className="flex justify-end items-center w-[80%]">
                                    <input type="text" value={infor.bank_account} onChange={(e) => setInfor((prev) => ({ ...prev, bank_account: e.target.value }))} className="text-right w-[90%] outline-none font-light" readOnly={!isEdit} />
                                    <img src={x} alt="" className="w-3 h-3 ml-1" hidden={!isEdit} />
                                </div>
                            </div>
                            <div className="flex justify-between py-4 border-b-2">
                                <p>Trạng thái</p>
                                {/* <p className="font-light">Đang làm</p> */}
                                <div className="flex justify-end items-center w-[80%]">
                                    <select name="" id="" value={infor.status} onChange={(e) => setInfor((prev) => ({ ...prev, status: e.target.value }))} className={`outline-none ${!isEdit ? "appearance-none text-right" : "text-center"} font-light`} disabled={!isEdit}>
                                        <option value="0">Đang làm</option>
                                        <option value="1">Đã nghỉ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={`flex justify-between mt-4 ${!isEdit ? 'hidden' : ""} `}>
                            <button type="button" className="px-4 py-2 bg-white border-2 text-white rounded-md mr-2" onClick={() => setDel(true)}>
                                <img src={trash} alt="" className="w-[18px] h-[18px]" />
                            </button>
                            <div>
                                <button type="button" className="px-6 py-2 bg-white border rounded-md mr-2" onClick={() => {
                                    setImage(false);
                                }}>Hủy</button>
                                <button type="button" className="px-6 py-2 bg-[#4d4def] border-2 text-white rounded-md" onClick={() => {
                                    setSaveEdit(true);
                                    setImage(false);
                                    updateUser();
                                }}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Xác nhận xóa nhân viên */}
            {del && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-[60]" onClick={() => setDel(false)}></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] z-[70] bg-white border px-6 py-4 rounded shadow-lg">
                        <p className="text-[#4d4def] text-[24px] border-b-2 pb-2">Thông báo</p>
                        <p className="mt-4 text-gray-700">Bạn có chắc muốn xóa nhân viên không?</p>
                        <div className="flex justify-end mt-6">
                            <button type="button" className="px-6 py-2 bg-white border rounded-md mr-2 hover:bg-gray-100" onClick={() => {
                                setDel(false);
                                setConfirmDel(false);
                            }}>Hủy</button>
                            <button type="button" className="px-4 py-2 bg-[#4d4def] border-2 text-white rounded-md hover:bg-blue-700" onClick={() => {
                                setImage(false);
                                setDel(false);
                                setConfirmDel(true);
                            }}>Xác nhận</button>
                        </div>
                    </div>
                </>
            )}

            {confirmDel && (
                <>
                    <div className="fixed top-[70px] right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                        Xóa nhân viên thành công!
                    </div>
                </>
            )}

            {saveEdit && (
                <>
                    <div className="fixed top-[70px] right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                        Đã lưu thông tin nhân viên!
                    </div>
                </>
            )}
        </>
    )
}

export default Employee;