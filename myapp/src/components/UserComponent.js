import React from "react";
const User = (props) => {
  //console.log(user.user.id);
  const { user, deleteUser, editUser,select } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        border: "1px grey solid",
      }}
    >
      <input
        id={user.id}
        type="checkbox"
        data={`${user.selected}`}
        onChange={() => select(user.id)}
        checked={user.selected}
      ></input>
      <div style={{ margin: "auto" }}>{user.name}</div>
      <div style={{ margin: "auto" }}>{user.email}</div>
      <div style={{ margin: "auto" }}>
        {user.role}
        <i onClick={() => editUser(user.id)} className="fas fa-edit"></i>
        <i onClick={() => deleteUser(user.id)} className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};
export default User;
