import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

function PokemonPage({ id, onBack }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axiosClient.get(`pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных покемона:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <button onClick={onBack}>Назад</button>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Высота: {pokemon.height}</p>
      <p>Вес: {pokemon.weight}</p>
      <p>Опыт: {pokemon.base_experience}</p>
      <h2>Умения:</h2>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2>Статистика:</h2>
      <ul>
        {pokemon.stats.map((stat, index) => (
          <li key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonPage;
