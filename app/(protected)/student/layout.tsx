"use client";

import StudentDashboardSidebar from "@/ui/student/student-enrolled-courses/student-sidebar";
import styles from "@/styles/side-bar/side-bar-hide.module.css";
import InstructorDashboardHeader from "@/ui/dashboard/dashboard-wrapper";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const cookies = new Cookies();

  const loggedInUser = cookies.get("loggedInUser");
  
  useEffect(() => {
    if (!loggedInUser) {
      router.push("/login");
    }
  }, [loggedInUser]);
  

  return (
    <>
      <div className="rbt-page-banner-wrapper">
        {/* <div className="rbt-banner-image" /> */}
      </div>
      
      <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <InstructorDashboardHeader />
              <div className="row g-5">
                <div className={`col-lg-3 ${styles.sidebarHiddenOnMobile}`}>
                  <StudentDashboardSidebar />
                </div>
                <div className="col-lg-9">{children}</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
