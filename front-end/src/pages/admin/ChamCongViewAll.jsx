import row from "@/assets/logo/row.svg";
import all from "@/assets/logo/all.svg";
import { useState, useEffect } from "react";
import { parsePath } from "react-router-dom";

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 != 0) || (year % 400 === 0);
}

function getDate(inputMonth) {
    const arr = inputMonth.split("-");
    const month = arr[1];
    const year = arr[0];
    let days;

    switch (month) {
        case "01":
        case "03":
        case "05":
        case "07":
        case "08":
        case "10":
        case "12":
            days = 31;
            break;

        case "04":
        case "06":
        case "09":
        case "11":
            days = 30;
            break;

        case "02":
            if (isLeapYear(year)) {
                days = 29; // năm nhuận
            } else {
                days = 28;
            }
            break;

        default:
            days = "Tháng không hợp lệ";
    }

    return days;
}



function ViewAll() {
    const [view, setView] = useState(false);
    const [users, setUsers] = useState([]);
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const [inputMonth, setInputMonth] = useState(`${year}-${month}`);
    const [date, setDate] = useState("");


    const monthLenght = getDate(inputMonth);
    const array = Array.from({ length: monthLenght }, (_, i) => i + 1);


    useEffect(() => {
        fetch("http://localhost:8000/api/users")
            .then((res) => res.json())
            .then((user) => {
                if (user.success) {
                    setUsers(user.data);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/attendances/viewall?inputMonth=${inputMonth}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('Attendance data:', data);
                if (data.success) {
                    setAttendances(data.data || []);
                }
            })
            .catch((err) => console.log(err));
    }, [inputMonth]);


    const getAttendance = (userId, date) => {
        return attendances.find(att => att.user_id === userId && att.date === date);
    };

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            {/* <div className="flex justify-between">
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
            </div> */}


            <div className="w-full bg-white mt-6 rounded-md overflow-x-auto overflow-y-auto h-[calc(100vh-180px)]">
                <table className="w-full text-center rounded-md">
                    <thead>
                        <tr className="bg-[#F6F6FE]">
                            {/* <th className="p-2 italic">Tháng 2/2026</th> */}
                            <th className="p-2 min-w-[300px] border italic sticky left-0 top-0 z-30 bg-[#F6F6FE]"><input type="month" value={inputMonth} onChange={(e) => setInputMonth(e.target.value)} className="italic text-center rounded-md" /></th>
                            {array.map((element, index) => (
                                <th key={index} className="p-1 border sticky top-0 z-20 bg-[#F6F6FE] w-20 min-w-[60px]">{element}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const userAttendanceCount = array.filter(day => {
                                const currentDate = `${inputMonth}-${String(day).padStart(2, "0")}`;
                                const attendance = getAttendance(user.employeeNo, currentDate);
                                return attendance && attendance.check_in;
                            }).length;

                            return (
                                <tr key={user.employeeNo} className="">
                                    <td className="p-2 border text-left sticky left-0 z-10 bg-white">
                                        <div className="flex justify-between cursor-pointer">
                                            <div className="font-semibold">{user.name}</div>
                                            <div className="text-sm italic mt-2">{userAttendanceCount}</div>
                                        </div>
                                        <div className="italic text-sm opacity-50">{user.employeeNo}</div>
                                    </td>

                                    {array.map((element, index) => {
                                        const currentDate = `${inputMonth}-${String(element).padStart(2, "0")}`;
                                        const attendance = getAttendance(user.employeeNo, currentDate);

                                        return (
                                            <td key={index} className="p-2 border text-sm z-10 w-20 min-w-[60px]">
                                                {attendance ? (
                                                    <>
                                                        <p className="text-green-600">{attendance.check_in ? attendance.check_in.substring(0, 5) : '--:--'}</p>
                                                        <span>-</span>
                                                        <p className="text-green-600">{attendance.check_out ? attendance.check_out.substring(0, 5) : '--:--'}</p>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-300">-</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >


        </>
    )
}

export default ViewAll;