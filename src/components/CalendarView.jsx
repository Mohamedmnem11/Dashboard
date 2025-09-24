import { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { FaCalendarAlt, FaUser, FaRoute } from 'react-icons/fa';

export default function CalendarView({ drivers, routes }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  
  const getDriverSchedule = (driverId) => {
    const driverRoutes = routes.filter(route => route.assignedDriver === driverId);
    return driverRoutes.length > 0 ? driverRoutes[0] : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <FaCalendarAlt className="mr-2" /> Driver Schedule Calendar
        </h2>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
            className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex-1 sm:flex-none"
          >
            Prev
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
          >
            Today
          </button>
          <button 
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
            className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex-1 sm:flex-none"
          >
            Next
          </button>
        </div>
      </div>
      
      {/* Calendar Grid Container */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Weekday Headers */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="p-2"></div>
            {days.map((day, index) => (
              <div key={index} className="p-2 text-center font-medium bg-gray-100 rounded-lg">
                <div className="text-sm md:text-base">{format(day, 'EEE')}</div>
                <div className={`text-sm mt-1 ${isSameDay(day, new Date()) ? 'bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto' : ''}`}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>
          
          {/* Driver Rows */}
          {drivers.map(driver => (
            <div key={driver.id} className="grid grid-cols-8 gap-1 mb-1">
              {/* Driver Info */}
              <div className="p-2 flex items-center bg-gray-50 rounded-lg">
                <div className="flex items-center min-w-0">
                  <FaUser className="text-gray-500 mr-2 flex-shrink-0" />
                  <span className="font-medium truncate text-sm md:text-base">{driver.name}</span>
                </div>
              </div>
              
              {/* Day Cells */}
              {days.map((day, dayIndex) => {
                const route = getDriverSchedule(driver.id);
                return (
                  <div key={dayIndex} className="p-2 border border-gray-100 rounded-lg min-h-[70px]">
                    {route ? (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 h-full flex flex-col">
                        <div className="font-medium truncate flex items-center text-sm">
                          <FaRoute className="mr-1 text-blue-500 flex-shrink-0" /> 
                          <span className="truncate">{route.name}</span>
                        </div>
                        <div className="text-xs mt-1 truncate">
                          {route.startLocation} → {route.endLocation}
                        </div>
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
    </div>
  );
}