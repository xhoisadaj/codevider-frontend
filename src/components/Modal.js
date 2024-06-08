// Modal.js
import React from 'react';

function Modal({ data, apiPath, setIsOpen }) {
  const handleClose = () => setIsOpen(false);

  const renderModalContent = () => {
    switch (apiPath) {
      case 'birds':
        return <BirdModal data={data} />;
      case 'cats':
        return <CatModal data={data} />;
      case 'dogs':
        return <DogModal data={data} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none">
        <div className="relative w-full max-w-3xl rounded-lg bg-gray-100 dark:bg-gray-800 p-10 text-gray-900 dark:text-gray-100">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 px-3 pb-2 text-2xl font-extrabold opacity-50 hover:rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 hover:opacity-100"
          >
            x
          </button>
          {renderModalContent()}
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
    </>
  );
}

function BirdModal({ data }) {
  return (
    <div className="text-left text-xl">
      <h1 className="mb-3 text-center text-3xl text-amber-600 font-semibold uppercase tracking-widest">
        {data.name}
      </h1>
      <p className="mb-3 font-medium italic">{data.description}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold text-amber-600">Species:</p>
          <p>{data.species}</p>
        </div>
        <div>
          <p className="font-bold text-amber-600">Family:</p>
          <p>{data.family}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold text-amber-600">Habitat:</p>
          <p>{data.habitat}</p>
        </div>
        <div>
          <p className="font-bold text-amber-600">Diet:</p>
          <p>{data.diet}</p>
        </div>
      </div>

      <p className="mt-4 text-center text-2xl font-semibold opacity-50">
        {data.weight_kg} kg | {data.wingspan_cm} cm
      </p>
    </div>
  );
}

function CatModal({ data }) {
  return (
    <div className="text-left text-xl">
      <h1 className="mb-3 text-center text-3xl text-amber-600 font-semibold uppercase tracking-widest">
        {data.name}
      </h1>
      <p className="mb-3 font-medium italic">{data.description}</p>

      <div>
        <p className="font-bold text-amber-600">Temperament:</p>
        <p>{data.temperament}</p>
      </div>
    </div>
  );
}

function DogModal({ data }) {
  return (
    <div className="text-left text-xl">
      <h1 className="mb-3 text-center text-3xl text-amber-600 font-semibold uppercase tracking-widest">
        {data.name}
      </h1>
      <p className="mb-3 font-medium italic">{data.description}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold text-amber-600">Lifespan:</p>
          <p>{data.lifespan}</p>
        </div>
        <div>
          <p className="font-bold text-amber-600">Breed group:</p>
          <p>{data.breed_group}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold text-amber-600">Size:</p>
          <p>{data.size}</p>
        </div>
        <div>
          <p className="font-bold text-amber-600">Colors:</p>
          <p>{data.colors.join(', ')}</p>
        </div>
      </div>

      <div>
        <p className="font-bold text-amber-600">Temperament:</p>
        <p>{data.temperament}</p>
      </div>
    </div>
  );
}

export default Modal;
