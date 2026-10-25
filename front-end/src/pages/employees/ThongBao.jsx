import { Filter, Bell, X } from "lucide-react";
import { useState } from "react";

function ThongBao() {
  const [close, setClose] = useState(false);
  const [all, setAll] = useState(true);

  return (
    <>
      <div className="flex justify-between">
        <p className="text-[#4154F1] text-2xl font-semibold mb-4">Thông báo</p>
      </div>

      <div className="w-[75%] ml-auto mr-auto">
        {/* Bộ lọc */}
        <div className="flex items-center h-12 bg-white rounded p-2">
          <Filter></Filter>
          <div
            className={`${all ? "bg-gray-300" : ""} rounded-3xl cursor-pointer px-4 ml-6`}
            onClick={() => setAll(true)}
          >
            Tất cả
          </div>
          <div
            className={`ml-2 rounded-3xl cursor-pointer px-4 ${all ? "" : "bg-gray-300"}`}
            onClick={() => setAll(false)}
          >
            Chưa đọc
          </div>
        </div>

        {/* Khung thông báo */}
        <div className="bg-white mt-4 p-2 rounded">
          {/* Hang 1 */}
          <div
            className="flex items-center w-full border-b-2 cursor-pointer"
            onClick={() => setClose(true)}
          >
            <div className="p-2 bg-blue-300 inline-block rounded-full">
              <Bell size={19} color="blue"></Bell>
            </div>
            <div className="w-full flex justify-between ml-2">
              <div className="p-2">
                Cập nhật mới hệ thống chấm công<br></br>
                <p className="italic opacity-60 text-sm">
                  Thông báo về việc cập nhật lại hệ thống chấm công ....
                </p>
              </div>
              <div className="p-2 flex items-center">
                <p className="italic opacity-60">5 phút trước</p>
                <span className="inline-block w-2 h-2 ml-2 rounded-full bg-blue-500"></span>
              </div>
            </div>
          </div>
          {/* Hang 2 */}
          {all && (
            <>
              <div className="flex items-center w-full border-b-2">
                <div className="p-2 bg-blue-300 inline-block rounded-full">
                  <Bell size={19} color="blue"></Bell>
                </div>
                <div className="w-full flex justify-between ml-2">
                  <div className="p-2">
                    Cập nhật mới hệ thống chấm công<br></br>
                    <p className="italic opacity-60 text-sm">
                      Thông báo về việc cập nhật lại hệ thống chấm công ....
                    </p>
                  </div>
                  <div className="p-2 flex items-center">
                    <p className="italic opacity-60">5 phút trước</p>
                    {/* <span className="inline-block w-2 h-2 ml-2 rounded-full bg-blue-500"></span> */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal thông báo chi tiết */}

        {close && (
          <>
            <div
              className="fixed bg-black bg-opacity-10 inset-0 z-40"
              onClick={() => setClose(false)}
            ></div>

            <div className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-4 z-50 w-[50%] border rounded">
              <button className="float-right" onClick={() => setClose(false)}>
                <X></X>
              </button>
              <p className="text-center font-semibold text-xl">Thông báo</p>
              <div className="mt-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus tempore corporis sapiente ab laudantium repudiandae
                  consectetur inventore asperiores sequi expedita delectus
                  incidunt quibusdam dolorem assumenda maiores necessitatibus,
                  veritatis omnis ut?
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ThongBao;
