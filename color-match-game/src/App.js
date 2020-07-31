import React from 'react';
import './App.css';

let _ = require('lodash');

const colors = ['black', 'blue', 'red', 'green', 'yellow'];

const randomColors = () => {
  const meaningWord = _.sample(colors);
  const inkWord = _.sample(colors);
  const inkColor = Math.random() < 0.3 ? meaningWord : _.sample(colors);
  
  return {
    meaningWord,
    inkWord,
    inkColor,
    meaningInkMatch: meaningWord === inkColor,
  };
};

class App extends React.Component {
  state = {
    gameStatus: 'playing',
    score: 0
  };

  colorValues = randomColors();

  handleClick = (yesClick) => {
    this.setState((prevState) => {
      if (prevState.gameStatus !== 'playing') {
        return null;
      }
      const correctClick = 
        (this.colorValues.meaningInkMatch ^ yesClick) === 0;
      return { 
        gameStatus: correctClick ? 'correct' : 'wrong', 
        score: correctClick ? this.state.score+1 : this.state.score-1
      };
    }, this.resetGameAfterDelay);
  };

  resetGameAfterDelay = () => {
    setTimeout(() => {
      this.colorValues = randomColors();
      this.setState({ gameStatus: 'playing' });
    }, 1000);
  };
  render() {
    const {
      meaningWord,
      inkWord,
      inkColor,
    } = this.colorValues;
    const { gameStatus } = this.state;
    const { score } = this.state;
    const grade = Math.random();

    return (
      (grade >= 0.5) ?
        <>
          <div className="game">
            <div className="help">Does the meaning of the TOP word match the ink color of the BOTTOM word?</div>
            <div className="body">
              <div className={`game-status status-${gameStatus}`} />
              <div className="score">Score: {score}</div>
              <div className="meaning">
                {meaningWord.toUpperCase()}
              </div>
              <div className="ink" style={{ color: inkColor }}>
                {inkWord.toUpperCase()}
              </div>
              <div className="buttons">
                <button onClick={() => this.handleClick(true)}>
                  YES
                </button>
                <button onClick={() => this.handleClick(false)}>
                  NO
                </button>
              </div>
            </div>
          </div>
        </>
      :
        <>
          <div className="game">
            <div className="help">Does the meaning of the BOTTOM word match the ink color of the TOP word?</div>
            <div className="body">
              <div className={`game-status status-${gameStatus}`} />
              <div className="score">Score: {score}</div>         
              <div className="ink" style={{ color: inkColor }}>
                {inkWord.toUpperCase()}
              </div>
              <div className="meaning">
                {meaningWord.toUpperCase()}
              </div>
              <div className="buttons">
                <button onClick={() => this.handleClick(true)}>
                  YES
                </button>
                <button onClick={() => this.handleClick(false)}>
                  NO
                </button>
              </div>
            </div>
          </div>
        </>
    );
  }
}

export default App;
