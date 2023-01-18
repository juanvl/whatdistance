import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Playground from './pages/Playground';
import { SearchResults } from './pages/SearchResults';
import { DefaultLayout } from './pages/_layouts/DefaultLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/search"
          element={
            <DefaultLayout>
              <SearchResults />
            </DefaultLayout>
          }
        />
        {import.meta.env.DEV ? (
          <Route path="/playground" element={<Playground />} />
        ) : (
          <></>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
