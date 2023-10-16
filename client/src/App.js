import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from './pages/Login';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Leaderboards from './pages/Leaderboards';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/user';
import { setTeams } from './redux/teams';


function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

    useEffect(() => {
      fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => dispatch(setUser(user)));
        }
      });
    }, []);

    useEffect(() => {
      fetch("/teams")
      .then((r) => {
        if(r.ok) {
          r.json().then(teams => {dispatch(setTeams(teams))});
        }
      })
    },[])

    if (!user) return <Login />;

  return (
      <div className="App">
        <h1>{user.username}</h1>
        <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/standings' element={<Leaderboards />} />
          </Routes>
      </div>
  );
}

export default App;