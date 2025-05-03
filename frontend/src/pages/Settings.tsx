import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, Key, Bell, Shield, Save, CreditCard, 
  Users, UserPlus, UserMinus, Upload, X
} from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
            
            <div className="mb-8">
              <div className="flex items-center">
                <div className="mr-6">
                  <div className="relative">
                    <img 
                      src={profileImage || user?.avatar || 'https://i.pravatar.cc/150'} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary-100"
                    />
                    <label 
                      htmlFor="profile-image" 
                      className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full cursor-pointer border-2 border-white"
                    >
                      <Upload className="h-4 w-4" />
                      <input
                        type="file"
                        id="profile-image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleProfileImage}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium">{user?.name}</h3>
                  <p className="text-neutral-500">{user?.role}</p>
                </div>
              </div>
            </div>
            
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      defaultValue="Admin"
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      defaultValue="User"
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={user?.email}
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-neutral-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    defaultValue="Procurement Manager"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-6 mb-6">
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Key className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Key className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>
            
            <div className="space-y-6">
              <div className="p-5 border border-neutral-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="email-notifications" className="text-lg font-medium text-neutral-700">
                      Email Notifications
                    </label>
                    <p className="text-neutral-500 mt-1">
                      Receive email notifications for tender updates, submissions, and evaluation process changes.
                    </p>
                    <div className="mt-3 ml-6 space-y-3">
                      <div className="flex items-center">
                        <input
                          id="new-tenders"
                          name="new-tenders"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor="new-tenders" className="ml-2 text-sm text-neutral-700">
                          New tenders publication
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="tender-deadlines"
                          name="tender-deadlines"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor="tender-deadlines" className="ml-2 text-sm text-neutral-700">
                          Tender deadline reminders
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="submission-notifications"
                          name="submission-notifications"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor="submission-notifications" className="ml-2 text-sm text-neutral-700">
                          New submission notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="evaluation-updates"
                          name="evaluation-updates"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor="evaluation-updates" className="ml-2 text-sm text-neutral-700">
                          Evaluation process updates
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 border border-neutral-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      id="browser-notifications"
                      name="browser-notifications"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="browser-notifications" className="text-lg font-medium text-neutral-700">
                      Browser Notifications
                    </label>
                    <p className="text-neutral-500 mt-1">
                      Receive browser push notifications for immediate alerts while you're using the platform.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 border border-neutral-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      id="digest-notifications"
                      name="digest-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="digest-notifications" className="text-lg font-medium text-neutral-700">
                      Weekly Digest
                    </label>
                    <p className="text-neutral-500 mt-1">
                      Receive a weekly summary of all procurement activities.
                    </p>
                    <div className="mt-3">
                      <label htmlFor="digest-day" className="block text-sm font-medium text-neutral-700">
                        Preferred day
                      </label>
                      <select
                        id="digest-day"
                        name="digest-day"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      >
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                type="button" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Bell className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </button>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div className="p-5 border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-medium text-neutral-700 mb-3">Two-Factor Authentication</h3>
                <p className="text-neutral-500 mb-4">
                  Add an extra layer of security to your account. We'll send you a code to verify your identity when you sign in.
                </p>
                <button 
                  type="button" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Enable Two-Factor Authentication
                </button>
              </div>
              
              <div className="p-5 border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-medium text-neutral-700 mb-3">Login History</h3>
                <p className="text-neutral-500 mb-4">
                  Recent login activities on your account.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          IP Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Location
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          May 8, 2025 9:23 AM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          192.168.1.1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          Chrome on Windows
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          Tirana, Albania
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          May 7, 2025 2:15 PM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          192.168.1.1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          Chrome on Windows
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          Tirana, Albania
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          May 5, 2025 11:05 AM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          192.168.1.1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          Chrome on Windows
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          Tirana, Albania
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="p-5 border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-medium text-neutral-700 mb-3">API Access</h3>
                <p className="text-neutral-500 mb-4">
                  Manage API keys for programmatic access to the platform.
                </p>
                <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-md">
                  <div>
                    <span className="font-medium text-neutral-700">Primary API Key</span>
                    <div className="flex items-center mt-1">
                      <input
                        type="password"
                        value="••••••••••••••••••••••••••••••"
                        readOnly
                        className="text-sm text-neutral-500 bg-transparent border-none focus:ring-0 p-0"
                      />
                      <button 
                        type="button"
                        className="ml-2 text-primary-600 hover:text-primary-700 text-sm"
                      >
                        Show
                      </button>
                    </div>
                  </div>
                  <div>
                    <button 
                      type="button" 
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold heading-underline mb-2">Settings</h1>
        <p className="text-neutral-600">
          Manage your account preferences and system settings
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white shadow-sm rounded-lg border border-neutral-200 overflow-hidden">
            <div className="p-4 border-b border-neutral-200">
              <h2 className="text-lg font-medium text-neutral-800">Settings</h2>
            </div>
            <nav className="space-y-1 p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <User className={`mr-3 h-5 w-5 ${
                  activeTab === 'profile' ? 'text-primary-500' : 'text-neutral-400'
                }`} />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Bell className={`mr-3 h-5 w-5 ${
                  activeTab === 'notifications' ? 'text-primary-500' : 'text-neutral-400'
                }`} />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'security'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Shield className={`mr-3 h-5 w-5 ${
                  activeTab === 'security' ? 'text-primary-500' : 'text-neutral-400'
                }`} />
                Security
              </button>
            </nav>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white shadow-sm rounded-lg border border-neutral-200 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;