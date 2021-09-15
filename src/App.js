import "./App.css";
import { Route } from "react-router-dom";
import store from "./store";
import Index from "./page/Index";
import { Provider } from "react-redux";
import reducer from "./store/Reducer";
import Dns from "./page/Dns";
import Log from "./page/Log";
import Waf from "./page/Waf";
import Wan from "./page/Wan";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Route path="/" exact component={Index} />
        <Route path="/dns" component={Dns} />
        <Route path="/log" component={Log} />
        <Route path="/waf" component={Waf} />
        <Route path="/wan" component={Wan} />
      </div>
    </Provider>
  );
}

export default App;
