"use client";
import Image from "next/image";
import "./class-content.css";
import { BsThreeDots } from "react-icons/bs";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchParticularClassContent } from "@/services/teacher/teacherApiService";
import { useSelector } from "react-redux";
import moment from "moment";
import Button from "@/app/components/Button";
import axios from "axios";
import { base_url } from "@/bootapi";
import { toast } from "react-toastify";
import Link from "next/link";
import { CiFileOn } from "react-icons/ci";
const MyComponent = () => {
  const searchParams = useSearchParams();
  const [content, setcontent] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getContent();
  }, []);
  const getContent = async () => {
    setisLoading(true);
    try {
      let res = await fetchParticularClassContent(
        searchParams.get("id"),
        apiToken
      );
      if (res.data.success) {
        console.log("23", res.data);
        setcontent(res.data.content);
      } else {
        setcontent({});
      }
      setisLoading(false);
    } catch (e) {
      setcontent({});
      setisLoading(false);
    }
  };

  const deletecontent = (id) => {
    setisLoading(true);
    axios
      .delete(`${base_url}/teacher/content-upload/media/${id}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          getContent();
        } else {
          toast.error(res.data.message);
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
        toast.error(err?.response?.data?.message || "Something Went Wrong");
      });
  };
  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="class_content_div">
      <h3 className="medium_font font_size_24 my-3">{content?.title}</h3>
      <div className="details_img_div mt-5">
        <div className="classes_content_card ">
          <Image
            className="mb-3 rounded-4"
            src={"/assets/images/teacher-panel/classes-content/card-image.png"}
            alt="image"
            width={300}
            height={243}
          />
          <h4 className="medium_font font_size_16 mb-1">{content.subject}</h4>
          {/* <p className="text_muted font_size_16">{curData.para}</p> */}
        </div>
      </div>

      <div className="other_classes-materials_div mt-4">
        {content?.upload_media &&
          content?.upload_media.map((curData, index) => (
            <div
              key={index}
              className="other_materials_card border rounded-2 p-3 mb-3 d-flex justify-content-between align-items-center"
            >
              <div className="d-flex">
                {/* <Image
                  className="rounded-3 me-3"
                  src={
                    "/assets/images/teacher-panel/classes-content/card-image.png"
                  }
                  alt="image"
                  width={50}
                  height={50}
                /> */}
                <CiFileOn
                  className="fs-2 me-2"
                  style={{ width: 50, height: 50 }}
                />
                <div>
                  <p className="medium_font font_size_16 mb-1">
                    {content?.title}
                  </p>
                  <p className="text_muted font_size_14 m-0">
                    Updated At -{" "}
                    {curData.updated_at &&
                      moment(curData.updated_at).format("ll")}
                  </p>
                </div>
              </div>
              {/* <div onClick={() => deletecontent(curData.id)}>
                <Button text={"Delete"} />
              </div> */}
            </div>
          ))}
      </div>
      <div className="btn_div mt-5">
        <Link href={`/edit-content-upload?id=${content.id}`}>
          <Button text="Edit content" className={"btn_bg_color"} />
        </Link>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
