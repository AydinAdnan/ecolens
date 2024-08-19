import React from 'react';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative p-8 bg-white rounded-lg shadow-xl">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-center text-xl font-semibold">Analyzing image...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;