import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Quiz from "./component/Quiz";
import Home from "./component/Home";
import axios from "axios";

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://opentdb.com/api.php?amount=15`
        );
        if (!data) {
          throw new Error('Network response was not ok');
        }
       

        setData(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const startTimer = () => {
    setIsTimerRunning(true);
  };


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element= {
       <Home questions ={data.result} startTimer={startTimer}/>}
      > </Route>
          <Route
            exact
            path='/quiz'
            element={loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
            
             <Quiz questions ={data.results} isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning}/>
            )}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
