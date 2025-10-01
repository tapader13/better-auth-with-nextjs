'use client';
import { signUp, SocialLogin } from '@/lib/actions/auth-action';
import { authClient } from '@/lib/auth-client';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session, isPending: isLoadingSession } =
    authClient.useSession();

  useEffect(() => {
    if (!isLoadingSession && session) {
      // Redirect only after session is loaded
      router.push('/dashboard');
    }
  }, [isLoadingSession, session, router]);

  console.log('Sign Up Session:', session);

  if (isLoadingSession) return <p>Loading...</p>; // optional loading state
  if (session) return null; // don't render form if redirecting
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    try {
      console.log('Sign Up Data:', { ...formData, agreeToTerms });
      const result = await signUp(
        formData.email,
        formData.password,
        formData.username
      );
      console.log('Sign Up Result:', result);
      if (!result.user) {
        throw new Error('Failed to sign up');
      }
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: string) => {
    console.log(`Signing in with ${provider}`);
    await SocialLogin(provider);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        {/* Header */}
        <div className='text-center'>
          <div className='mx-auto h-12 w-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center'>
            <svg
              className='w-6 h-6 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
              />
            </svg>
          </div>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Create your account
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Already have an account?{' '}
            <a
              href='/signin'
              className='font-medium text-green-600 hover:text-green-500 transition-colors'
            >
              Sign in here
            </a>
          </p>
        </div>

        {/* Social Sign Up Buttons */}
        <div className='mt-8'>
          <div className='grid grid-cols-2 gap-3'>
            <button
              onClick={() => handleSocialSignUp('google')}
              className='w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialSignUp('github')}
              className='w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              <svg
                className='w-5 h-5 mr-2'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
              GitHub
            </button>
          </div>

          <div className='mt-6 relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-green-50 text-gray-500'>
                Or sign up with email
              </span>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <form
          className='mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-200'
          onSubmit={handleSubmit}
        >
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Username
              </label>
              <input
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                required
                value={formData.username}
                onChange={handleChange}
                className='appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors'
                placeholder='Choose a username'
              />
              <p className='mt-1 text-xs text-gray-500'>
                This will be your public display name
              </p>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                value={formData.email}
                onChange={handleChange}
                className='appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='new-password'
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className='appearance-none relative block w-full px-4 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors'
                  placeholder='Create a strong password'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? (
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L7.59 7.59m9.832 9.832l-2.121 2.121M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  ) : (
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className='mt-2'>
                <div className='flex space-x-2'>
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 h-1 rounded-full ${
                        formData.password.length >= level * 3
                          ? level <= 2
                            ? 'bg-red-400'
                            : level === 3
                            ? 'bg-yellow-400'
                            : 'bg-green-400'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className='mt-1 text-xs text-gray-500'>
                  {formData.password.length < 6
                    ? 'Weak'
                    : formData.password.length < 9
                    ? 'Good'
                    : 'Strong'}{' '}
                  password
                </p>
              </div>
            </div>
          </div>

          <div className='flex items-center'>
            <input
              id='agree-terms'
              name='agree-terms'
              type='checkbox'
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className='h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
              required
            />
            <label
              htmlFor='agree-terms'
              className='ml-2 block text-sm text-gray-700'
            >
              I agree to the{' '}
              <a
                href='/terms'
                className='text-green-600 hover:text-green-500 font-medium'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='text-green-600 hover:text-green-500 font-medium'
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading || !agreeToTerms}
              className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md'
            >
              {isLoading ? (
                <div className='flex items-center'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                'Create your account'
              )}
            </button>
          </div>

          {/* Benefits Section */}
          <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
            <h4 className='text-sm font-medium text-blue-900 mb-2'>
              Join our community and get:
            </h4>
            <ul className='text-xs text-blue-700 space-y-1'>
              <li className='flex items-center'>
                <svg
                  className='w-4 h-4 mr-2 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                Access to all features
              </li>
              <li className='flex items-center'>
                <svg
                  className='w-4 h-4 mr-2 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                Personalized dashboard
              </li>
              <li className='flex items-center'>
                <svg
                  className='w-4 h-4 mr-2 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                24/7 customer support
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
