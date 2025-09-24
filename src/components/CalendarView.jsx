import { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { FaCalendarAlt, FaUser, FaRoute } from 'react-icons/fa';

export default function CalendarView({ drivers, routes }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  
  const getDriverSchedule = (driverId) => {
    // In a real app, this would check the driver's schedule for the specific day
    // For this demo, we'll randomly assign some routes to drivers
    const driverRoutes = routes.filter(route => route.assignedDriver === driverId);
    return driverRoutes.length > 0 ? driverRoutes[0] : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <FaCalendarAlt className="mr-2" /> Driver Schedule Calendar
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Prev
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Today
          </button>
          <button 
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-8 gap-1">
        {/* Time column */}
        <div className="p-2"></div>
        
        {/* Day headers */}
        {days.map((day, index) => (
          <div key={index} className="p-2 text-center font-medium bg-gray-100 rounded">
            <div>{format(day, 'EEE')}</div>
            <div className={`text-sm ${isSameDay(day, new Date()) ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' : ''}`}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
        
        {/* Driver rows */}
        {drivers.map(driver => (
          <div key={driver.id} className="contents">
            <div className="p-2 flex items-center bg-gray-50 rounded">
              <FaUser className="text-gray-500 mr-2" />
              <span className="font-medium truncate">{driver.name}</span>
            </div>
            
            {days.map((day, dayIndex) => {
              const route = getDriverSchedule(driver.id, day);
              return (
                <div key={dayIndex} className="p-2 border border-gray-100 rounded min-h-16">
                  {route ? (
                    <div className="bg-blue-50 border border-blue-200 rounded p-1 text-xs">
                      <div className="font-medium truncate flex items-center">
                        <FaRoute className="mr-1 text-blue-500" /> {route.name}
                      </div>
                      <div className="truncate">{route.startLocation} → {route.endLocation}</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs flex items-center justify-center h-full">
                      {driver.availability ? 'Available' : 'Unavailable'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}