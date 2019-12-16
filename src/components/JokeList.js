/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JokeList.css';

import Joke from './Joke';

const JokeList = () => {
  const [jokeList, setJokeList] = useState(JSON.parse(localStorage.getItem('jokes')) || []);
  const [isLoading, setIsLoading] = useState(false);

  let jokeIdSet;

  const getJokes = async (numJokes = 10) => {
    try {
      setIsLoading(true);

      const jokes = [];
      while (jokes.length < numJokes) {
        const {
          data: { id, joke },
        } = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' },
        });
        if (!jokeIdSet.has(id)) {
          jokeIdSet.add(id);
          jokes.push({ id, joke, votes: 0 });
        }
      }

      setJokeList([...jokeList, ...jokes]);
      setIsLoading(false);
      localStorage.setItem('jokes', JSON.stringify(jokeList));
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    jokeIdSet = new Set(
      jokeList.map(joke => {
        return joke.id;
      })
    );
    if (jokeList.length === 0) {
      getJokes(10);
    }
  }, [jokeList]);

  const handleVote = (jokeId, vote) => {
    const prevSt = jokeList.map(joke => {
      return joke.id === jokeId ? { ...joke, votes: joke.votes + vote } : joke;
    });

    setJokeList(prevSt);
    localStorage.setItem('jokes', JSON.stringify(jokeList));
  };

  const handleMouseEnter = e => {
    const emoji = e.target;
    emoji.classList.add('rubberBand');
    setTimeout(() => {
      emoji.classList.remove('rubberBand');
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="JokeList__spinner">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1 className="JokeList__title">Loading...</h1>
      </div>
    );
  }

  const jokes = jokeList
    .sort((a, b) => {
      return b.votes - a.votes;
    })
    .map(joke => {
      return <Joke {...joke} key={joke.id} handleVote={handleVote} />;
    });

  return (
    <div className="JokeList">
      <div className="JokeList__sidebar">
        <h1 className="JokeList__title">
          <span>Dad</span> Jokes
        </h1>

        <img
          onMouseEnter={handleMouseEnter}
          className="animated"
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          alt="Laughing Emoji"
        />

        <button
          type="button"
          onClick={() => {
            return getJokes();
          }}
          className="JokeList__getMore-btn"
        >
          <span>New</span> Jokes
        </button>
      </div>

      <div className="JokeList__jokes">{jokes}</div>
    </div>
  );
};

export default JokeList;
