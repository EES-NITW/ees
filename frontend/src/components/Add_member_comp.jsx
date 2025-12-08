import axios from "axios";
import React, { useRef } from "react";

export function Add_member_comp({ open, onClose }) {
  const name = useRef(null);
  const roll_number = useRef(null);
  const team = useRef(null);
  async function add_member() {
    const member_name = name.current.value;
    const member_roll_number = roll_number.current.value;
    const member_team = team.current.value;
    const response = await axios.post(
      "http://localhost:5000/api/v1/teams/add_member",
      {
        name: member_name,
        roll_no: member_roll_number,
        team: member_team,
      }
    );
    console.log(response.data.message);
    if (response.data.message === "Member Added Successfully") {
      alert("Member Added Successfully");
    }
  }
  return (
    <div>
      <input ref={name} type="text" placeholder="Name" />
      <input ref={roll_number} type="text" placeholder="Eg: 22EEB0A21" />
      <input
        ref={team}
        type="text"
        placeholder="Hosting or Design or Logistics"
      />
      <button
        onClick={add_member}
        className="rounded-2xl bg-black text-white w-fit p-2 m-2 hover:bg-gray-800 cursor-pointer"
      >
        Add a member
      </button>
      <h1>Add_member_comp</h1>
      <button
        onClick={onClose}
        className="bg-blue-500 rounded-2xl cursor-pointer hover:bg-green-600 text-white p-2 m-2"
      >
        Close
      </button>
    </div>
  );
}

export default Add_member_comp;
