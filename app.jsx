let PLAYERS = [
    {
      name: "Sebastian Kustosz",
      score: 2,
      id: 1,
    },
    {
      name: "Krzysztof Nowakowski",
      score: 3,
      id: 2,
    },
    {
        name: "Ola Domańska",
        score: 13,
        id: 3,
    },
    {
        name: "Szpon",
        score: 666,
        id: 4,
    }
];

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

let Counter = React.createClass({
  propTypes: {
      initialScore: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      score: this.props.initialScore,
    };
  },

  incrementScore: function(e) {
    this.setState({
        score: ++this.state.score
    });
  },

  decrementScore: function() {
    this.setState({
        scoure: --this.state.score
    });
  },

  render: function () {
      return(
          <div className="counter">
            <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
            <div className="counter-score">
                {this.state.score}
            </div>
            <button className="counter-action increment" onClick={this.incrementScore}> + </button>
          </div>
      );
  }
});


function Player(props) {
  return(
      <div className="player">
        <div className="player-name">
            {props.name}
        </div>
        <div className="player-score">
          <Counter initialScore={props.score}/>
        </div>
      </div>
  );
}

Player.PropTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired
};

function Application(props) {
    return(
        <div className="scoreboard">
          <Header title={props.title}/>
          <div className="players">
              {props.players.map(function(player) {
                return <Player name={player.name} score={player.score} key={player.id}/>
              })}
          </div>
        </div>
    );
}

Application.propTypes = {
  title: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired,
  })).isRequired,
};

Application.defaultProps = {
  title: "Scoreboards",
};

ReactDOM.render(<Application players={PLAYERS}/>, document.getElementById('container'));