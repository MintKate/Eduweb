import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [user, setUser] = useState(null);

  // Lấy thông tin người dùng từ session
  useEffect(() => {
    axios
      .get("http://localhost:4000/session")
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Lỗi khi lấy thông tin session:", error));
  }, []);

  // Lấy chữ cái đầu tiên từ tên người dùng
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            {user ? (
              <div className="avatar-initial">
                {getInitial(user.username)}
              </div>
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="avatar"
                className="avatar"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
