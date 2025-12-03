import { useState } from 'react';

const Sidebar = ({ screens, selected, onSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userEmail = localStorage.getItem('userEmail') || 'User';
  const userRole = localStorage.getItem('userRole') || 'User';
  const customerId = localStorage.getItem('customerId') || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('customerId');
    window.location.href = '/login';
  };

  return (
    <div className={`bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">FlowBit</h2>
                  <p className="text-xs text-gray-400">Multi-Tenant Platform</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {userEmail.charAt(0).toUpperCase()}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userEmail}</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 capitalize">{userRole}</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-400">{customerId}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        {!isCollapsed && (
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Available Screens
          </h3>
        )}
        <ul className="space-y-1">
          {screens.map((screen) => (
            <li key={screen}>
              <button
                className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  selected === screen 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => onSelect(screen)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 flex items-center justify-center ${
                    selected === screen ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}>
                    {screen === 'support' && (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                      </svg>
                    )}
                    {screen === 'tickets' && (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  {!isCollapsed && (
                    <span>{screen.charAt(0).toUpperCase() + screen.slice(1)}</span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>Status</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Tenant: {customerId}
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 group flex items-center space-x-3"
        >
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
  