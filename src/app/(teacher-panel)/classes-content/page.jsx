"use client";
import Image from "next/image";
import Button from "@/app/components/Button";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchClassContent } from "@/services/teacher/teacherApiService";
import { useSelector } from "react-redux";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const [isLoading, setisLoading] = useState(false);
  const [content, setcontent] = useState([]);
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    if (searchParams.get("id")) {
      getClassContent();
    }
  }, []);
  const getClassContent = async () => {
    setisLoading(true);
    try {
      let res = await fetchClassContent(
        searchParams.get("id"),
        teacherProfile?.["teacher_profile"]?.["school"]?.["id"],
        apiToken
      );
      setisLoading(false);
      if (res.data.success) {
        setcontent(res.data.content);
      } else {
        setcontent([]);
      }
      console.log("23", res.data);
    } catch (e) {
      setcontent([]);
      setisLoading(false);
      console.log("25", e);
    }
  };
  const classesCard = [
    {
      image: "/assets/images/teacher-panel/classes-content/card-image.png",
      heading: "Unit 1: Forces",
      para: "Physics 201",
    },
    {
      image: "/assets/images/teacher-panel/classes-content/card-image.png",
      heading: "Unit 1: Forces",
      para: "Physics 201",
    },
    {
      image: "/assets/images/teacher-panel/classes-content/card-image.png",
      heading: "Unit 1: Forces",
      para: "Physics 201",
    },
    {
      image: "/assets/images/teacher-panel/classes-content/card-image.png",
      heading: "Unit 1: Forces",
      para: "Physics 201",
    },
    {
      image: "/assets/images/teacher-panel/classes-content/card-image.png",
      heading: "Unit 1: Forces",
      para: "Physics 201",
    },
    {
      image: "/assets/images/teacher-panel/classes-content/card-image.png",
      heading: "Unit 1: Forces",
      para: "Physics 201",
    },
    {
      image: "/assets/images/teacher-panel/classes-content/card-image.png",
      heading: "Unit 1: Forces",
      para: "Physics 201",
    },
    {
      image: "/assets/images/teacher-panel/classes-content/card-image.png",
      heading: "Unit 1: Forces",
      para: "Physics 201",
    },
  ];
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
    <div className="classes_content_div padding tablet_padding">
      <h3 className="medium_font font_size_24 my-3">Class Content</h3>
      <div className="d-flex flex-wrap align-items-center mt-5">
        {content.map((curData, index) => (
          <div key={index} className="classes_content_card me-3">
            <Link
              href={`classes-content/class-content?id=${curData["id"]}`}
              className="text-decoration-none text-dark"
            >
              <Image
                className="mb-3 rounded-4"
                src={
                  "/assets/images/teacher-panel/classes-content/card-image.png"
                }
                alt="image"
                width={300}
                height={160}
              />
              <h4 className="medium_font font_size_16 mb-1">{curData.title}</h4>
              <p className="text_muted font_size_14">{curData.subject}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="btn_div mt-5">
        <Link href={`/content-upload?id=${searchParams.get("grade")}`}>
          <Button text="Upload content" className={"btn_bg_color"} />
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
