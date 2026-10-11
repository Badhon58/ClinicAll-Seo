import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useCookieUser = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const cookieUser = JSON.parse(Cookies.get("user") ?? "{}");
    //     const userId = localStorage.getItem("userID");
    //     const userName = localStorage.getItem("userName");
    //     const userPhone = localStorage.getItem("userPhone");
    //     const userDialCode = localStorage.getItem("userDialCode");
    //     const userImage = localStorage.getItem("userImage");
    //     const userToken = localStorage.getItem("userToken");
    const user = {
      _id: cookieUser.id,
      name: cookieUser.name,
      phone: cookieUser.phone,
      dialCode: "880",
      image: cookieUser.image,
      isUser: cookieUser.token != undefined ? true : false,
    };
    // console.log("IsUser", user.isUser);
    setUser(user);
  }, []);

  return { cookieUser: user };
};

export default useCookieUser;
