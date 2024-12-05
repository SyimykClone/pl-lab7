import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

function PokemonsList({ onSelectPokemon }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await axiosClient.get('pokemon?limit=50');
        setPokemons(response.data.results);
      } catch (error) {
        console.error('Ошибка при загрузке покемонов:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Список Покемонов</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <button onClick={() => onSelectPokemon(index + 1)}>{pokemon.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonsList;
