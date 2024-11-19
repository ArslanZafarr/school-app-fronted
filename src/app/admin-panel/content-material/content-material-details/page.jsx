"use client";
import ContentMaterialDataTable from "@/app/components/Tables/ContentMaterialDataTable";
import MobileContentMaterialDataTable from "@/app/components/Tables/MobileScreensTables/ContentMaterialDataTable";
import {
  deleteContentUpload,
  fetchContentMaterialDetail,
} from "@/services/admin/powerclass";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const [content, setcontent] = useState({});
  const router = useRouter(); // Initialize useRouter
  const { apiToken } = useSelector((state) => state.storeAuth);
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    if (searchParams.get("id")) {
      getDetails();
    }
  }, []);
  const getDetails = async () => {
    setisloading(true);
    try {
      let res = await fetchContentMaterialDetail(
        searchParams.get("id"),
        apiToken
      );
      setisloading(false);
      if (res.data.success) {
        setcontent(res.data.content);
      } else {
        setcontent([]);
      }
    } catch (e) {
      setcontent([]);
      setisloading(false);
    }
  };
  const handledelete = async (id) => {
    try {
      let res = await deleteContentUpload(id, apiToken);
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/admin-panel/content-material");
      } else {
        toast.error(res.data.message);
      }
      setisloading(false);
    } catch (e) {
      setisloading(false);
      toast.error(e.message);
    }
  };
  if (isloading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <p>Loading...</p>
      </div>
    );
  return (
    <>
      <div className="school_management_container">
        <div className="school_management_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24">Content Material Data</h2>
        </div>
        {content.id && (
          <div className="School_management_table mt-xxl-5 mt-xl-5 mt-lg-5 mt-md-5">
            <div className="mobile_screen_div d-block d-xxl-none d-xl-none d-lg-none d-md-none">
              <MobileContentMaterialDataTable
                content={content}
                handledelete={handledelete}
              />
            </div>
            <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
              <ContentMaterialDataTable
                content={content}
                handledelete={handledelete}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
