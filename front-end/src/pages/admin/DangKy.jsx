import user from "@/assets/logo/user.svg";
import lock from "@/assets/logo/lock.svg";
import google from "@/assets/logo/google.svg";
import { useState } from "react";

function DangKy() {
    const [code, setCode] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const sendData = async () => {
        if (!code || !pass || !confirmPass) {
            setMessage('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (pass !== confirmPass) {
            setMessage('Mật khẩu không khớp!');
            return;
        }

        if (pass.length < 6) {
            setMessage('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/dangky`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employeeNo: code,
                    password: pass
                })
            })

            const data = await res.json();
            if (res.ok) {
                setMessage('Đăng ký thành công!');
                setCode('');
                setPass('');
                setConfirmPass('');
                setTimeout(() => window.location.href = '/dang-nhap', 2000);
            } else {
                setMessage(data.message || 'Đăng ký thất bại!');
            }
            console.log(data);
        } catch (error) {
            setMessage('Có lỗi xảy ra. Vui lòng thử lại!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

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
                            <h1 className="text-5xl font-bold mb-4">Hệ Thống Chấm Công</h1>
                            <p className="text-xl text-blue-100 mb-2">Quản lý nhân sự - Tăng hiệu suất</p>
                            <p className="text-blue-200">Công nghệ hiện đại - Quản lý thông minh</p>
                        </div>
                        {/* <div className="mt-12 space-y-6">
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                <p className="text-blue-100">Chấm công tự động - Tiết kiệm thời gian</p>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                <p className="text-blue-100">Báo cáo chi tiết - Dữ liệu chính xác</p>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                <p className="text-blue-100">Bảo mật cao - Thông tin an toàn</p>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="flex justify-center items-center lg:w-[45%] w-full p-4 sm:p-8">
                    <div className="w-full max-w-md">
                        {/* Card Container */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
                            {/* Header */}
                            <div className="mb-8 text-center">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Đăng Ký</h2>
                                <p className="text-gray-500 text-sm">Tạo tài khoản để sử dụng hệ thống chấm công</p>
                            </div>

                            {/* Message Alert */}
                            {message && (
                                <div className={`mb-5 p-3 rounded-lg text-sm font-medium text-center ${message.includes('thành công')
                                    ? 'bg-green-100 text-green-800 border border-green-300'
                                    : 'bg-red-100 text-red-800 border border-red-300'
                                    }`}>
                                    {message}
                                </div>
                            )}

                            {/* Form */}
                            <form className="space-y-5">
                                {/* Employee ID Input */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mã nhân viên</label>
                                    <div className="flex items-center rounded-lg bg-gray-50 border-2 border-gray-200 focus-within:border-blue-500 focus-within:bg-blue-50 transition-all duration-200">
                                        <img src={user} alt="user" className="w-5 h-5 ml-4 opacity-60" />
                                        <input
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
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
                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)}
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

                                {/* Confirm Password Input */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
                                    <div className="flex items-center rounded-lg bg-gray-50 border-2 border-gray-200 focus-within:border-blue-500 focus-within:bg-blue-50 transition-all duration-200">
                                        <img src={lock} alt="lock" className="w-5 h-5 ml-4 opacity-60" />
                                        <input
                                            type={isConfirmPasswordVisible ? "text" : "password"}
                                            value={confirmPass}
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                            className="outline-none w-full bg-transparent px-4 py-3 text-gray-900 placeholder-gray-500"
                                            placeholder="Xác nhận mật khẩu"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                            className="pr-4 opacity-60 hover:opacity-100 transition-opacity"
                                        >
                                            {isConfirmPasswordVisible ? "👁️" : "👁️‍🗨️"}
                                        </button>
                                    </div>
                                </div>

                                {/* Signup Button */}
                                <button
                                    type="button"
                                    onClick={sendData}
                                    disabled={loading}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg mt-8"
                                >
                                    {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                                </button>

                                {/* Login Link */}
                                <div className="text-center pt-4">
                                    <span className="text-gray-600 text-sm">Đã có tài khoản? </span>
                                    <a href="/dangnhap" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm">Đăng nhập</a>
                                </div>
                            </form>
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

export default DangKy;