import { FaRoute, FaUserSlash } from 'react-icons/fa';

export default function RouteList({ routes, drivers, assignDriver, unassignDriver }) {
  const getDriverName = (driverId) => {
    if (!driverId) return null;
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Unknown Driver';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Driver</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {routes.map(route => (
              <tr key={route.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaRoute className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{route.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.startLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.endLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.distance}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {route.assignedDriver ? (
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {getDriverName(route.assignedDriver)}
                      </div>
                      <button
                        onClick={() => unassignDriver(route.id)}
                        className="mt-1 text-xs text-red-600 hover:text-red-900"
                      >
                        Unassign
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <FaUserSlash className="mr-1" /> Unassigned
                      </span>
                      <div className="mt-2">
                        <select
                          onChange={(e) => assignDriver(route.id, parseInt(e.target.value))}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                          defaultValue=""
                        >
                          <option value="" disabled>Assign Driver</option>
                          {drivers
                            .filter(driver => driver.availability)
                            .map(driver => (
                              <option key={driver.id} value={driver.id}>{driver.name}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {routes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No routes found
        </div>
      )}
    </div>
  );
}