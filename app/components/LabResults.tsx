'use client';

import Image from 'next/image';
import { Patient } from '../types/patient';

interface LabResultsProps {
  patient: Patient | null;
}

export default function LabResults({ patient }: LabResultsProps) {
  const labResults = patient?.lab_results || [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-[16px] md:p-[20px]">
      <h2 className="font-extrabold text-[20px] md:text-[24px] leading-[33px] text-[#072635] font-['Manrope'] tracking-[0px] mb-4">
        Lab Results
      </h2>
      <div className="h-[200px] overflow-y-auto custom-scrollbar">
        {labResults.length === 0 ? (
          <div className="px-[20px] py-3 text-center text-gray-500 text-[13px]">
            No lab results available
          </div>
        ) : (
          labResults.map((result, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-[#F6F7F8] active:bg-[#F6F7F8] rounded-lg cursor-pointer"
            >
              <span className="font-normal text-[12px] md:text-[13px] leading-[18px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                {result}
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <Image
                  src="/assets/imgs/svgs/material-icons/download_FILL0_wght300_GRAD0_opsz24 (1).svg"
                  alt="Download"
                  width={20}
                  height={20}
                  className="w-4 md:w-5 h-4 md:h-5"
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

