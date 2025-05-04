import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import Logo from '../components/Logo';
import { useLoginMutation } from '../store/services/api';
import { ToastContext } from '../components/Layout';
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUserState } = useAuth();

  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { addToast } = useContext(ToastContext);

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []); // Empty dependency array since we only want to check once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login({
        identifier: email,
        password: password
      }).unwrap();

      // Store the JWT token and user data
      localStorage.setItem('token', response.jwt);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUserState(response.user);

      addToast('Login successful!', 'success');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
      addToast('Invalid email or password', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-700 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-neutral-900 font-['Playfair_Display']">
            AADF Procurement
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Sign in to access the procurement management platform
          </p>
        </div>
        
        {error && (
          <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded">
            <p className="text-error-700">{error}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 block w-full py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="admin@aadf.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 block w-full py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md
                text-white font-medium bg-primary-600 hover:bg-primary-700 focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-primary-400 group-hover:text-primary-300" />
              </span>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm text-neutral-500 mt-4">
          <p>Or{' '}
            <button
              onClick={() => navigate('/vendors/tenders')}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              view available tenders
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;