/**
 * Login Page for SCI-SA Gala
 * Simple placeholder for authentication
 */

/**
 * Login component - placeholder for authentication
 * @returns {JSX.Element} - Login page component
 */
export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            SCI-SA Gala
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <div className="card">
          <div className="text-center">
            <div className="mb-4">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Authentication Required
            </h3>
            
            <p className="text-sm text-gray-600 mb-6">
              TODO: Implement authentication form here
            </p>
            
            <div className="space-y-4">
              <div className="text-xs text-gray-500">
                <p>For development/testing:</p>
                <p>• Mock session will be loaded automatically</p>
                <p>• Change role in mockData.js to test different access levels</p>
              </div>
              
              <button
                onClick={() => window.location.reload()}
                className="btn-primary w-full"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500">
          <p>TODO: Connect to backend authentication system</p>
          <p>TODO: Add environment variables for API configuration</p>
        </div>
      </div>
    </div>
  );
}
