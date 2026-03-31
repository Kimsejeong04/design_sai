import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Carousel2 } from "../../components";

const MainBanner = () => {
  const [bannerVersion, setBannerVersion] = useState(1);
  const [designs, setDesigns] = useState([]);
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    const randomVersion = Math.random() < 0.5 ? 1 : 2;
    setBannerVersion(randomVersion);

    fetchMyDesigns();
    fetchUserFiles();
  }, []);

  const fetchMyDesigns = async () => {
    const res = await axios.post("http://localhost:8081/api/designs/mydesigns", {
      username: sessionStorage.getItem("username")
    });
    setDesigns(res.data);
  };

  const fetchUserFiles = async () => {
    const res = await fetch(`http://localhost:8081/files/userimg?username=${sessionStorage.getItem("username")}`);
    const data = await res.json();
    setUserFiles(data);
  };

  const getLatestItem = (items, dateField) => {
    if (!items || items.length === 0) return null;
    return items
      .slice()
      .sort((a, b) => new Date(b[dateField]) - new Date(a[dateField]))[0];
  };

  const latestTemplate = getLatestItem(designs, "createdAt");
  const latestUpload = getLatestItem(userFiles, "uploadedAt");

  return (
    <>
      {bannerVersion === 1 ? (
        <Carousel />
      ) : (
        <Carousel2 latestTemplate={latestTemplate} latestUpload={latestUpload} />
      )}
    </>
  );
};

export default MainBanner;
