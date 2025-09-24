export const STORAGE_KEY = 'driver-scheduling-data-v1';
export const loadData = () => {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return null; return JSON.parse(raw); } catch (e) { console.error('loadData error', e); return null; }
}
export const saveData = (data) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { console.error('saveData error', e); } }
