import { useEffect, useState } from "react";
import axios from "axios";

export function useContent2() {
  const [members, setmembers] = useState([]);

  function refresh() {
    axios.get("http://localhost:5000/api/v1/teams/members").then((response) => {
      console.log("Fetched content", response.data.events);
      setmembers(response.data.results); // <-- FIX
    });
  }

  useEffect(() => {
    refresh();
    console.log("content is " + members);
    const refresh_interval = setInterval(refresh, 10 * 1000);

    return () => clearInterval(refresh_interval);
  }, []);
  useEffect(() => {
    console.log("Updated contents:", members);
  }, [members]);

  return members;
}
export default useContent2;
