'use strict'
let prec = [];
const H   = 257;
const md = 1000000007;
function precI(){
  prec[0] = H;
  for (let i = 1; i < 40; i++) {
    prec[i] = (prec[i-1] * H) % md;
  }
}

function hash(string) {
  let hsh = 0;
  //alert(hsh);
  for (let i = 0; i < string.length; i++)
  {
    hsh = Number(Number(hsh) + (Number(prec[i]) * string[i].charCodeAt(0))%Number(md))%Number(md);
  //  alert(hsh);
  }

  return Number(hsh);
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    precI();
    this.state = {
      items: [],
      todoOut: null,
      inputValue: '',
      value: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  createTask(event) {
    let inp = this.state.inputValue;
    for (let i = 1; i < inp.length; ++i) {
      //if (i % 40 == 0) inp = inp.substring(0, i) + "\n" + inp.substring(i);
    }
    let d = new Date();
    let n = d.getTime();
    if (inp != '') {
      this.setState({items: [...this.state.items, [inp,n]]});
      this.setState({inputValue: ''});
    }
    event.preventDefault();
  }

  deleteT(time) {
    this.setState({items: this.state.items.filter((a) => (a[1] != time))});
  }

  handleSubmit(event) {
    let inp = this.state.value;
    // this.setState(prevState => ({
    //   items: [...prevState.arrayvar, inp]
    // }));
    // this.setState({todoOut: this.state.items.map(i => (<li> {i} </li>))});

  }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={evt => this.createTask(evt)}>
            <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            <ul className="todos">
              {this.state.items.map((a) => (<li key= {a[1]} onClick = {() => this.deleteT(a[1])}> {a[0]} </li>))}
            </ul>
            <div id="buttons">

            {
            //<button type="submit" onClick={evt => this.createTask(evt)}> Add </button>
            //<button type="delete"> Delete </button>
            //<button type="help"> Help </button>
            }
            </div>
          </form>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<div> <TodoList/> </div>, document.getElementById('container'));
