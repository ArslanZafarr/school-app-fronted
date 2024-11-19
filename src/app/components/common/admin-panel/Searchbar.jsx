"use client";
import "./searchbar.css";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { useUserProfileQuery } from "@/redux/features/admin-panel/profile/profileApi";
import moment from "moment";

const Searchbar = () => {
  const { data, isLoading, isError } = useUserProfileQuery();
  console.log("🚀 ~ admin Searchbar ~ data:", data);

  let profileContent;

  if (isLoading) {
    profileContent = <div>Loading...</div>;
  } else if (isError) {
    profileContent = <div>Error loading profile data.</div>;
  } else {
    const { full_name, image } = data?.user?.profile;
    const profileImage = "/assets/images/dashboard/profile-image.png";
    // const profileImage = image
    //   ? `/${image}`
    //   : "/assets/images/dashboard/profile-image.png";

    profileContent = (
      <Link
        href="/admin-panel/settings"
        className="text-decoration-none text-dark d-flex text-xxl-start text-xl-start text-lg-start text-md-center text-sm-center align-items-center"
      >
        <Image
          className="profile_image"
          src={profileImage}
          alt="profile_image"
          width={50}
          height={50}
        />
        <div className="profile_name ps-2">
          <p className="semiBold_font font_size_12 m-0"> {full_name} </p>
          <p className="font_size_9 m-0"> {data?.user?.email} </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="search_bar_div">
      <div className="my-xxl-2 my-xl-2 my-lg-2 d-flex align-items-center flex-wrap search_bar_width">
        <div className="position-relative search-box me-xxl-5">
          <form>
            <Link href={"#"} className="btn-search text-dark">
              <CiSearch className="position-absolute search_input_icon" />
            </Link>
            <input
              className="search_input input-search"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="position-relative ms-0 me-0 ms-md-2 me-md-4 me-xxl-5">
          <FaBell className="bell_icon" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            9<span className="visually-hidden">unread messages</span>
          </span>
        </div>
        <div className="Calendar_div d-none d-xxl-block d-xl-block me-xxl-5">
          <div className="d-flex justify-content-between align-items-center">
            <CiCalendar className="Calendar_icon" />
            <p className="mb-0 ms-2"> {moment().format("dddd, MMMM D")} </p>
          </div>
        </div>
        <div className="profile_div me-xxl-4 me-xl-4">{profileContent}</div>
      </div>
    </div>
  );
};

export default Searchbar;
