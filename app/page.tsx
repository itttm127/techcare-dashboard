'use client';

import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import PatientSidebar from './components/PatientSidebar';
import DiagnosisHistory from './components/DiagnosisHistory';
import DiagnosticList from './components/DiagnosticList';
import PatientProfile from './components/PatientProfile';
import LabResults from './components/LabResults';
import { Patient } from './types/patient';
import { fetchPatientsData } from './lib/api';

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPatients() {
      try {
        setLoading(true);
        const data = await fetchPatientsData();
        setPatients(data);
        
        // Auto-select Jessica Taylor if available
        const jessicaTaylor = data.find(patient => patient.name === 'Jessica Taylor');
        if (jessicaTaylor) {
          setSelectedPatient(jessicaTaylor);
        } else if (data.length > 0) {
          setSelectedPatient(data[0]);
        }
      } catch (err) {
        setError('Failed to load patients. Please try again.');
        console.error('Error loading patients:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F6F7F8] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01F0D0] mx-auto mb-4"></div>
          <p className="text-[#072635] font-['Manrope']">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F6F7F8] min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 font-['Manrope']">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F7F8] min-h-screen">
      <div className="max-w-[1600px] mx-auto p-[12px] md:p-[18px] pt-0">
        <Navigation />

        <div className="flex flex-col lg:flex-row mt-[24px] md:mt-[32px] gap-[16px] md:gap-[32px]">
          {/* Left Sidebar - Patients List */}
          <div className="w-full lg:w-auto">
            <PatientSidebar
              patients={patients}
              selectedPatient={selectedPatient}
              onSelectPatient={setSelectedPatient}
            />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto custom-scrollbar mt-[0] lg:mt-[18px] mb-[12px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] md:gap-[32px]">
              {/* Middle Column */}
              <div className="lg:col-span-2 space-y-[24px] md:space-y-[32px]">
                <DiagnosisHistory patient={selectedPatient} />
                <DiagnosticList patient={selectedPatient} />
              </div>

              {/* Right Column */}
              <div className="space-y-[24px] md:space-y-[32px]">
                <PatientProfile patient={selectedPatient} />
                <LabResults patient={selectedPatient} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
