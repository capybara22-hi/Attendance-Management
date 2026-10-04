import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const leaveData = [
  {
    id: 1,
    date: "21/10/2026",
    days: 1,
    reason: "Nghỉ ốm",
    status: "Đã duyệt",
  },
  {
    id: 2,
    date: "15/10/2026",
    days: 0.5,
    reason: "Việc cá nhân",
    status: "Đã duyệt",
  },
  {
    id: 3,
    date: "08/10/2026",
    days: 2,
    reason: "Nghỉ phép năm",
    status: "Đã duyệt",
  },
  {
    id: 4,
    date: "30/09/2026",
    days: 1,
    reason: "Nghỉ ốm",
    status: "Từ chối",
  },
  {
    id: 5,
    date: "18/09/2026",
    days: 1,
    reason: "Việc gia đình",
    status: "Đang chờ duyệt",
  },
  {
    id: 6,
    date: "05/09/2026",
    days: 0.5,
    reason: "Việc cá nhân",
    status: "Đã duyệt",
  },
  {
    id: 6,
    date: "05/09/2026",
    days: 0.5,
    reason: "Việc cá nhân",
    status: "Đã duyệt",
  },
  {
    id: 6,
    date: "05/09/2026",
    days: 0.5,
    reason: "Việc cá nhân",
    status: "Đã duyệt",
  },
  {
    id: 6,
    date: "05/09/2026",
    days: 0.5,
    reason: "Việc cá nhân",
    status: "Đã duyệt",
  },
  {
    id: 6,
    date: "05/09/2026",
    days: 0.5,
    reason: "Việc cá nhân",
    status: "Đã duyệt",
  },
  {
    id: 6,
    date: "05/09/2026",
    days: 0.5,
    reason: "Việc cá nhân",
    status: "Đã duyệt",
  },
  {
    id: 6,
    date: "05/09/2026",
    days: 0.5,
    reason: "Việc cá nhân",
    status: "Đã duyệt",
  }
];

const attendanceDays = new Set([
  "2026-10-01",
  "2026-10-02",
  "2026-10-05",
  "2026-10-06",
  "2026-10-07",
  "2026-10-09",
  "2026-10-12",
  "2026-10-13",
  "2026-10-14",
  "2026-10-16",
  "2026-10-19",
  "2026-10-20",
  "2026-10-22",
  "2026-10-23",
  "2026-10-26",
  "2026-10-27",
  "2026-10-28",
  "2026-10-29",
  "2026-10-30",
]);

const leaveDays = new Set(["2026-10-08", "2026-10-15", "2026-10-21"]);

const monthNames = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

// Calendar
function getCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const mondayFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const days = [];

  for (let index = mondayFirstDay - 1; index >= 0; index -= 1) {
    days.push({
      date: daysInPreviousMonth - index,
      isCurrentMonth: false,
      key: `${year}-${month}-${daysInPreviousMonth - index}`,
    });
  }

  for (let date = 1; date <= daysInMonth; date += 1) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      date,
    ).padStart(2, "0")}`;
    days.push({ date, dateKey, isCurrentMonth: true, key: dateKey });
  }

  let nextMonthDate = 1;
  while (days.length < 42) {
    days.push({
      date: nextMonthDate,
      isCurrentMonth: false,
      key: `${year}-${month + 2}-${nextMonthDate}`,
    });
    nextMonthDate += 1;
  }

  return days;
}

function DonNghiPhepE() {
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 9, 1));
  const calendarDays = useMemo(
    () => getCalendarDays(calendarDate),
    [calendarDate],
  );

  const changeMonth = (amount) => {
    setCalendarDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + amount, 1),
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-[#4154F1] text-2xl font-semibold mb-4">
          Đơn nghỉ phép
        </p>
        <button className="bg-[#4154F1] text-white hover:bg-blue-500   rounded-md px-2">
          + Tạo đơn nghỉ phép
        </button>
      </div>

      <div className="flex justify-between mt-4 gap-2">
        <div className="flex justify-between w-[25%] h-20 bg-white px-4 py-2 font-semibold rounded-md">
          <p className="text-lg">Tổng phép</p>
          <p className="flex items-end text-2xl">12</p>
        </div>
        <div className="flex justify-between w-[25%] h-20 bg-white px-4 py-2 font-semibold rounded-md">
          <p className="text-lg">Đã dùng</p>
          <p className="flex items-end text-2xl">3</p>
        </div>
        <div className="flex justify-between w-[25%] h-20 bg-white px-4 py-2 font-semibold rounded-md">
          <p className="text-lg">Còn lại</p>
          <p className="flex items-end text-2xl">9</p>
        </div>
        <div className="flex justify-between w-[25%] h-20 bg-white px-4 py-2 font-semibold rounded-md">
          <p className="text-lg">Chờ duyệt</p>
          <p className="flex items-end text-2xl">0</p>
        </div>
      </div>

      <div className="flex mt-4 gap-2">
        <div className="flex-[2] h-[400px] overflow-y-scroll rounded-md">
          <table className="bg-white text-center rounded-md w-full">
            <thead>
              <tr className="bg-[#F6F6FE] border-b-2">
                <td className="p-2">STT</td>
                <td>Ngày</td>
                <td className="p-2">Số ngày</td>
                <td className="p-2">Lý do nghỉ</td>
                <td className="p-2">Trạng thái</td>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((data) => {
                return (
                  <tr className="border-b-2">
                    <td className="p-2">{data.id}</td>
                    <td className="p-2">{data.date}</td>
                    <td className="p-2">{data.days}</td>
                    <td className="p-2">{data.reason}</td>
                    <td className="p-2">{data.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <section className="flex-[1] bg-white rounded-md p-4 min-w-[310px]">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="p-1 rounded hover:bg-[#F0F1FF] text-gray-600"
              aria-label="Tháng trước"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-semibold text-lg text-[#2D3748]">
              {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
            </h2>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="p-1 rounded hover:bg-[#F0F1FF] text-gray-600"
              aria-label="Tháng sau"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const status = day.dateKey
                ? leaveDays.has(day.dateKey)
                  ? "leave"
                  : attendanceDays.has(day.dateKey)
                    ? "attendance"
                    : ""
                : "";

              return (
                <div
                  key={day.key}
                  className={`relative flex h-10 items-center justify-center rounded-md text-sm ${
                    day.isCurrentMonth ? "text-gray-700" : "text-gray-300"
                  } ${
                    status === "leave"
                      ? "bg-red-50 text-red-600 font-semibold"
                      : status === "attendance"
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "hover:bg-gray-50"
                  }`}
                  title={
                    status === "leave"
                      ? "Ngày nghỉ phép"
                      : status === "attendance"
                        ? "Đã chấm công"
                        : undefined
                  }
                >
                  {day.date}
                  {status && (
                    <span
                      className={`absolute bottom-1 h-1 w-1 rounded-full ${
                        status === "leave" ? "bg-red-500" : "bg-green-500"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t mt-4 pt-3 space-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span>Đã chấm công</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span>Ngày nghỉ phép</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DonNghiPhepE;
