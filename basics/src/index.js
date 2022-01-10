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
// The problem with this syntax is that a different callback is created each time the Toggle renders, better to bind in constructor
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggled ? 'ON' : 'OFF'}
      </button>
    )
  }
}

// CONDITIONAL RENDERING
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  if(isLoggedIn) {
    return <UserGreeting />
  }
  else {
    return <GuestGreeting />
  }
}

function LoginButton(props) {
  return (
    <div>
      <button onClick={props.onClick}>
        Login
      </button>
    </div>
  )
}

function LogoutButton(props) {
  return (
    <div>
      <button onClick={props.onClick}>
        Logout
      </button>
    </div>
  )
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: true
    });
  }

  handleLogoutClick() {
    this.setState({
      isLoggedIn: false
    });
  }

  // return LogoutButton or LoginButton component based on isLoggedIn value
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

  //  button = {isLoggedIn ? <LogoutButton onClick={this.handleLogoutClick} /> : <LoginButton onClick={this.handleLoginClick} />};

    return (
      <div>
        The user is <b> {isLoggedIn ? 'currently' : 'not'} </b> logged in.
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

// PREVENTING COMPONENT FROM RENDERING: To do this return null instead of its render output.
function WarningBanner(props) {
  if(!props.warn) {
    return null;
  }
  return (
    <div className="warning">
      Warning!
    </div>
  )
}

class WarningPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

// LISTS AND KEYS - RENDERING MULTIPLE COMPONENTS
function ListOfNumbers(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5, 6];

// Extracting Components with Keys
// Keys only make sense in the context of the surrounding array.
// We should define keys in the ARRAYS instead of the Component itself:

/* WRONG:
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}
*/

// CORRECT:
function ListItem(props) {
  return <li>{props.value}</li>
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number}></ListItem>
    );

    return (
      <ul>{listItems}</ul>
    )
}

// Keys should be only unique among siblings, but not globally.
// We can use same keys for 2 different arrays
// Keys serve as a hint to React but they don’t get passed to your components
//  If you need the same value in your component, pass it explicitly as a prop with a different name
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map(post =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );

  const content = props.posts.map(post =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.text}</p>
    </div>
  );

  return (
    <div>
      {sidebar}
      {content}
    </div>
  );
}

// FORMS, controlled components
/* In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and 
  update it based on user input. In React, mutable state is typically kept in the state property of components,
  and only updated with setState().
  We can combine the two by making the React state be the “single source of truth”. Then the React component 
  that renders a form also controls what happens in that form on subsequent user input. An input form element
  whose value is controlled by React in this way is called a “controlled component”.
*/

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'John' }; /* Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`. */

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(event.target.value);
  }

  handleSubmit(event) {
    console.log(`The form has been submitted with name: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


const posts = [
  {id: 1, title: 'Hello World', text: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', text: 'You can install React from npm.'}
];

ReactDOM.render(
  <React.StrictMode>
    <Clock />
    <Form />
    <Toggle />
    <LoginControl />
    <WarningPage />
    <ListOfNumbers numbers={numbers} />
    <NumberList numbers={numbers} />
    <Blog posts={posts} />
    <NameForm name="John" />

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
