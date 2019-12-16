/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './Joke.css';

const Joke = ({ id, joke, votes, handleVote }) => {
  const handleClick = e => {
    if (e.target.id === 'up') handleVote(id, 1);
    if (e.target.id === 'down') handleVote(id, -1);
  };

  const getColor = () => {
    if (votes >= 15) return '#4caf50';
    if (votes >= 12) return '#8bc34a';
    if (votes >= 9) return '#cddc39';
    if (votes >= 6) return '#ffeb3b';
    if (votes >= 3) return '#ffc107';
    if (votes >= 0) return '#ff9800';
    return '#f44336';
  };

  const getClassName = () => {
    if (votes >= 13) return 'rolling_on_the_floor_laughing';
    if (votes >= 10) return 'laughing';
    if (votes >= 8) return 'smiley';
    if (votes >= 4) return 'slightly_smiling_face';
    if (votes >= 2) return 'neutral_face';
    if (votes >= 0) return 'confused';
    return 'angry';
  };

  return (
    <div className="Joke">
      <div className="Joke__voting">
        <i className="fas fa-arrow-up" role="img" onKeyDown={handleClick} onClick={handleClick} id="up" />
        <span className="Joke__num-votes" style={{ borderColor: getColor() }}>
          {votes}
        </span>
        <i className="fas fa-arrow-down" role="img" onKeyDown={handleClick} onClick={handleClick} id="down" />
      </div>
      <p className="Joke__text">{joke}</p>
      <div className="Joke__emoji">
        <i className={`em em-${getClassName()}`} />
      </div>
    </div>
  );
};

export default Joke;
