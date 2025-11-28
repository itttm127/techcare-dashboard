'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Image from 'next/image';
import { Patient } from '../types/patient';
import { formatChartDate } from '../lib/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DiagnosisHistoryProps {
  patient: Patient | null;
}

export default function DiagnosisHistory({ patient }: DiagnosisHistoryProps) {
  const chartRef = useRef<ChartJS<'line'>>(null);

  const getBloodPressureData = () => {
    if (!patient?.diagnosis_history || !Array.isArray(patient.diagnosis_history)) {
      return { labels: [], systolicData: [], diastolicData: [] };
    }

    const diagnosisHistory = patient.diagnosis_history;
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    const bloodPressureData = diagnosisHistory
      .filter(item => item.blood_pressure?.systolic?.value && item.blood_pressure?.diastolic?.value)
      .map(item => ({
        month: item.month,
        year: item.year,
        systolic: item.blood_pressure!.systolic.value,
        diastolic: item.blood_pressure!.diastolic.value
      }))
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return months.indexOf(a.month) - months.indexOf(b.month);
      });

    if (bloodPressureData.length === 0) {
      return { labels: [], systolicData: [], diastolicData: [] };
    }

    const recentData = bloodPressureData.slice(-6);
    const labels = recentData.map(item => formatChartDate(item.month, item.year));
    const systolicData = recentData.map(item => item.systolic);
    const diastolicData = recentData.map(item => item.diastolic);

    return { labels, systolicData, diastolicData };
  };

  const { labels, systolicData, diastolicData } = getBloodPressureData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: systolicData,
        borderColor: '#C26EB4',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#E66FD2',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 0,
        borderWidth: 2
      },
      {
        label: 'Diastolic',
        data: diastolicData,
        borderColor: '#7E6CAB',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#7E6CAB',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 0,
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          color: '#072635',
          font: {
            size: 12
          }
        },
        grid: {
          color: '#E5E7EB',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          color: '#072635',
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        cubicInterpolationMode: 'monotone' as const
      }
    }
  };

  const getBloodPressureValues = () => {
    if (!patient?.diagnosis_history || patient.diagnosis_history.length === 0) {
      return {
        systolic: { value: 0, levels: 'Normal', arrow: 'none' },
        diastolic: { value: 0, levels: 'Normal', arrow: 'none' }
      };
    }

    const firstItem = patient.diagnosis_history[0];
    const systolic = firstItem.blood_pressure?.systolic?.value || 0;
    const diastolic = firstItem.blood_pressure?.diastolic?.value || 0;
    const systolicLevels = firstItem.blood_pressure?.systolic?.levels || 'Normal';
    const diastolicLevels = firstItem.blood_pressure?.diastolic?.levels || 'Normal';

    const getArrow = (levels: string) => {
      if (levels?.toLowerCase().includes('higher')) return 'up';
      if (levels?.toLowerCase().includes('lower')) return 'down';
      return 'none';
    };

    return {
      systolic: { value: systolic, levels: systolicLevels, arrow: getArrow(systolicLevels) },
      diastolic: { value: diastolic, levels: diastolicLevels, arrow: getArrow(diastolicLevels) }
    };
  };

  const getVitalSigns = () => {
    if (!patient?.diagnosis_history || patient.diagnosis_history.length === 0) {
      return {
        respiratoryRate: { value: 0, levels: 'Normal' },
        temperature: { value: 0, levels: 'Normal' },
        heartRate: { value: 0, levels: 'Normal', arrow: 'none' }
      };
    }

    const firstItem = patient.diagnosis_history[0];
    const respiratoryRate = firstItem.respiratory_rate?.value || 0;
    const respiratoryRateLevels = firstItem.respiratory_rate?.levels || 'Normal';
    const temperature = firstItem.temperature?.value || 0;
    const temperatureLevels = firstItem.temperature?.levels || 'Normal';
    const heartRate = firstItem.heart_rate?.value || 0;
    const heartRateLevels = firstItem.heart_rate?.levels || 'Normal';

    const getArrow = (levels: string) => {
      if (levels?.toLowerCase().includes('higher')) return 'up';
      if (levels?.toLowerCase().includes('lower')) return 'down';
      return 'none';
    };

    return {
      respiratoryRate: { value: respiratoryRate, levels: respiratoryRateLevels },
      temperature: { value: temperature, levels: temperatureLevels },
      heartRate: { value: heartRate, levels: heartRateLevels, arrow: getArrow(heartRateLevels) }
    };
  };

  const bpValues = getBloodPressureValues();
  const vitalSigns = getVitalSigns();

  return (
    <div className="bg-white rounded-lg shadow-sm p-[16px] md:p-[20px]">
      <h2 className="font-extrabold text-[20px] md:text-[24px] leading-[33px] text-[#072635] font-['Manrope'] tracking-[0px] mb-4">
        Diagnosis History
      </h2>

      {/* Blood Pressure Chart */}
      <div className="mb-6 mt-[20px] md:mt-[40px] bg-[#F4F0FE] rounded-[12px] p-[12px] md:p-[16px]">
        <div className="flex flex-col lg:flex-row gap-[16px]">
          <div className="flex flex-col flex-1 gap-[16px] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[16px] md:text-[18px] leading-[24px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                Blood Pressure
              </h3>
              <div className="flex items-center gap-[16px]">
                <span className="font-normal text-[12px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] text-right">
                  Last 6 months
                </span>
                <Image
                  src="/assets/imgs/svgs/material-icons/expand_more_FILL0_wght300_GRAD0_opsz24.svg"
                  alt="Expand"
                  width={11}
                  height={6}
                  className="w-[11px] h-[6px]"
                />
              </div>
            </div>
            <div className="h-[180px] md:h-[220px]">
              {labels.length > 0 ? (
                <Line ref={chartRef} data={chartData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No data available
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[16px] min-w-[180px] md:min-w-[208px]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-[14px] h-[14px] rounded-full bg-[#E66FD2] border border-white"></div>
                <p className="font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                  Systolic
                </p>
              </div>
              <div>
                <p className="font-bold text-[20px] md:text-[22px] leading-[30px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                  {bpValues.systolic.value || 'N/A'}
                </p>
                <div className="flex items-center gap-2">
                  {bpValues.systolic.arrow !== 'none' && (
                    <Image
                      src={`/assets/imgs/svgs/icons/Arrow${bpValues.systolic.arrow === 'up' ? 'Up' : 'Down'}.svg`}
                      alt={bpValues.systolic.arrow === 'up' ? 'Arrow Up' : 'Arrow Down'}
                      width={10}
                      height={5}
                      className="w-[10px] h-[5px]"
                    />
                  )}
                  <p className="font-normal text-[12px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px]">
                    {bpValues.systolic.levels}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-[#CBC8D4] my-2"></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-[14px] h-[14px] rounded-full bg-[#8C6FE6] border border-white"></div>
                <p className="font-bold text-[13px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                  Diastolic
                </p>
              </div>
              <div>
                <p className="font-bold text-[20px] md:text-[22px] leading-[30px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize">
                  {bpValues.diastolic.value || 'N/A'}
                </p>
                <div className="flex items-center gap-2">
                  {bpValues.diastolic.arrow !== 'none' && (
                    <Image
                      src={`/assets/imgs/svgs/icons/Arrow${bpValues.diastolic.arrow === 'up' ? 'Up' : 'Down'}.svg`}
                      alt={bpValues.diastolic.arrow === 'up' ? 'Arrow Up' : 'Arrow Down'}
                      width={10}
                      height={5}
                      className="w-[10px] h-[5px]"
                    />
                  )}
                  <p className="font-normal text-[12px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px]">
                    {bpValues.diastolic.levels}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vital Signs Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[21px]">
        <div className="flex flex-col justify-between bg-[#E0F3FA] rounded-[12px] p-4 h-[200px] md:h-[242px] gap-[16px]">
          <div className="flex items-center justify-between">
            <Image
              src="/assets/imgs/svgs/icons/respiratory rate.svg"
              alt="Respiratory Rate"
              width={96}
              height={96}
              className="w-[80px] md:w-[96px] h-[80px] md:h-[96px]"
            />
          </div>
          <div>
            <p className="font-medium text-[14px] md:text-[16px] leading-[22px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize mb-1">
              Respiratory Rate
            </p>
            <p className="font-extrabold text-[24px] md:text-[30px] leading-[41px] text-[#072635] font-['Manrope'] tracking-[0px]">
              {vitalSigns.respiratoryRate.value || 'N/A'} bpm
            </p>
          </div>
          <p className="font-normal text-[12px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px]">
            {vitalSigns.respiratoryRate.levels}
          </p>
        </div>

        <div className="flex flex-col justify-between bg-[#FFE6E9] rounded-[12px] p-4 h-[200px] md:h-[242px] gap-[16px]">
          <div className="flex items-center justify-between">
            <Image
              src="/assets/imgs/svgs/icons/temperature.svg"
              alt="Temperature"
              width={96}
              height={96}
              className="w-[80px] md:w-[96px] h-[80px] md:h-[96px]"
            />
          </div>
          <div>
            <p className="font-medium text-[14px] md:text-[16px] leading-[22px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize mb-1">
              Temperature
            </p>
            <p className="font-extrabold text-[24px] md:text-[30px] leading-[41px] text-[#072635] font-['Manrope'] tracking-[0px]">
              {vitalSigns.temperature.value || 'N/A'}°F
            </p>
          </div>
          <p className="font-normal text-[12px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px]">
            {vitalSigns.temperature.levels}
          </p>
        </div>

        <div className="flex flex-col justify-between bg-[#FFE6F1] rounded-[12px] p-4 h-[200px] md:h-[242px] gap-[16px] sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <Image
              src="/assets/imgs/svgs/icons/HeartBPM.svg"
              alt="Heart Rate"
              width={96}
              height={96}
              className="w-[80px] md:w-[96px] h-[80px] md:h-[96px]"
            />
          </div>
          <div>
            <p className="font-medium text-[14px] md:text-[16px] leading-[22px] text-[#072635] font-['Manrope'] tracking-[0px] capitalize mb-1">
              Heart Rate
            </p>
            <p className="font-extrabold text-[24px] md:text-[30px] leading-[41px] text-[#072635] font-['Manrope'] tracking-[0px]">
              {vitalSigns.heartRate.value || 'N/A'} bpm
            </p>
          </div>
          <div className="flex items-center gap-2">
            {vitalSigns.heartRate.arrow !== 'none' && (
              <Image
                src={`/assets/imgs/svgs/icons/Arrow${vitalSigns.heartRate.arrow === 'up' ? 'Up' : 'Down'}.svg`}
                alt={vitalSigns.heartRate.arrow === 'up' ? 'Arrow Up' : 'Arrow Down'}
                width={10}
                height={5}
                className="w-[10px] h-[5px]"
              />
            )}
            <p className="font-normal text-[12px] md:text-[14px] leading-[19px] text-[#072635] font-['Manrope'] tracking-[0px]">
              {vitalSigns.heartRate.levels}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

