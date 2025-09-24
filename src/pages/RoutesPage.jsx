import React, { useState } from 'react';
import RouteForm from '../components/RouteForm';
import RouteList from '../components/RouteList';
import SearchBar from '../components/SearchBar';

const RoutesPage = ({ drivers, routes, addRoute, assignDriver, unassignDriver }) => {
  const [routeSearch, setRouteSearch] = useState('');

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(routeSearch.toLowerCase()) ||
    route.startLocation.toLowerCase().includes(routeSearch.toLowerCase()) ||
    route.endLocation.toLowerCase().includes(routeSearch.toLowerCase())
  );

  return (
    <div className="p-0 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Route Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RouteForm addRoute={addRoute} />
        </div>
        
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Route List</h2>
          <SearchBar 
            placeholder="Search routes..." 
            value={routeSearch}
            onChange={(e) => setRouteSearch(e.target.value)}
          />
          <RouteList 
            routes={filteredRoutes} 
            drivers={drivers}
            assignDriver={assignDriver}
            unassignDriver={unassignDriver}
          />
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;