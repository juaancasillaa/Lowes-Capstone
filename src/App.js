import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import the necessary CSS file
//////////////
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />

          {/* Define the routes using the React Router */}
          <Routes></Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

// drop the link of your hosted front-end  and Github Repo at the start of the presentation
// demo the site and show responsiveness of one page (please spend less than 1 minute)
// components created
// show your routes created
// display your database
// be mindful of time - each person has a 10min window that includes time for questions.
// e
