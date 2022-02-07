import './App.css';
import AddBook from "./components/Books/AddBook";
import Books from "./components/Books/Books";

function App() {
  return (
    <div className="App">
      <h1>Web Library</h1>
        <Books />
    </div>
  );
}

export default App;
