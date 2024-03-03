import logo from './logo.svg';
import './App.css';
import CatProfile from './components/cat-profiles/cat-profiles';


function App() {
  return (
    <div className="app">
      <CatProfile
        name="Luluka"
        age="3"
        description="A playful little cat who loves to chase laser pointers."
        image="assets/img/luluka.jpg"
      />

      <CatProfile/>
      
      <CatProfile/>
    </div>
  );
}

export default App;
