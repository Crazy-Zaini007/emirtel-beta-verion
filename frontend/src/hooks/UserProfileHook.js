import { useState } from "react";
import { useAuthContext } from "./UserContextHook";
import { getUserProfile } from "../redux/reducers/userSlice";
import { useDispatch } from "react-redux";

export default function UserProfileHook() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const apiUrl = process.env.API_URL;

  const gettingUserProfile = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/auth/user/join/get/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setLoading(false);
       
      }
      if (response.ok) {
        setLoading(false);
        dispatch(getUserProfile(json.data));
      }
    } catch (error) {
     
      setLoading(false);
    }
  };
  return { loading, gettingUserProfile };
}
