//import logo from './logo.svg';
import './App.css';

const user = {
	firstName: 'Harper',
	lastName: 'Perez'
};

const element = (
	<h1>Hello, {formatName(user)}</h1>	
)

function formatName(user) {
	return `${user.firstName} ${user.lastName}`;
}

function App() {
    return (
		element
    );
}

export default App;
