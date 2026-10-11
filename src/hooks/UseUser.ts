import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const userName = localStorage.getItem("userName");
    const userPhone = localStorage.getItem("userPhone");
    const userDialCode = localStorage.getItem("userDialCode");
    const userImage = localStorage.getItem("userImage");
    const userToken = localStorage.getItem("userToken");
    const user = {
      _id: userId,
      name: userName,
      phone: userPhone,
      dialCode: userDialCode,
      image: userImage,
      isUser: userToken != undefined ? true : false,
    };
    // console.log("IsUser", user.isUser);
    setUser(user);
  }, []);

  return { user };
};

export default useUser;
