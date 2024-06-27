import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import { BASE_URL } from "../config";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState(""); // State to hold the search text
  const [sortOrder, setSortOrder] = useState("asc"); // State to hold the sort order
  const [currentPage, setCurrentPage] = useState(1); // State to hold the current page number
  const pageSize = 2; // Number of users per page

  useEffect(() => {
    getUsers();
  }, []);

  const searchUser = () => {
    axios
      .get(`${BASE_URL}/api/user?search=${searchText}`)
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  };

  const handleChange = (event) => {
    setSearchText(event.target.value); // Update the searchText state as user types
  };

  function getUsers() {
    axios.get(`${BASE_URL}/api/users/`).then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  const deleteUser = (id) => {
    axios
      .delete(`${BASE_URL}/api/user/${id}/delete`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
      });
  };

  const toggleSortOrder = () => {
    // Toggle between 'asc' and 'desc' sort order
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  // Sort users by name based on the sort order
  const sortedUsers = users.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, sortedUsers.length);
  const visibleUsers = sortedUsers.slice(startIndex, endIndex);
  const goToPage = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>List User</h1>
      <label>Search Name: </label>
      <input
        type="text"
        name="sname"
        value={searchText}
        onChange={handleChange}
        onKeyUp={searchUser}
      />
      <button onClick={searchUser}>Search</button>

      <br/>
      <br/>

      <select value={sortOrder} onChange={toggleSortOrder}>
        <option value="asc">Name (Ascending)</option>
        <option value="desc">Name (Descending)</option>
      </select>

      <br/><br/><br/>
      <table style={{ margin: 'auto', width: '80%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleUsers.map((user, index) => (
            <tr key={startIndex + index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <Link to={`user/${user.id}/edit`} style={{ marginRight: "10px" }}>
                  Edit
                </Link>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      {/* Pagination */}
      <div>
      <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
        {'<'}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
          {'>'}
        </button>
      </div>
    </div>
  );
}
