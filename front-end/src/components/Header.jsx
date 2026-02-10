import chuongLogo from '../assets/logo/chuong-white.svg';
import dayChuongLogo from '../assets/logo/day_chuong.svg';
import profile from '../assets/logo/profile.svg';

function Header() {
    return (
        <header className="h-[60px] w-full bg-[#4d4def]">
            <div className="flex justify-between h-full items-center ml-10 mr-10">
                <img src="https://olm.vn/images/logo-white.png?v=1769611025" alt="" className="h-10" />
                <div className="flex items-center ">
                    <div className='flex flex-col items-center'>
                        <img src={chuongLogo} alt="" />
                        <img src={dayChuongLogo} alt="" />
                    </div>
                    <div className='flex items-center ml-3'>
                        <img src={profile} alt="" />
                        <p className='ml-2 text-white'>Tuan</p>
                    </div>
                </div>
            </div >
        </header>
    )
}

export default Header;