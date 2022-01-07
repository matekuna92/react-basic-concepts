//import logo from './logo.svg';
import './App.css';

/* const user = {
	firstName: 'Harper',
	lastName: 'Perez'
};

const element = (
	<h1>Hello, {formatName(user)}</h1>	
)

function formatName(user) {
	return `${user.firstName} ${user.lastName}`;
} */


// function components are the simplest way to write a component:
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>
}

// React element can represent user-defined components. React passes JSX attributes and children to the component as "props" object
// const element = <Welcome name="Sara" />

function App() {
    return (
		<div>
			<Welcome name="Sara" />
			<Welcome name="Cahal" />
			<Welcome name="Edite" />
		</div>
    );
}

export default App;
