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

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval( () => {
      this.tick()
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

// ** this.state still refers to the state of Clock
// state of clock passed down to FormattedDate as props !
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      <FormattedDate date={this.state.date} />

      <Form />
      <Toggle />
    </div>
  );
  }
}

// state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.
// A component may choose to pass its state down as props to its child components: **
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

// FORM
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  )
}

// HANDLING EVENT
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: true
    }
    // This binding is necessary to make `this` work in the callback
    // In JavaScript, class methods are not bound by default
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggled: !prevState.isToggled
    }));

    console.log(this);
    console.log(this.state.isToggled);
  }

// <button onClick={() => this.handleClick()}> - This syntax ensures `this` is bound within handleClick, no need to bind in constructor, same result
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggled ? 'ON' : 'OFF'}
      </button>
    )
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
