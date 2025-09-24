import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import DashboardPage from './pages/DashboardPage';
import DriversPage from './pages/DriversPage';
import RoutesPage from './pages/RoutesPage';
import CalendarPage from './pages/CalendarPage';
import { initialDrivers, initialRoutes } from './data/mockData';

function App() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [routes, setRoutes] = useState(initialRoutes);
  const [driverSearch, setDriverSearch] = useState('');
  const [routeSearch, setRouteSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addDriver = (driver) => {
    setDrivers([...drivers, driver]);
  };

  const addRoute = (route) => {
    setRoutes([...routes, route]);
  };

  const assignDriver = (routeId, driverId) => {
    setRoutes(routes.map(route => 
      route.id === routeId ? { ...route, assignedDriver: driverId } : route
    ));
  };

  const unassignDriver = (routeId) => {
    setRoutes(routes.map(route => 
      route.id === routeId ? { ...route, assignedDriver: null } : route
    ));
  };

  const getPageTitle = () => {
    const path = window.location.pathname;
    switch(path) {
      case '/': return 'Dashboard';
      case '/drivers': return 'Driver Management';
      case '/routes': return 'Route Management';
      case '/calendar': return 'Schedule Calendar';
      default: return 'Driver Scheduler';
    }
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="flex-1 overflow-auto">
          <MobileHeader toggleSidebar={toggleSidebar} title={getPageTitle()} />
          
          <div className="p-4 md:p-6">
            <Routes>
              <Route 
                path="/" 
                element={
                  <DashboardPage 
                    drivers={drivers}
                    routes={routes}
                    driverSearch={driverSearch}
                    setDriverSearch={setDriverSearch}
                    routeSearch={routeSearch}
                    setRouteSearch={setRouteSearch}
                  />
                } 
              />
              <Route 
                path="/drivers" 
                element={
                  <DriversPage 
                    drivers={drivers}
                    routes={routes}
                    addDriver={addDriver}
                    assignDriver={assignDriver}
                    unassignDriver={unassignDriver}
                  />
                } 
              />
              <Route 
                path="/routes" 
                element={
                  <RoutesPage 
                    drivers={drivers}
                    routes={routes}
                    addRoute={addRoute}
                    assignDriver={assignDriver}
                    unassignDriver={unassignDriver}
                  />
                } 
              />
              <Route 
                path="/calendar" 
                element={
                  <CalendarPage 
                    drivers={drivers}
                    routes={routes}
                  />
                } 
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;