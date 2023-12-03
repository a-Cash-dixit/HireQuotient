import "./App.css";
import { getUsers } from "./UserService";
import User from "./components/UserComponent";
import React from "react";
import { useMemo } from "react";
import Pagination from "./Pagination";
let PageSize = 10;

function App() {
  const [users, setUsers] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  
  React.useEffect(() => {
    getUsers(setUsers);
  }, []);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [users,currentPage]);
  const deleteUser = (id) => {
    let tempUsers = users.filter((user) => user.id !== id);
    setUsers(tempUsers);
  };
  const editUser = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].edit = true;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };
  const searchInUsers = (search, users) => {
    let tempSearch = search.toLowerCase();
    return users.map((user) => {
      if (
        user.name.toLowerCase().includes(tempSearch) ||
        user.email.toLowerCase().includes(tempSearch) ||
        user.role.toLowerCase().includes(tempSearch)
      ) {
        user.show = true;
        return user;
      }
      user.show = false;
      return user;
    });
  };
  const searchUsers = (e) => {
    setCurrentPage(1);
    setUsers(searchInUsers(e.target.value, users));
  };
  const select = (id) => {
    let tempUsers = users;
    let index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].selected = !tempUsers[index].selected;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };
  const selectAll = (e) => {
    const index=(currentPage-1)*10;
    const UserIds = users
      .filter((user) => user.show)
      .slice(index, index + 10)
      .map((user) => user.id);

    let tempUsers = users.map((user) => {
      if (UserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
    setUpdate(!update);
  };
  const deleteSelected = () => {
    setUsers((prevState) => prevState.filter((user) => !user.selected));
  };
  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].name = nameRef.current.value;
     tempUsers[index].email = emailRef.current.value;
     tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };
  return (
    <>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "80%",
          margin: "auto",
          padding:"2rem"
        }}
      >
        <input
          className="search"
          type="text"
          placeholder="Search by name, email or role"
          onChange={searchUsers}
        ></input>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="checkbox"
            onChange={(e) => {
              selectAll(e);
            }}
            name="selectAll"
          />
          <div style={{ margin: "auto", fontWeight: "700", fontSize: "17px" }}>
            Name
          </div>
          <div style={{ margin: "auto", fontWeight: "700", fontSize: "17px" }}>
            Email
          </div>
          <div style={{ margin: "auto", fontWeight: "700", fontSize: "17px" }}>
            Role
          </div>
        </div>
        {currentTableData.map((user) => {
          return user.show ? (
            <User
              editUser={editUser}
              deleteUser={deleteUser}
              select={select}
              deleteSelected={deleteSelected}
              key={user.id}
              user={user}
              saveUser={saveUser}
            ></User>
          ) : (
            ""
          );
        })}
      </div>
      <button style={{ marginLeft: "150px",background:"red" }} onClick={() => deleteSelected()}>
        Delete Selected
      </button>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}

export default App;
