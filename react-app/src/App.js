
import './App.css';
import PostCode from './PostCode.js'
console.log(process.env.REACT_APP_TWFY_KEY)


function App() {
  return (
    <div className="App">

      <PostCode />
    </div>
  );
}

export default App;
