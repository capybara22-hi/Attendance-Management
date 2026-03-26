import user from "@/assets/logo/user.svg";
import lock from "@/assets/logo/lock.svg";
import google from "@/assets/logo/google.svg";
import DangKy from "./DangKy";
import { useState } from "react";


function DangNhap() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <>
            <div className="bg-gradient-to-b from-[#F0F4FB] to-white flex min-h-screen text-gray-900">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-blue-600 to-blue-800 flex-col justify-center items-center p-12 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center text-white">
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold mb-4">Chào mừng bạn</h1>
                            <p className="text-xl text-blue-100 mb-2">Quản lý điểm danh nhân viên</p>
                            <p className="text-blue-200">Hệ thống hiệu quả - Công việc dễ dàng</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex justify-center items-center lg:w-[45%] w-full p-4 sm:p-8">
                    <div className="w-full max-w-md">
                        {/* Card Container */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
                            {/* Header */}
                            <div className="mb-10 text-center">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
                                <p className="text-gray-500 text-sm">Nhập thông tin để truy cập hệ thống</p>
                            </div>

                            {/* Form */}
                            <form className="space-y-5">
                                {/* Employee ID Input */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mã nhân viên</label>
                                    <div className="flex items-center rounded-lg bg-gray-50 border-2 border-gray-200 focus-within:border-blue-500 focus-within:bg-blue-50 transition-all duration-200">
                                        <img src={user} alt="user" className="w-5 h-5 ml-4 opacity-60" />
                                        <input
                                            type="text"
                                            className="outline-none w-full bg-transparent px-4 py-3 text-gray-900 placeholder-gray-500"
                                            placeholder="Nhập mã nhân viên"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                                    <div className="flex items-center rounded-lg bg-gray-50 border-2 border-gray-200 focus-within:border-blue-500 focus-within:bg-blue-50 transition-all duration-200">
                                        <img src={lock} alt="lock" className="w-5 h-5 ml-4 opacity-60" />
                                        <input
                                            type={isPasswordVisible ? "text" : "password"}
                                            className="outline-none w-full bg-transparent px-4 py-3 text-gray-900 placeholder-gray-500"
                                            placeholder="Nhập mật khẩu"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                            className="pr-4 opacity-60 hover:opacity-100 transition-opacity"
                                        >
                                            {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember & Forgot Password */}
                                <div className="flex justify-between items-center pt-2">
                                    <label className="flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Ghi nhớ đăng nhập</span>
                                    </label>
                                    <a href="" className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors">Quên mật khẩu?</a>
                                </div>

                                {/* Login Button */}
                                <button
                                    type="button"
                                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg mt-8"
                                >
                                    Đăng nhập
                                </button>

                                {/* Sign Up Link */}
                                <div className="text-center pt-4">
                                    <span className="text-gray-600 text-sm">Chưa có tài khoản? </span>
                                    <a href="/dangky" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm">Đăng ký</a>
                                </div>
                            </form>

                            {/* Divider */}
                            {/* <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-3 text-gray-500 text-sm">Hoặc</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div> */}

                            {/* Google Login */}
                            {/* <button 
                                type="button" 
                                className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <img src={google} alt="google" className="w-5 h-5" />
                                <span>Đăng nhập bằng Google</span>
                            </button> */}
                        </div>

                        {/* Footer Text */}
                        <p className="text-center text-gray-500 text-xs mt-6">
                            © 2026 OLM System. Mọi quyền được bảo lưu.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DangNhap;