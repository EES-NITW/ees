import axios from "axios";
import Trash from "../icons/Trash";

export function Member_card({ member, delete_enabled }) {
  function delete_member() {
    axios.delete("http://localhost:5000/api/v1/teams/delete_member", {
      params: {
        id: member.id,
      },
    });
    console.log("delete member");
  }
  return (
    <div className="text-white rounded-2xl bg-gray-800 m-2 p-4 w-80 h-100">
      <div className="flex justify-between">
        <h1> Member Card </h1>
        {delete_enabled && (
          <div onClick={delete_member} className="relative ">
            <Trash />
          </div>
        )}
      </div>
      {member.img_url && (
        <img
          src={member.img_url}
          alt="member"
          className="w-40 h-40 rounded-full"
        />
      )}
      <p> Member ID : {member.id} </p>
      <p> Member Name : {member.name} </p>
      <p> Member Email : {member.roll_no} </p>
      <p> Member Role : {member.team} </p>
    </div>
  );
}
export default Member_card;
