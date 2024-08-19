import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import LoadingScreen from './components/LoadingScreen';
import ResultsModal from './components/ResultsModal';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setResults(null);
    setProcessedImage(null);
  };

  React.useEffect(() => {
    if (results && processedImage) {
      setShowModal(true);
    }
  }, [results, processedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold mb-5 text-center text-gray-800">Waste Detection</h1>
          <ImageUpload setResults={setResults} setLoading={setLoading} setProcessedImage={setProcessedImage} />
        </div>
      </div>
      {loading && <LoadingScreen />}
      {showModal && (
        <ResultsModal
          results={results}
          processedImage={processedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;