'use client';

import Image from 'next/image';
import { Patient } from '../types/patient';
import { formatDateOfBirth } from '../lib/api';

interface PatientProfileProps {
  patient: Patient | null;
}

const patientImages: { [key: string]: string } = {
  'Emily Williams': '/assets/imgs/patients/Layer 8.png',
  'Ryan Johnson': '/assets/imgs/patients/Layer 1.png',
  'Brandon Mitchell': '/assets/imgs/patients/Layer 3.png',
  'Jessica Taylor': '/assets/imgs/patients/Layer 2.png',
  'Samantha Johnson': '/assets/imgs/patients/Layer 6.png',
  'Ashley Martinez': '/assets/imgs/patients/Layer 12.png',
  'Olivia Brown': '/assets/imgs/patients/Layer 10.png',
  'Tyler Davis': '/assets/imgs/patients/Layer 9.png',
  'Kevin Anderson': '/assets/imgs/patients/Layer 4.png',
  'Dylan Thompson': '/assets/imgs/patients/Layer 5.png',
  'Nathan Evans': '/assets/imgs/patients/Layer 7.png',
  'Mike Nolan': '/assets/imgs/patients/pexels-photo-1222271.png',
};

export default function PatientProfile({ patient }: PatientProfileProps) {
  const getPatientImage = (name: string): string => {
    return patientImages[name] || '/assets/imgs/patients/Layer 2.png';
  };

  if (!patient) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col items-center">
          <div className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] mb-[12px] rounded-full bg-gray-200"></div>
          <h3 className="font-extrabold text-[20px] md:text-[24px] leading-[33px] text-[#072635] font-['Manrope'] tracking-[0px] text-center p-[12px]">
            --- --- ---
          </h3>
          <div className="w-full space-y-6 py-[20px] text-center text-gray-400">
            Select a patient to view details
          </div>
        </div>
      </div>
    );
  }

  const genderIcon = patient.gender?.toLowerCase() === 'male'
    ? '/assets/imgs/svgs/icons/MaleIcon.svg'
    : '/assets/imgs/svgs/icons/FemaleIcon.svg';

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex flex-col items-center">
        <Image
          src={getPatientImage(patient.name)}
          alt="Patient Profile"
          width={200}
          height={200}
          className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] mb-[12px] rounded-full object-cover"
        />
        <h3 className="font-extrabold text-[20px] md:text-[24px] leading-[33px] text-[#072635] font-['Manrope'] tracking-[0px] text-center p-[12px]">
          {patient.name || '--- --- ---'}
        </h3>

        <div className="w-full space-y-4 md:space-y-6 py-[20px]">
          <div className="flex items-start space-x-3">
            <Image
              src="/assets/imgs/svgs/icons/BirthIcon.svg"
              alt="Date of Birth"
              width={42}
              height={42}
              className="w-[36px] md:w-[42px] h-[36px] md:h-[42px]"
            />
            <div>
              <p className="font-medium text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                Date of Birth
              </p>
              <p className="font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                {formatDateOfBirth(patient.date_of_birth)}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Image
              src={genderIcon}
              alt="Gender"
              width={42}
              height={42}
              className="w-[36px] md:w-[42px] h-[36px] md:h-[42px]"
            />
            <div>
              <p className="font-medium text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                Gender
              </p>
              <p className="font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                {patient.gender || '--- --- ---'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Image
              src="/assets/imgs/svgs/icons/PhoneIcon.svg"
              alt="Contact Info"
              width={42}
              height={42}
              className="w-[36px] md:w-[42px] h-[36px] md:h-[42px]"
            />
            <div>
              <p className="font-medium text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                Contact Info
              </p>
              <p className="font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                {patient.phone_number || '--- --- ---'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Image
              src="/assets/imgs/svgs/icons/PhoneIcon.svg"
              alt="Emergency Contacts"
              width={42}
              height={42}
              className="w-[36px] md:w-[42px] h-[36px] md:h-[42px]"
            />
            <div>
              <p className="font-medium text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                Emergency Contacts
              </p>
              <p className="font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                {patient.emergency_contact || '--- --- ---'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Image
              src="/assets/imgs/svgs/icons/InsuranceIcon.svg"
              alt="Insurance Provider"
              width={42}
              height={42}
              className="w-[36px] md:w-[42px] h-[36px] md:h-[42px]"
            />
            <div>
              <p className="font-medium text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                Insurance Provider
              </p>
              <p className="font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                {patient.insurance_type || '--- --- ---'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-[20px] mb-[8px]">
        <button className="w-full md:w-[220px] h-[41px] bg-[#01F0D0] rounded-[41px] font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] hover:bg-[#01D9C0] hover:shadow-md transition-all duration-200 cursor-pointer">
          Show All Information
        </button>
      </div>
    </div>
  );
}

