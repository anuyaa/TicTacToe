// eslint-disable-next-line
import React from 'react'; // eslint-disable-next-line
import ReactDOM from 'react-dom' // eslint-disable-next-line
import './index.css';

class Square extends React.Component {

	render() {

	    return (<button className="square" 
	    	onClick={() => this.props.onSquareClick()} > 
	    	{ this.props.value }</button>);
  	}

}


class Board extends React.Component {

	constructor(props){
		super(props);
		this.state = { squares : Array(9).fill(null), xIsNext : true };
	}

	calculateWinner(squares){
		const lines = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		];

		for (let i = 0; i < lines.length; i++) {
			const [a,b,c] = lines[i];
			if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
				return squares[a];
			}
		}

		return null;
	}

	handleClick(i){
		const squaresShallowCopy = this.state.squares.slice();
		if(squaresShallowCopy[i] || this.calculateWinner(squaresShallowCopy)){
			return;
		}
		squaresShallowCopy[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({squares : squaresShallowCopy , xIsNext : !this.state.xIsNext});
	}

	renderSquare(i){
		return <Square value={this.state.squares[i]} onSquareClick = {() => this.handleClick(i)}/>
	}


	clearBoard(){
		this.setState({ squares : Array(9).fill(null), xIsNext : true });
	}

	render () {

		const winner = this.calculateWinner(this.state.squares);
		let status; 
		if(winner){
			status = 'This Game"s Winner is ' + winner;
		}else if(this.state.squares.findIndex((x) => x == null) === -1){
			status = 'This Game is a Draw';
		}else{
			status = 'Next player '+ (this.state.xIsNext ? 'X' : 'O');
		}

		return(<div className="game">
					<div className="heading">
						Play Tic Tac Toe 
						<hr></hr>
					</div>
					<div className="status">{status}</div>
					<div className="board">
						<div className="board-row"> 
							{ this.renderSquare(0) } 
							{ this.renderSquare(1) } 
							{ this.renderSquare(2) }
						</div>
						<div className="board-row"> 
							{ this.renderSquare(3) } 
							{ this.renderSquare(4) } 
							{ this.renderSquare(5) }
						</div>
						<div className="board-row"> 
							{ this.renderSquare(6) } 
							{ this.renderSquare(7) } 
							{ this.renderSquare(8) }
						</div>
					</div>
					<div><button onClick={() => this.clearBoard()}>Reset Game</button></div>
				</div>);		 

	}

}


class Game extends React.Component {

	render () {

		return(<Board/>);
	}
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);