import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Dropdown from '../components/Dropdown/Dropdown.jsx';
import Input from '../components/Input/Input.jsx';
import Button from '../components/Button/Button.jsx';
import UserCard from '../components/UserCard/UserCard.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';

const styles = {
    container: {
      minHeight: '100vh',
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
    },
    subtitle: {
      color: '#4b5563',
    },
    form: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '32px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
    },
    inputGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px',
    },
    select: {
      width: '100%',
      padding: '8px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
    },
    button: {
      width: '100%',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    errorMessage: {
      backgroundColor: '#fee2e2',
      border: '1px solid #ef4444',
      color: '#b91c1c',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '16px',
    },
    userGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, max(50%, 1fr)))',
        gap: '24px',
        marginBottom: '32px',
      },
      
    userCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    cardContent: {
      padding: '16px',
    },
    userImage: {
      width: '128px',
      height: '128px',
      borderRadius: '50%',
      margin: '0 auto 16px',
      display: 'block',
    },
    userName: {
      fontSize: '20px',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: '8px',
    },
    userInfo: {
      marginBottom: '8px',
      color: '#4b5563',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '32px',
    },
    pageButton: {
      padding: '8px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      cursor: 'pointer',
      backgroundColor: 'white',
    },
    activePageButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
    },
    navButton: {
      padding: '8px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      cursor: 'pointer',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
    },
  };




export const SearchScreen = () => {
  const [params, setParams] = useState({
    gender: '',
    nationality: '',
    results: 1,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(1);
  };

  const fetchUsers = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      const queryParams = new URLSearchParams({
        results: params.results,
        ...(params.gender && { gender: params.gender }),
        ...(params.nationality && { nat: params.nationality }),
      });

      const response = await fetch(`https://randomuser.me/api/?${queryParams}`);
      const data = await response.json();
      setUsers(data.results);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const genderOptions = [
    { value: '', label: 'Any' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const nationalityOptions = [
    { value: '', label: 'Any' },
    { value: 'AU', label: 'Australia' },
    { value: 'BR', label: 'Brazil' },
    { value: 'CA', label: 'Canada' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'DE', label: 'Germany' },
    { value: 'DK', label: 'Denmark' },
    { value: 'ES', label: 'Spain' },
    { value: 'FI', label: 'Finland' },
    { value: 'FR', label: 'France' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'IE', label: 'Ireland' },
    { value: 'IN', label: 'India' },
    { value: 'IR', label: 'Iran' },
    { value: 'MX', label: 'Mexico' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'NO', label: 'Norway' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'RS', label: 'Serbia' },
    { value: 'TR', label: 'Turkey' },
    { value: 'UA', label: 'Ukraine' },
    { value: 'US', label: 'United States' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <h1 style={styles.title}>User Generator</h1> 
        </header>

        <form onSubmit={fetchUsers} style={styles.form}>
          <div style={styles.formGrid}>
            <Dropdown
              label="Gender"
              name="gender"
              value={params.gender}
              options={genderOptions}
              onChange={handleChange}
              style={styles}
            />

            <Dropdown
              label="Nationality"
              name="nationality"
              value={params.nationality}
              options={nationalityOptions}
              onChange={handleChange}
              style={styles}
            />

            <Input
              label="Number of Users"
              name="results"
              value={params.results}
              type="number"
              min="1"
              max="50"
              onChange={handleChange}
              style={styles}
            />
          </div>

          <Button
            disabled={loading}
            onClick={fetchUsers}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Loading...' : <><Search size={20} /> Generate Users</>}
          </Button>
        </form>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <div style={styles.userGrid}>
          {currentUsers.map((user, index) => (
            <UserCard key={index} user={user} style={styles} />
          ))}
        </div>

        {users.length > usersPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            style={styles}
          />
        )}
      </div>
    </div>
  );
};

 
 
export default SearchScreen
