"use client";
import AttendenceTabs from "@/app/components/Tabs/Attendence/AttendenceTabs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const MyComponent = () => {
  const searchParams = useSearchParams();
  return (
    <div className="padding tablet_padding">
      <h3 className="medium_font font_size_24 "> Attendance Tracking</h3>
      <AttendenceTabs
        classid={searchParams.get("id")}
        subjectid={searchParams.get("subjectid")}
      />
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
