

import Navbar from './navbar';
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from "./CreatOrder";
import OngoingOrders from "./OngoingOrders";
import SignUp from "./SignUp";
import ImageDetection from "./ImageDetection";
import LoginPage from "./LoginPage";
import ChatAI from "./ChatAI";
import UserOrders from './UserOrders';
function App() {
  // const [buttonPopup, setbuttonPopup] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/Ongoing">
              <OngoingOrders />
            </Route>
           <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/login" component={LoginPage}>
              <LoginPage/>
            </Route>
            <Route path="/ImageDetection">
              <ImageDetection/>
            </Route>
            <Route path="/ChatAI">
              <ChatAI/>
            </Route>
            <Route path="/Orders">
              <UserOrders/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
