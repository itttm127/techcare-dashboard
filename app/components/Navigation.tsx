'use client';

import Image from 'next/image';

export default function Navigation() {
  const navItems = [
    { icon: '/assets/imgs/svgs/material-icons/home_FILL0_wght300_GRAD0_opsz24.svg', label: 'Overview', active: false },
    { icon: '/assets/imgs/svgs/material-icons/group_FILL0_wght300_GRAD0_opsz24.svg', label: 'Patients', active: true },
    { icon: '/assets/imgs/svgs/material-icons/calendar_today_FILL0_wght300_GRAD0_opsz24.svg', label: 'Schedule', active: false },
    { icon: '/assets/imgs/svgs/material-icons/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg', label: 'Message', active: false },
    { icon: '/assets/imgs/svgs/material-icons/credit_card_FILL0_wght300_GRAD0_opsz24.svg', label: 'Transactions', active: false },
  ];

  return (
    <div className="sticky top-[0px] z-10 bg-[#F6F7F8] pt-[18px] mt-[-18px] rounded-b-[40px]">
      <nav className="bg-white shadow-sm rounded-[70px] h-[72px]">
        <div className="flex items-center justify-between px-[16px] md:px-[32px] py-[12px] h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image 
              src="/assets/imgs/svgs/logos/TestLogo.svg" 
              alt="Tech.Care Logo" 
              width={211} 
              height={48}
              className="w-[120px] md:w-[211px] h-auto"
              priority
            />
          </div>

          {/* Navigation Links - Hidden on mobile, visible on tablet+ */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center space-x-2 font-bold text-[12px] xl:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] py-[12px] px-[8px] xl:px-[16px] rounded-[41px] transition-opacity ${
                  item.active 
                    ? 'bg-[#01F0D0] hover:opacity-90' 
                    : 'hover:opacity-80'
                }`}
              >
                <Image 
                  src={item.icon} 
                  alt={item.label} 
                  width={20} 
                  height={20}
                  className="w-4 h-4 xl:w-5 xl:h-5"
                />
                <span className="hidden xl:inline">{item.label}</span>
              </a>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-[8px] md:space-x-[12px]">
            <div className="hidden md:flex items-center gap-2">
              <Image
                src="/assets/imgs/doctors/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png"
                alt="Dr. Jose Simmons"
                width={44}
                height={44}
                className="w-[36px] md:w-[44px] h-[36px] md:h-[44px] rounded-full object-cover"
              />
              <div className="text-left hidden lg:block">
                <p className="font-bold text-[12px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px]">
                  Dr. Jose Simmons
                </p>
                <p className="font-normal text-[12px] md:text-[14px] leading-[19px] text-[#707070] font-['Manrope'] tracking-[0px]">
                  General Practitioner
                </p>
              </div>
            </div>
            <div className="hidden md:block w-[1px] h-[44px] bg-[#EDEDED]"></div>
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <Image
                src="/assets/imgs/svgs/material-icons/settings_FILL0_wght300_GRAD0_opsz24.svg"
                alt="Settings"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </button>
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <Image
                src="/assets/imgs/svgs/material-icons/more_vert_FILL0_wght300_GRAD0_opsz24.svg"
                alt="More"
                width={20}
                height={20}
                className="h-4 md:h-5"
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

