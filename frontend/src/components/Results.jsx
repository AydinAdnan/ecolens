import React from 'react';

function Results({ results, processedImage }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Detection Results:</h2>
      {results.error ? (
        <p className="text-red-500">{results.error}</p>
      ) : (
        <>
          <ul className="list-disc list-inside mb-4">
            {results.map((object, index) => (
              <li key={index} className="text-gray-700">{object}</li>
            ))}
          </ul>
          {processedImage && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Processed Image:</h3>
              <img src={`data:image/jpeg;base64,${processedImage}`} alt="Processed" className="max-w-full h-auto" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Results;