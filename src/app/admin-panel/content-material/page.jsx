"use client";
import Button from "@/app/components/Button";
import ContentMaterialCard from "@/app/components/Cards/ContentMaterialCard";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { fetchContentMaterial } from "@/services/admin/powerclass";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const [content, setcontent] = useState([]);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    if (apiToken) {
      getContent(currentPage);
    }
  }, [apiToken]);
  const getContent = async (currentpage) => {
    setCurrentPage(currentpage);
    try {
      let res = await fetchContentMaterial(currentpage, apiToken);
      setcontent(res.data.content);
      settotalpages(res.data.pagination.totalPages ?? 1);
      if (res.data.content.length === 0) {
        toast.error("No Data Available");
      }
    } catch (e) {
      toast.error("No Data Available");
      setcontent([]);
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getContent(val);
  };
  return (
    <>
      <div className="content_material_div">
        <div className="content_material_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Content Materials </h2>
          <Link href="/admin-panel/content-upload">
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="Upload Now"
              className=""
            />
          </Link>
        </div>
        <div className="content_material_card_div mt-5 d-flex flex-wrap align-items-center">
          <ContentMaterialCard content={content} />
        </div>
        <div className="application_pagination_div mt-5">
          <ResponsivePagination
            current={currentPage}
            total={totalpages}
            onPageChange={handlepagechange}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
