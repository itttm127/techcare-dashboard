'use client';

import Image from 'next/image';
import { Patient } from '../types/patient';

interface PatientSidebarProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
}

export default function PatientSidebar({ patients, selectedPatient, onSelectPatient }: PatientSidebarProps) {

  const getGenderAndAge = (patient: Patient): string => {
    const gender = patient.gender || 'Unknown';
    // Use age from API if available, otherwise calculate from date_of_birth
    const age = patient.age !== undefined 
      ? patient.age 
      : (patient.date_of_birth 
          ? new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()
          : 'N/A');
    return `${gender}, ${age}`;
  };

  return (
    <aside className="w-full lg:w-80 h-[calc(100vh-18px-72px-32px-32px)] bg-white rounded-[16px] flex flex-col sticky top-[calc(18px+72px+32px)]">
      <div className="p-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-[20px] md:text-[24px] leading-[33px] text-[#072635] font-['Manrope'] tracking-[0px]">
            Patients
          </h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Image
              src="/assets/imgs/svgs/material-icons/search_FILL0_wght300_GRAD0_opsz24.svg"
              alt="Search"
              width={18}
              height={18}
              className="w-[18px] h-[18px]"
            />
          </button>
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar mt-[20px]">
        <div>
          {patients.map((patient) => {
            const isSelected = selectedPatient?.name === patient.name;
            return (
              <div
                key={patient.name}
                onClick={() => onSelectPatient(patient)}
                className={`px-[20px] py-3 rounded-lg cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-[12px]">
                    <Image
                      src={patient.profile_picture || ''}
                      alt={patient.name}
                      width={48}
                      height={48}
                      className="w-[40px] md:w-[48px] h-[40px] md:h-[48px] rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px]">
                        {patient.name}
                      </p>
                      <p className="font-normal text-[13px] md:text-[14px] leading-[19px] text-[#707070] font-['Manrope'] tracking-[0px]">
                        {getGenderAndAge(patient)}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Image
                      src="/assets/imgs/svgs/material-icons/more_horiz_FILL0_wght300_GRAD0_opsz24.svg"
                      alt="More"
                      width={18}
                      height={4}
                      className="w-[18px] h-[4px]"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

