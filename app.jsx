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

function Counter(props) {
    return(
        <div className="counter">
            <button className="counter-action decrement" > - </button>
            <div className="counter-score">
                {props.score}
            </div>
            <button className="counter-action increment" > + </button>
        </div>
    );
}

Counter.propTypes = {
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
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired
};

let Application = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            score: React.PropTypes.number.isRequired,
            id: React.PropTypes.number.isRequired,
        })).isRequired,
    },

    getInitialProps: function() {
        return {
            title: "Scoreboards",
        };
    },

    getInitialState: function() {
      return {
          players: this.props.initialPlayers,
      }
    },

    render: function() {
       return(
           <div className="scoreboard">
               <Header title={this.props.title}/>
               <div className="players">
                   {this.state.players.map(function(player) {
                       return <Player name={player.name} score={player.score} key={player.id}/>
                   })}
               </div>
           </div>
       );
    }
});

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));