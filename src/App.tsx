import React, { useState } from 'react';
import PokemonsList from './components/PokemonsList';
import PokemonPage from './components/PokemonPage';

function App() {
  const [currentPage, setCurrentPage] = useState('list'); // "list" или "details"
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const goToDetailsPage = (id) => {
    setSelectedPokemonId(id);
    setCurrentPage('details');
  };

  const goToListPage = () => {
    setCurrentPage('list');
    setSelectedPokemonId(null);
  };

  return (
    <div>
      {currentPage === 'list' && <PokemonsList onSelectPokemon={goToDetailsPage} />}
      {currentPage === 'details' && <PokemonPage id={selectedPokemonId} onBack={goToListPage} />}
    </div>
  );
}

export default App;
