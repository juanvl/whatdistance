import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import Playground from './pages/Playground';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {import.meta.env.DEV ? (
            <Route path="/playground" element={<Playground />} />
          ) : (
            <></>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
