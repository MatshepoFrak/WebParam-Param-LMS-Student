"use client";

import LessonSidebar from "@/ui/lesson/Lesson-sidebar";
import "@/public/scss/styles.scss";

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="rbt-lesson-area bg-color-white">
        <div className="rbt-lesson-content-wrapper">
          <div className="rbt-lesson-leftsidebar">
            <LessonSidebar />
          </div>
          <div className="rbt-lesson-rightsidebar overflow-hidden lesson-video">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
