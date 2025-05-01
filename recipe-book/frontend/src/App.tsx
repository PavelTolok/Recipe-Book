import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeListPage from './pages/RecipeListPage';
import RecipeInfoPage from './pages/RecipeInfoPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<RecipeListPage />} />
            <Route path="/recipe/:id" element={<RecipeInfoPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
