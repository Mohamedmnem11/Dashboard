import React, { useState } from 'react';
import DriverForm from '../components/DriverForm';
import DriverList from '../components/DriverList';
import SearchBar from '../components/SearchBar';

const DriversPage = ({ drivers, routes, addDriver, assignDriver, unassignDriver }) => {
  const [driverSearch, setDriverSearch] = useState('');

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(driverSearch.toLowerCase())
  );

  return (
    <div className="p-0 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Driver Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DriverForm addDriver={addDriver} />
        </div>
        
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Driver List</h2>
          <SearchBar 
            placeholder="Search drivers..." 
            value={driverSearch}
            onChange={(e) => setDriverSearch(e.target.value)}
          />
          <DriverList 
            drivers={filteredDrivers} 
            routes={routes}
            assignDriver={assignDriver}
            unassignDriver={unassignDriver}
          />
        </div>
      </div>
    </div>
  );
};

export default DriversPage;