import React from 'react';

function ResultsModal({ results, processedImage, onClose }) {
  const categorizeWaste = (objects) => {
    const categories = {
      recyclable: ['plastic', 'metal', 'glass', 'paper', 'cardboard'],
      biodegradable: ['food', 'wood', 'leaf', 'plant'],
      ewaste: ['electronic', 'battery', 'computer', 'phone']
    };

    const foundCategories = new Set();
    objects.forEach(obj => {
      for (const [category, items] of Object.entries(categories)) {
        if (items.some(item => obj.toLowerCase().includes(item))) {
          foundCategories.add(category);
        }
      }
    });

    return Array.from(foundCategories);
  };

  const getMessageForCategory = (category) => {
    switch (category) {
      case 'recyclable':
        return "These items can be recycled. Remember, recycling helps conserve natural resources and reduce pollution!";
      case 'biodegradable':
        return "These items are biodegradable. Composting them can enrich soil and reduce landfill waste!";
      case 'ewaste':
        return "This is e-waste. Proper disposal of electronic waste is crucial for protecting our environment and health.";
      default:
        return "Please dispose of waste responsibly to keep our environment clean and healthy!";
    }
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Every action counts! Your effort to properly manage waste makes a difference.",
      "Be the change you wish to see in the world. Start with proper waste management!",
      "A clean environment is a happy environment. Thank you for doing your part!",
      "Small steps lead to big changes. Your waste management efforts matter!",
      "Together, we can create a cleaner, greener future. Keep up the good work!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const wasteCategories = categorizeWaste(results);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative p-8 bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Detection Results</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Detected Objects:</h3>
          <ul className="list-disc list-inside mb-4">
            {results.map((object, index) => (
              <li key={index} className="text-gray-700">{object}</li>
            ))}
          </ul>
          {wasteCategories.map((category, index) => (
            <p key={index} className="text-sm text-gray-600 mb-2">
              {getMessageForCategory(category)}
            </p>
          ))}
          <p className="text-sm font-semibold text-green-600 mt-4">{getMotivationalQuote()}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Processed Image:</h3>
          <img
            src={`data:image/jpeg;base64,${processedImage}`}
            alt="Processed"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default ResultsModal;