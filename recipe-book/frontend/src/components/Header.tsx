import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <Link to="/" className="text-2xl font-bold">
          Recipe Book
        </Link>
      </div>
    </header>
  );
};

export default Header;
