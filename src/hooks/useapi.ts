import axios from "axios";

const fetchData = async (data: any) => {
  try {
    const response = await axios.post(
      "https://hiring-react-assignment.vercel.app/api/bot",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchData;
