export const initialDrivers = [
  { id: 1, name: "John Smith", licenseNumber: "DL123456", phone: "555-1234", availability: true },
  { id: 2, name: "Sarah Johnson", licenseNumber: "DL789012", phone: "555-5678", availability: false },
  { id: 3, name: "Mike Williams", licenseNumber: "DL345678", phone: "555-9012", availability: true },
];

export const initialRoutes = [
  { id: 1, name: "Downtown Express", startLocation: "Main Station", endLocation: "City Center", distance: "15 km", assignedDriver: 1 },
  { id: 2, name: "Airport Shuttle", startLocation: "Central Hub", endLocation: "International Airport", distance: "30 km", assignedDriver: null },
  { id: 3, name: "Suburban Loop", startLocation: "North Terminal", endLocation: "South Terminal", distance: "20 km", assignedDriver: null },
];