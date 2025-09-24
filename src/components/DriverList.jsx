import { FaUserCheck, FaUserTimes } from 'react-icons/fa';

export default function DriverList({ drivers, routes, unassignDriver }) {
  const getAssignedRoute = (driverId) => {
    return routes.find(route => route.assignedDriver === driverId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Route</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drivers.map(driver => {
              const assignedRoute = getAssignedRoute(driver.id);
              return (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-800 font-medium">{driver.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.licenseNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {driver.availability ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <FaUserCheck className="mr-1" /> Available
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <FaUserTimes className="mr-1" /> Unavailable
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignedRoute ? (
                      <div>
                        <div className="font-medium">{assignedRoute.name}</div>
                        <button
                          onClick={() => unassignDriver(assignedRoute.id)}
                          className="mt-1 text-xs text-red-600 hover:text-red-900"
                        >
                          Unassign
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not assigned</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {drivers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No drivers found
        </div>
      )}
    </div>
  );
}