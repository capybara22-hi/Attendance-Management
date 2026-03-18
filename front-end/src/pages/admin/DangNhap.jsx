import user from "@/assets/logo/user.svg";
import lock from "@/assets/logo/lock.svg";
import google from "@/assets/logo/google.svg";
import DangKy from "./DangKy";


function DangNhap() {
    return (
        <>
            <div className="bg-[#F0F4FB] flex min-h-screen text-gray-900">
                <div className="bg-blue-500 h-[100vh] w-[60%]"></div>
                <div className="flex justify-center items-center w-[40%]">
                    <div className="flex flex-col w-[65%] border-2 p-4">
                        <p className="text-center font-bold text-[28px] mb-4">Đăng nhập</p>
                        <div className="flex items-center rounded-md bg-white p-4 mt-4">
                            <img src={user} alt="" className="w-6 h-6 mr-2" />
                            <input type="text" className="outline-none w-[90%]" placeholder="Tên đăng nhập hoặc email" />
                        </div>
                        <div className="flex items-center rounded-md bg-white p-4 mt-3 mb-2">
                            <img src={lock} alt="" className="w-6 h-6 mr-2" />
                            <input type="password" className="outline-none w-[90%]" placeholder="Mật khẩu" />
                        </div>
                        <div className="flex justify-between text-[14px]">
                            <div className="flex items-center">
                                <input type="checkbox" name="" id="" />
                                <p className="ml-1 opacity-60">Ghi nhớ đăng nhập</p>
                            </div>
                            <a href="" className="text-[#4d4def] font-semibold">Quên mật khẩu</a>
                        </div>
                        <button type="button" className="p-4 bg-[#4d4def] w-full rounded-md text-white mt-5 mb-2">Đăng nhập</button>
                        <div className="text-[14px]"> <span className="opacity-60">Chưa có tài khoản? </span><a href="" className="text-[#4d4def] font-semibold">Đăng ký</a></div>
                        <p className="text-center my-4 opacity-60">Hoặc</p>
                        <button type="button" className="flex items-center justify-center p-4 w-full border-2 rounded-md font-semibold">
                            <img src={google} alt="" className="w-6 h-6 mr-2" />Đăng nhập bằng Google
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DangNhap;