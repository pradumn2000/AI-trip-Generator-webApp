
import axios from "axios"; 

export default async function GetUserProfile(codeResp) {
  try {
    const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${codeResp.access_token}`,
      },
    });

    const userData = res.data;

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      return userData; // 
    } else {
      throw new Error("No user data received");
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
