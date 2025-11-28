import { Patient } from '../types/patient';

const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const USERNAME = 'coalition';
const PASSWORD = 'skills-test';

function getAuthToken(): string {
  return btoa(`${USERNAME}:${PASSWORD}`);
}

export async function fetchPatientsData(): Promise<Patient[]> {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    throw error;
  }
}

export function formatDateOfBirth(dateOfBirth: string | undefined): string {
  if (!dateOfBirth) return 'N/A';
  try {
    if (dateOfBirth.includes('/')) {
      const [month, day, year] = dateOfBirth.split('/');
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
    }
    const date = new Date(dateOfBirth);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  } catch {
    return dateOfBirth;
  }
}

export function formatChartDate(month: string, year: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = months.findIndex(m => m.toLowerCase() === month.toLowerCase().substring(0, 3));
  return monthIndex >= 0 ? `${months[monthIndex]}, ${year}` : `${month}, ${year}`;
}

