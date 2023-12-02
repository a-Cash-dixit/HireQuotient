import axios from "axios";
import { processUsersResponse } from "./userUtility";
const URL="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const getUsers = (setUsers) => {
    axios
      .get(URL)
      .then((res) => {
        setUsers(processUsersResponse(res.data));
      })
  };
export {getUsers};