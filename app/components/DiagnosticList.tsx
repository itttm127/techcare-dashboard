'use client';

import { Patient } from '../types/patient';

interface DiagnosticListProps {
  patient: Patient | null;
}

export default function DiagnosticList({ patient }: DiagnosticListProps) {
  const diagnostics = patient?.diagnostic_list || [];

  return (
    <div className="bg-white rounded-[16px] p-[16px] md:p-[20px]">
      <h2 className="font-extrabold text-[20px] md:text-[24px] leading-[33px] text-[#072635] font-['Manrope'] tracking-[0px] mb-[20px] md:mb-[40px]">
        Diagnostic List
      </h2>
      <div className="overflow-x-auto">
        <div className="h-[200px] md:h-[220px] overflow-y-auto custom-scrollbar">
          <table className="w-full min-w-[500px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#F6F7F8] rounded-[24px]">
                <th className="text-left py-3 px-4 font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] rounded-l-[24px]">
                  Problem/Diagnosis
                </th>
                <th className="text-left py-3 px-4 font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px]">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] rounded-r-[24px] w-[80px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {diagnostics.length === 0 ? (
                <tr className="border-b border-[#F6F7F8]">
                  <td colSpan={3} className="py-3 px-4 text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] font-normal text-center text-gray-500">
                    No diagnostics available
                  </td>
                </tr>
              ) : (
                diagnostics.map((diagnostic, index) => (
                  <tr key={index} className="border-b border-[#F6F7F8]">
                    <td className="py-3 px-4 text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] font-normal">
                      {diagnostic.name || 'Unknown'}
                    </td>
                    <td className="py-3 px-4 text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] font-normal">
                      {diagnostic.description || ''}
                    </td>
                    <td className="py-3 px-4 text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] font-normal">
                      {diagnostic.status || 'Active'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

