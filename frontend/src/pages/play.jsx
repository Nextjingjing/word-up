import { useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
import axios from "axios";

export const Play = () => {
  const { challengeId } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/challenge/${challengeId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
        {data.map((item) => {
            return <div key={item.id}>{item.english}</div>;
        })}
    </div>
);
};
