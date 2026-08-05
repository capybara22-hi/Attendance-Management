import chuongLogo from '../assets/logo/chuong-white.svg';
import dayChuongLogo from '../assets/logo/day_chuong.svg';
import profile from '../assets/logo/profile.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [showAccountModal, setShowAccountModal] = useState(false);
    const accountRef = useRef(null);

    const displayEmployeeNo = useMemo(() => {
        try {
            const rawUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
            if (!rawUser) return 'User';

            const user = JSON.parse(rawUser);
            return user?.employeeNo || 'User';
        } catch (error) {
            return 'User';
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth_user');
        sessionStorage.removeItem('auth_user');
        navigate('/dangnhap', { replace: true });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setShowAccountModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="h-[60px] w-full bg-[#4d4def]">
            <div className="flex justify-between h-full items-center ml-10 mr-10">
                <img src="https://olm.vn/images/logo-white.png?v=1769611025" alt="" className="h-10" />
                <div className="flex items-center ">
                    <div className='flex flex-col items-center'>
                        <img src={chuongLogo} alt="" />
                        <img src={dayChuongLogo} alt="" />
                    </div>
                    <div className='relative ml-3' ref={accountRef}>
                        <button
                            type="button"
                            onClick={() => setShowAccountModal((prev) => !prev)}
                            className='flex items-center rounded-md px-2 py-1 hover:bg-white/10'
                        >
                            <img src={profile} alt="" />
                            <p className='ml-2 text-white'>{displayEmployeeNo}</p>
                        </button>

                        {showAccountModal && (
                            <div className="absolute right-0 top-[46px] z-50 w-[220px] rounded-lg bg-white p-3 shadow-xl">
                                <p className="text-sm font-semibold text-gray-800">{displayEmployeeNo}</p>
                                <p className="mt-1 text-xs text-gray-500">Tài khoản đang đăng nhập</p>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="mt-3 w-full rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </header>
    )
}

export default Header;