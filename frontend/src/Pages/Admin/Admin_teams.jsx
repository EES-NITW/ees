import { useState } from "react";
import { useContent } from "../../hooks/useContent";
import CreateContentModel from "../../components/CreateContentModel";
import Add_member_comp from "../../components/Add_member_comp";
import useContent2 from "../../hooks/useContent2";
import Member_card from "../../components/member_card";

export function Admin_teams() {
  const members = useContent2();
  const [model_open, setModel_open] = useState(false);
  return (
    <div className="bg-gray-700">
      <h1> Current Members </h1>
      <div>
        <button
          onClick={() => {
            setModel_open(true);
          }}
        >
          Manage Members
        </button>
        {model_open && (
          <Add_member_comp
            open={model_open}
            onClose={() => {
              setModel_open(false);
            }}
          />
        )}
      </div>
      <h1> Current Members </h1>
      <div className="flex justify-center flex-wrap">
        {members.map((member) => (
          <Member_card key={member.id} member={member} delete_enabled={true} />
        ))}
      </div>
    </div>
  );
}
export default Admin_teams;
