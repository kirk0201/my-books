import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./pages/Error";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ConnectedRouter history={history}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/book/:id" element={<Detail />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;
