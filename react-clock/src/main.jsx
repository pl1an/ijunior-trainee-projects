import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//roots used to store clock versions
const root = ReactDOM.createRoot(document.getElementById('root'));
const root2 = ReactDOM.createRoot(document.getElementById('root2'));
const root3 = ReactDOM.createRoot(document.getElementById('root3'));

//functional clock version 1
function tick(){
  const clock = (
    <div class="clock1">
      <h1>Simple React Clock (v1)</h1>
      <h2>{new Date().toLocaleDateString()}</h2>
      <h3>{new Date().toLocaleTimeString()}</h3>
    </div>
  )
  root.render(clock);
}
setInterval(tick, 1000);

//functional clock version 2 (personalized component)
function Clock(props){
  return (
    <div class="clock2">
      <h1>Simple React Clock (v2)</h1>
      <h2>{props.date.toLocaleDateString()}</h2>
      <h3>{props.date.toLocaleTimeString()}</h3>
    </div>
  )
}
function tick2(){
  root2.render(<Clock date={new Date()}></Clock>);
}
setInterval(tick2, 1000);

//functional clock version 3 (state)
class Clock3 extends React.Component{
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }
  render(){
    return (
      <div class="clock3">
        <h1>Simple React Clock (v3)</h1>
        <h2>{this.state.date.toLocaleDateString()}</h2>
        <h3>{this.state.date.toLocaleTimeString()}</h3>
    </div>
    )
  }
  componentDidMount(){
    this.timer = setInterval(()=>this.tick3(),1000);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  tick3(){
    this.setState({date:new Date()});
  }
}
root3.render(<Clock3></Clock3>);
