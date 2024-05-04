import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import upload from "../assets/upload.png";

const Dateprofile = () => {
  const { user } = useSelector((state) => state.auth);
  const [tempPic1, setTempPic1] = useState();
  const [tempPic2, setTempPic2] = useState();
  const [tempPic3, setTempPic3] = useState();
  const [tempPic4, setTempPic4] = useState();
  const [tempPic5, setTempPic5] = useState();
  const [identifier, setIdentifier] = useState(0);
  const [pic1, setPic1] = useState(null);
  const [pic2, setPic2] = useState(null);
  const [pic3, setPic3] = useState(null);
  const [pic4, setPic4] = useState(null);
  const [pic5, setPic5] = useState(null);
  const [profilePic, setProfilePic] = useState([]);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/date/getprofilepics/${user._id}`)
      .then((res) => {
        const data = res.data;
        if (data && data.imageUrls && data.imageUrls.length > 0) {
          setPic1(data.imageUrls[0]);
          setPic2(data.imageUrls[1]);
          setPic3(data.imageUrls[2]);
          setPic4(data.imageUrls[3]);
          setPic5(data.imageUrls[4]);
          const identifier = data.imageUrls.length || 0;
          setIdentifier(identifier);
          console.log(identifier);
        } else {
          alert("No profile picture found");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile pics:", error);
      });
  }, [user._id]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (identifier == 0) {
      formData.append("image", tempPic1);
    } else if (identifier == 1) {
      formData.append("image", tempPic2);
    } else if (identifier == 2) {
      formData.append("image", tempPic3);
    } else if (identifier == 3) {
      formData.append("image", tempPic4);
    } else if (identifier == 4) {
      formData.append("image", tempPic5);
    }
    await axios.post(
      `http://localhost:8000/api/date/addpic/${user._id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    window.location.reload();
  };

  const handleImageClick = (ref) => {
    ref.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const imgname = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            if (identifier == 0) {
              setTempPic1(file);
            } else if (identifier == 1) {
              setTempPic2(file);
            } else if (identifier == 2) {
              setTempPic3(file);
            } else if (identifier == 3) {
              setTempPic4(file);
            } else if (identifier == 4) {
              setTempPic5(file);
            }
            console.log(file);
          },
          "image/jpeg",
          1
        );
      };
    };
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-20 text-white items-center justify-center w-full">
        <div>Dateprofile</div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex">
          <div className="flex flex-col w-[650px]">
            {pic1 ? (
              <img src={pic1} />
            ) : (
              <div
                onClick={() => handleImageClick(inputRef1)}
                className="flex flex-col w-[600px] border-2 border-[#191919]"
              >
                {tempPic1 ? (
                  <img src={URL.createObjectURL(tempPic1)} width={600} />
                ) : (
                  <img src={upload} />
                )}
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={inputRef2}
                />
              </div>
            )}
            {pic1 ? (
              <button onClick={handleUpload} className="text-white h-10">
                Delete
              </button>
            ) : (
              <button onClick={handleUpload} className="text-white h-10">
                Upload
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex w-full">
            <div className="flex flex-col w-[300px]">
              {pic2 ? (
                <img src={pic2} />
              ) : (
                <div
                  onClick={() => handleImageClick(inputRef2)}
                  className="flex flex-col w-[300px] border-2 border-[#191919]"
                >
                  {tempPic2 ? (
                    <img src={URL.createObjectURL(tempPic2)} width={300} />
                  ) : (
                    <img src={upload} />
                  )}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={inputRef2}
                  />
                </div>
              )}
              {pic2 ? (
                <button onClick={handleUpload} className="text-white h-10">
                  Delete
                </button>
              ) : (
                <button onClick={handleUpload} className="text-white h-10">
                  Upload
                </button>
              )}
            </div>

            <div className="flex flex-col w-[300px]">
              {pic3 ? (
                <img src={pic3} />
              ) : (
                <div
                  onClick={() => handleImageClick(inputRef3)}
                  className="flex flex-col w-[300px] border-2 border-[#191919]"
                >
                  {tempPic3 ? (
                    <img src={URL.createObjectURL(tempPic3)} width={300} />
                  ) : (
                    <img src={upload} width={300} />
                  )}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={inputRef3}
                  />
                </div>
              )}
              {pic3 ? (
                <button onClick={handleUpload} className="text-white h-10">
                  Delete
                </button>
              ) : (
                <button onClick={handleUpload} className="text-white h-10">
                  Upload
                </button>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col w-[300px]">
              {pic4 ? (
                <img src={pic4} width={300} />
              ) : (
                <div
                  onClick={() => handleImageClick(inputRef4)}
                  className="flex flex-col w-[300px] border-2 border-[#191919]"
                >
                  {tempPic4 ? (
                    <img
                      src={URL.createObjectURL(tempPic4)}
                      width={200}
                      height={100}
                    />
                  ) : (
                    <img src={upload} width={300} />
                  )}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={inputRef4}
                  />
                </div>
              )}
              {pic4 ? (
                <button onClick={handleUpload} className="text-white h-10">
                  Delete
                </button>
              ) : (
                <button onClick={handleUpload} className="text-white h-10">
                  Upload
                </button>
              )}
            </div>

            <div className="flex flex-col w-[300px]">
              {pic5 ? (
                <img src={pic5} />
              ) : (
                <div
                  onClick={() => handleImageClick(inputRef5)}
                  className="flex flex-col w-[300px] border-2 border-[#191919]"
                >
                  {tempPic5 ? (
                    <img
                      src={URL.createObjectURL(tempPic5)}
                      width={200}
                      height={100}
                    />
                  ) : (
                    <img src={upload} />
                  )}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={inputRef5}
                  />
                </div>
              )}
              {pic5 ? (
                <button onClick={handleUpload} className="text-white h-10">
                  Delete
                </button>
              ) : (
                <button onClick={handleUpload} className="text-white h-10">
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full"></div>
    </div>
  );
};

export default Dateprofile;
