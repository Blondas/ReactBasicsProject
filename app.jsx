function Header(props) {
  return(
      <div className="header">
        <h1>{props.title}</h1>
      </div>
  );
}

Header.PropTypes = {
  title: React.PropTypes.string.isRequired,
};

function Counter(props) {
  return(
      <div className="counter">
        <button className="counter-action decrement"> - </button>
        <div className="counter-score">
            {props.score}
        </div>
        <button className="counter-action increment"> + </button>
      </div>
  );
}

Counter.PropsTypes = {
  score: React.PropTypes.number.isRequired
};

function Player(props) {
  return(
      <div className="player">
        <div className="player-name">
            {props.name}
        </div>
        <div className="player-score">
          <Counter score={props.score}/>
        </div>
      </div>
  );
}

Player.PropTypes = {
  name: React.PropTypes.string.isRequired
};

function Application(props) {
    return(
        <div className="scoreboard">
          <Header title={props.title}/>
          <div className="players">
            <Player name="Sebastian Kustosz" score={1}/>
            <Player name="Krzysiek Nowakowski" score={2}/>
          </div>
        </div>
    );
}

Application.propTypes = {
  title: React.PropTypes.string,
};

Application.defaultProps = {
  title: "Scoreboards",
};

ReactDOM.render(<Application />, document.getElementById('container'));