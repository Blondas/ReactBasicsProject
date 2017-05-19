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

let StopWatch = React.createClass({
   render: function() {
       return (
           <div className="stopwatch">
               <h2>Stopwatch</h2>
               <div className="stopwatch-time">0</div>
               <button>Start</button>
               <button>Reset</button>
           </div>
       );
   }
});

///////////////////////////////////
let AddPlayerForm = React.createClass({
    propTypes: {
      onAdd: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
      return {
          name: "",
      }
    },

    onNameChange: function(e) {
        this.setState({name: e.target.value});
    },

    onSubmit: function(e) {
        e.preventDefault();
        this.props.onAdd(this.state.name);
        this.setState({name: ""});
    },

    render: function() {
        return (
            <div className="add-player-form">
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.name} onChange={this.onNameChange}/>
                    <input type="submit" value="Add Player"/>
                </form>
            </div>
        )
    }
});


////////////////////////////////
function Stats(props) {
  let totalPlayers = props.players.length;
  let totalPloints = props.players.reduce(function(total, player) {
      return total + player.score;
  }, 0);

    return (
        <table className="stats">
            <tbody>
                <tr>
                    <td>Players:</td>
                    <td>{totalPlayers}</td>
                </tr>
                <tr>
                    <td>Total Points:</td>
                    <td>{totalPloints}</td>
                </tr>
            </tbody>
        </table>
    )
}

Stats.propTypes = {
    players: React.PropTypes.array.isRequired,
};


//////////////////////////
function Header(props) {
  return(
      <div className="header">
          <Stats players={props.players}/>
        <h1>{props.title}</h1>
          <StopWatch/>
      </div>
  );
}

Header.PropTypes = {
    title: React.PropTypes.string.isRequired,
    players: React.PropTypes.array.isRequired
};
///////////////////////////////////////
function Counter(props) {
    return(
        <div className="counter">
            <button className="counter-action decrement" onClick={function() {props.onChange(-1);}} > - </button>
            <div className="counter-score">
                {props.score}
            </div>
            <button className="counter-action increment" onClick={function() {props.onChange(1); }} > + </button>
        </div>
    );
}

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
};
//////////////////////////////////////////
function Player(props) {
  return(
      <div className="player">
        <div className="player-name">
            <a className="remove-player" onClick={props.onRemove}>X</a>
            {props.name}
        </div>
        <div className="player-score">
          <Counter score={props.score} onChange={props.onScoreChange} />
        </div>
      </div>
  );
}

Player.PropTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
};
///////////////////////////////////////
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

    onScoreChange: function(index, delta) {
      this.state.players[index].score += delta;
      this.setState(this.state);
    },

    onPlayerAdd: function(name) {
      this.state.players.push({
            name: name,
            score: 0,
            id: 7
      });

    this.setState(this.state);
    },

    onRemovePlayer: function(index) {
        this.state.players.splice(index, 1);
        this.setState(this.state);
    },

    render: function() {
       return(
           <div className="scoreboard">
               <Header title={this.props.title} players={this.state.players} />
               <div className="players">
                   {this.state.players.map(function(player, index) {
                       return (
                           <Player
                               onScoreChange = { function(delta){this.onScoreChange(index, delta)}.bind(this) }
                               onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                               name={player.name}
                               score={player.score}
                               key={player.id}
                           />
                       )
                   }.bind(this))}
               </div>
               <AddPlayerForm onAdd={this.onPlayerAdd} />
           </div>
       );
    }
});

ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'));