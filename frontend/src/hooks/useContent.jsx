import { useState, useEffect } from "react";
import axios from "axios";

export function useContent() {
  const [contents, setContents] = useState([]);

  function refresh() {
    axios.get("http://localhost:5000/api/v1/events/get_all_completed")
      .then((response) => {
        console.log("Fetched content", response.data.events);
        setContents(response.data.events);  // <-- FIX
      });
  }

  useEffect(() => {
    refresh();
    console.log("content is "+contents);
    const refresh_interval = setInterval(refresh, 10 * 1000);

    return () => clearInterval(refresh_interval);
  }, []);
   useEffect(() => {
    console.log("Updated contents:", contents);
  }, [contents]);


  return contents;
}
