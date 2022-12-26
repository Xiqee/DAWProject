import "./profile.css";
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Rightbar from "../../components/rightbar/rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import React from "react";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}