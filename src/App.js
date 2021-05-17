import { useState } from 'react';
import './App.css';
import FileInput from './components/FileInput';
import UsersTable from './components/UsersTable';

function App() {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(false);

  return (
    <div className="App">
      <FileInput
        usersData={usersData}
        setUsersData={setUsersData}
        setError={setError}
      />
      <>
        {error ? (
          <p className="error" role="alert">
            File format is not correct
          </p>
        ) : (
          usersData.length > 0 && (
            <UsersTable usersData={usersData} setError={setError} />
          )
        )}
      </>
    </div>
  );
}

export default App;
