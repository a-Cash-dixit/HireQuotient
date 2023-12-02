import "./App.css";
import { getUsers } from "./UserService";
import User from "./components/UserComponent";
import React from "react";
function App() {
  const [users, setUsers] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  React.useEffect(() => {
    getUsers(setUsers);
  }, []);
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
    //setPage(1);
    setUsers(searchInUsers(e.target.value, users));
  };
  const select = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].selected = !tempUsers[index].selected;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };
  const selectAll = (e) => {
    const listedUserIds = users
      .filter((user) => user.show)
      .map((user) => user.id);

    let tempUsers = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
    setUpdate(!update);
  };
  const deleteSelected = () => {
    if (window.confirm("Selected users will be deleted")) {
      setUsers((prevState) => prevState.filter((user) => !user.selected));
      //selectAllRef.current.checked = false;
    }
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
        {users.map((user) => {
          return user.show ? (
            <User
              editUser={editUser}
              deleteUser={deleteUser}
              select={select}
              deleteSelected={deleteSelected}
              key={user.id}
              user={user}
            ></User>
          ) : (
            ""
          );
        })}
      </div>
      <button style={{ marginLeft: "150px" }} onClick={() => deleteSelected()}>
        Delete Selected
      </button>
    </>
  );
}

export default App;
