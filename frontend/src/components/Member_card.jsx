export function Member_card({ member }) {
  return (
    <div className="text-white rounded-2xl bg-gray-800 m-2 p-4 w-80 h-50">
      <h1> Member Card </h1>
      <p> Member ID : {member.id} </p>
      <p> Member Name : {member.name} </p>
      <p> Member Email : {member.roll_no} </p>
      <p> Member Role : {member.team} </p>
    </div>
  );
}
export default Member_card;
