import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// bad, most React apps only call ReactDOM.render() once, not in every seconds like here
// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root'));}
//
// setInterval(tick, 1000);

// we should make a reusable Clock component:
// function Clock(props) {
//   return (
//     <div>
//       <h1>Hello, world!</h1>
//     <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   )
// }
//
// function tick() {
//   ReactDOM.render(
//     <Clock date={new Date()} />, document.getElementById('root')
//   )
// }
//
// setInterval(tick, 1000);

// but Clock should do the update itself, we only want to use <Clock /> in the render.
// for this we need to add STATE to the Clock component.
// State is similar to props, but it is private and fully controlled by the component.
// convert function to Class:

class Clock extends React.component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
      <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    </div>
  );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>,
  document.getElementById('root')
);


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
