"use client";
import Image from "next/image";
import "./live-class.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [link, setlink] = useState("");
  useEffect(() => {
    getLink();
  }, []);
  const getLink = () => {
    let linktostore = localStorage.getItem("meet_link");
    if (!linktostore) {
      setTimeout(() => {
        getLink();
      }, 1000);
      return;
    }
    setlink(linktostore);
  };
  return (
    <div className="live_class_div tablet_padding">
      <h3 className="medium_font font_size_28">
        Your live class is ready to go!
      </h3>

      <div className="start_class_div my-5">
        <div className="text-center">
          <p className="medium_font font_size_18"> Start your class </p>
          <button
            type="submit"
            onClick={() => {
              window.open(link, "_blank");
            }}
            className="green_btn medium_font font_size_14 py-1 px-3"
          >
            Start Class
          </button>
        </div>
      </div>
      <div className="start_class_div my-5">
        <div className="text-center">
          <p className="medium_font font_size_18"> Invite students </p>
          <p className="font_size_14">
            {" "}
            Send this link to students to join your class.{" "}
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast.success("Link Copied to be shared");
            }}
            className="jamu_btn medium_font font_size_14 py-1 px-3"
          >
            Send link
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <Image
          className="me-2"
          src={"/assets/images/teacher-panel/chain.png"}
          width={50}
          height={50}
          alt="image"
        />
        <div>
          <Link
            href={link}
            className="medium_font font_size_16 text-decoration-none text-dark"
            target="_blank"
          >
            {link}
          </Link>
          <p className="text_muted font_size_14 mb-0">
            Use this link to invite students to join your class.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
