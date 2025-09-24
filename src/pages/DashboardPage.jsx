import React from 'react';
import DriverList from '../components/DriverList';
import RouteList from '../components/RouteList';
import SearchBar from '../components/SearchBar';

const DashboardPage = ({ drivers, routes, driverSearch, setDriverSearch, routeSearch, setRouteSearch }) => {
  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(driverSearch.toLowerCase())
  );

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(routeSearch.toLowerCase()) ||
    route.startLocation.toLowerCase().includes(routeSearch.toLowerCase()) ||
    route.endLocation.toLowerCase().includes(routeSearch.toLowerCase())
  );

  return (
    <div className="p-0 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Drivers</h2>
          <SearchBar 
            placeholder="Search drivers..." 
            value={driverSearch}
            onChange={(e) => setDriverSearch(e.target.value)}
          />
          <DriverList 
            drivers={filteredDrivers} 
            routes={routes}
            assignDriver={() => {}}
            unassignDriver={() => {}}
            readOnly
          />
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Routes</h2>
          <SearchBar 
            placeholder="Search routes..." 
            value={routeSearch}
            onChange={(e) => setRouteSearch(e.target.value)}
          />
          <RouteList 
            routes={filteredRoutes} 
            drivers={drivers}
            assignDriver={() => {}}
            unassignDriver={() => {}}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;