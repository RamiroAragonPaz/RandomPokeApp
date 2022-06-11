import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Body from './components/Body/main';



function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Body />        
      </header>
    </div>
  );
}

export default App;
