import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

function tick(){
  const clock = (
    <div>
      <h1>Simple React Clock</h1>
      <h2>{new Date().toLocaleDateString()}</h2>
      <h3>{new Date().toLocaleTimeString()}</h3>
    </div>
  )
  root.render(clock);
}

setInterval(tick, 1000);
