import React from "react";
import { useRef } from "react";
const User = (props) => {
  //console.log(user.user.id);
  const { user, deleteUser, editUser,select,saveUser } = props;
  const nameRef = useRef(null);
  const emailRef=useRef(null);
  const roleRef=useRef(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        border: "1px grey solid",
        background:`${user.selected? "grey":"white"}`
      }}
    >
      <input
        id={user.id}
        type="checkbox"
        data={`${user.selected}`}
        onChange={() => select(user.id)}
        checked={user.selected}
      ></input>
      <div style={{ margin: "auto" }}><input
      style={{border:"none",background:"transparent"}}
          readOnly={!user.edit}
          type="text"
          name="name"
          ref={nameRef}
          defaultValue={user.name}
        ></input></div>
      
      <div style={{ margin: "auto" }}><input
      style={{border:"none",background:"transparent"}}
          readOnly={!user.edit}
          type="text"
          name="email"
          ref={emailRef}
          defaultValue={user.email}
        ></input></div>
      
      <div style={{ margin: "auto",display:"flex",justifyContent:"flex-end" }}>
      <input
      style={{border:"none",background:"transparent"}}
          readOnly={!user.edit}
          type="text"
          name="role"
          ref={roleRef}
          defaultValue={user.role}
        ></input>
        
      </div>
      <div style={{display:"flex"}}>
      {user.edit? <i
      style={{margin:"auto"}} 
            onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
            className="fas fa-save"
          ></i>: <i style={{margin:"auto"}}  onClick={() => editUser(user.id)} className="fas fa-edit"></i>}
        <i style={{margin:"auto"}} onClick={() => deleteUser(user.id)} className="fas fa-trash-alt"></i>
        </div>
    </div>
  );
};
export default User;
