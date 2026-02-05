import WC from "./components/WC";
import DateTimeDisplay from "./components/DateTimeDisplay";
function App() {
  return (
    <>
      <div className="container">
        <h1>CURRENT WEATHER</h1>
        <WC />
      </div>
      <div className="container2">
        <h1>CURRENT DATE & TIME</h1>
        <DateTimeDisplay />
      </div>
    </>
  );
}

export default App;