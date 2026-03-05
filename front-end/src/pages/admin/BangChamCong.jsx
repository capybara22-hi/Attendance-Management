import { useState, useEffect } from "react";
import prevIcon from "../../assets/logo/prev.svg";
import nextIcon from "../../assets/logo/next.svg";
import row from "@/assets/logo/row.svg";
import all from "@/assets/logo/all.svg";
import ViewAll from "./ChamCongViewAll";

function Main() {
    const [attendances, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [inputPage, setInputPage] = useState("1");
    const [search, setSearch] = useState("");
    const [view, setView] = useState(false);


    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const [date, setDate] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/attendances?page=${page}&recordInPage=50&date=${date}&search=${search}`)
            .then((res) => res.json())
            .then((data) => {
                setAttendance(data.data || []);
                setTotalPage(data.last_page || 1);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [page, date, search]);

    useEffect(() => {
        setInputPage(String(page));
    }, [page]);

    if (loading) {
        return <p>Loading...</p>
    }


    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === "" || /^\d+$/.test(value)) {
            setInputPage(value);
        }
    };

    const applyPageInput = () => {
        const num = parseInt(inputPage, 10);
        if (!isNaN(num) && num >= 1 && num <= totalPage) {
            setPage(num);
        } else {
            setInputPage(String(page));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            applyPageInput();
        }
    };

    return (
        <>
            {/* <p className="text-[#4154F1] text-2xl font-semibold mb-4">Bảng chấm công</p> */}
            <div className="flex justify-between">
                <p className="text-[#4154F1] text-2xl font-semibold mb-4">Bảng chấm công</p>
                <div className="flex justify-end">
                    <div className="flex items-center  ">
                        <img src={row} alt="" onClick={() => {
                            if (view == true) {
                                setView(false);
                            }
                        }} className={`w-[40px] h-[25px] rounded-full ${view == false ? "bg-gray-300" : ""} `} />
                        <img src={all} alt="" onClick={() => {
                            if (view == false) {
                                setView(true);
                            }
                        }} className={`w-[40px] h-[25px] rounded-full ${view == true ? "bg-gray-300" : ""}`} />
                    </div>
                </div>
            </div>

            {view === true ? <ViewAll></ViewAll> : (
                <>
                    <div className="flex items-center bg-white p-4 w-[100%] rounded-md">
                        <div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="border rounded outline-0 px-3 py-2 w-[280px]"
                            />
                        </div>
                        <div className="ml-10">
                            <label className="mr-2">Ngày</label>
                            <input type="date" value={date} onChange={(e) => {
                                setDate(e.target.value);
                            }} className="border rounded px-3 py-2" />
                        </div>
                        <div className="ml-10">
                            <label className="mr-2">Phòng</label>
                            <select name="" id="" className="border px-3 py-2 rounded outline-0">
                                <option value="all">Tất cả</option>
                                <option value="it">IT</option>
                                <option value="sale">Sales</option>
                                <option value="cskh">CSKH</option>
                                <option value="hr">HR</option>
                            </select>
                        </div>
                        <div className="ml-10">
                            <label className="mr-2">Loại</label>
                            <select name="" id="" className="border px-3 py-2 rounded outline-0">
                                <option value="all">Vào</option>
                                <option value="it">Ra</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full bg-white p-4 mt-6 rounded-md">
                        <table className="w-full text-center rounded-md">
                            <thead>
                                <tr className="bg-[#F6F6FE]  ">
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
                                        <td className="p-2 border">{index + 1}</td>
                                        <td className="p-2 border">{emp.employeeNo}</td>
                                        <td className="p-2 border">{emp.name || '-'}</td>
                                        <td className="p-2 border">{emp.date}</td>
                                        <td className="p-2 border">{emp.check_in}</td>
                                        <td className="p-2 border">{emp.check_out}</td>
                                        <td className="p-2 border">8</td>
                                        <td className="p-2 border text-blue-500">Xem</td>
                                    </tr>
                                )
                            })}
                        </table>
                        {attendances.length === 0 && (
                            <p className="text-center text-gray-500 py-4">Không có dữ liệu</p>
                        )}
                    </div>
                    <div className="w-[100%] flex justify-center">
                        <div className="flex justify-center items-center p-4 mt-8 mb-16 bg-white  w-[220px] h-[50px] rounded-md">
                            <img onClick={() => page > 1 ? setPage(page - 1) : setPage(page)} src={prevIcon} alt="prev" className="w-4 h-4 mr-2 cursor-pointer" />
                            <div className="flex items-center"> Trang <input value={inputPage} onChange={handleInputChange} onBlur={applyPageInput} onKeyDown={handleKeyDown} className="w-10 h-[32px] text-center border mx-1" /> / {totalPage}</div>
                            <img onClick={() => page < totalPage ? setPage(page + 1) : setPage(page)} src={nextIcon} alt="next" className="w-4 h-4 ml-2 cursor-pointer" />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Main;