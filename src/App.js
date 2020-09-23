import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import HistoryPage from "./pages/History/History";
import RankingPage from "./pages/Ranking/Ranking";
import DetailsPage from "./pages/Details/Details";
import SearchPage from "./pages/Search/Search";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/ranking">
            <RankingPage />
          </Route>
          <Route path="/history">
            <HistoryPage />
          </Route>
          <Route path="/details">
            <DetailsPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
