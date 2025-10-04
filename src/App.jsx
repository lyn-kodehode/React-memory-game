import "./App.css";
import BoardComponent from "./components/BoardComponent";
import GameCompletion from "./components/GameCompletion";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  return (
    <>
      <HeaderComponent />
      <BoardComponent />
      <GameCompletion />
    </>
  );
}

export default App;
