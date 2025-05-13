import { FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';


const AdminProfile = () => {
  const [auth] = useAuth();

  const admin = {
    name: auth?.user?.userName || 'Admin',
    email: auth?.user?.email || 'Not available',
    role: auth?.user?.role || 'Administrator',
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 flex items-center justify-center py-10 px-4">
      <div className="bg-[#1f1f1f] shadow-xl rounded-3xl overflow-hidden w-full max-w-2xl text-white">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#00000070] to-gray-300 h-32 relative">
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <FaUserShield className="text-white bg-indigo-600 p-3 rounded-full shadow-lg" size={80} />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 px-6 pb-10 text-center">
          <h2 className="text-2xl font-bold text-white">{admin.name}</h2>
          <p className="text-sm text-gray-400 mb-2">{admin.email}</p>
          <span className="inline-block bg-indigo-900 text-indigo-300 text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            {admin.role}
          </span>

          {/* Admin Info */}
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold text-indigo-300 mb-2">Admin Details</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>🔐 Access Level: Full</li>
              <li>📅 Joined: January 2023</li>
              <li>⚙️ Settings: Enabled</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
