import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Bill Management System</h1>
      <p>Navigate to <Link to="/customers">Customers List</Link> or <Link to="/bill-generator">Bill Generator</Link>.</p>
    </div>
  );
};

export default Home;