"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/logbook/logbook-login.module.css";
import { CheckIn, CheckOut } from "@/actions/logbook-actions/logbook-action";

interface LogbookEntry {
  date: string;
  title: string;
  description: string;
  status: string;
  timeRemaining?: string;
  id?: string;
}

const StudentLogbook = () => {
  const [studentEntry, setStudentEntry] = useState<LogbookEntry | null>(null);
  const [workEntry, setWorkEntry] = useState<LogbookEntry | null>(null);
  const [studentTimer, setStudentTimer] = useState<number | null>(null);
  const [workTimer, setWorkTimer] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("school");
  const [rating, setRating] = useState<string>("");

  const handleCheckin = async (
    entry: LogbookEntry | null,
    setEntry: React.Dispatch<React.SetStateAction<LogbookEntry | null>>,
    setTimer: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    if (entry) {
      try {
        const userId = "23764473665632";
        const classId = "4748596856387765";
        const response = await CheckIn(userId, classId);
        const newEntry = {
          ...entry,
          status: "Checked In",
          id: response.data.id,
        };
        setEntry(newEntry);
        setTimer(4 * 60 * 60);
      } catch (error) {
        console.error("Check-in failed", error);
      }
    }
  };

  const handleCheckout = async (
    entry: LogbookEntry | null,
    setEntry: React.Dispatch<React.SetStateAction<LogbookEntry | null>>,
    setTimer: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    if (entry) {
      try {
        const feedback = entry.description;
        const response = await CheckOut(
          entry.id!,
          feedback,
          rating,
          "47485968563874645438"
        );
        const newEntry = { ...entry, status: "Checked Out" };
        setEntry(newEntry);
        setTimer(null);
      } catch (error) {
        console.error("Check-out failed", error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (studentTimer !== null) {
        setStudentTimer((prevTimer) => {
          if (prevTimer && prevTimer > 0) {
            const newTimer = prevTimer - 1;
            const hours = Math.floor(newTimer / 3600);
            const minutes = Math.floor((newTimer % 3600) / 60);
            const seconds = newTimer % 60;
            const timeString = `${hours}h ${minutes}m ${seconds}s remaining`;

            if (studentEntry) {
              const newEntry = { ...studentEntry, timeRemaining: timeString };
              setStudentEntry(newEntry);
            }
            return newTimer;
          } else {
            handleCheckout(studentEntry, setStudentEntry, setStudentTimer);
            return null;
          }
        });
      }

      if (workTimer !== null) {
        setWorkTimer((prevTimer) => {
          if (prevTimer && prevTimer > 0) {
            const newTimer = prevTimer - 1;
            const hours = Math.floor(newTimer / 3600);
            const minutes = Math.floor((newTimer % 3600) / 60);
            const seconds = newTimer % 60;
            const timeString = `${hours}h ${minutes}m ${seconds}s remaining`;

            if (workEntry) {
              const newEntry = { ...workEntry, timeRemaining: timeString };
              setWorkEntry(newEntry);
            }
            return newTimer;
          } else {
            handleCheckout(workEntry, setWorkEntry, setWorkTimer);
            return null;
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [studentTimer, workTimer, studentEntry, workEntry]);

  const addNewEntry = async (
    setEntry: React.Dispatch<React.SetStateAction<LogbookEntry | null>>,
    entry: LogbookEntry | null
  ) => {
    const today = new Date().toLocaleDateString();
    if (!entry || entry.date !== today) {
      const newEntry: LogbookEntry = {
        date: today,
        title: "",
        description: "",
        status: "Checkout",
      };
      setEntry(newEntry);

      try {
        const userId = "23764473665632";
        const classId = "4748596856387765";
        const response = await CheckIn(userId, classId);
        newEntry.id = response.data.id;
        setEntry(newEntry);
      } catch (error) {
        console.error("Failed to add new entry", error);
      }
    }
  };

  const renderForm = (
    entry: LogbookEntry | null,
    setEntry: React.Dispatch<React.SetStateAction<LogbookEntry | null>>,
    setTimer: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    if (!entry) {
      return null;
    }

    return (
      <div
        className={`logbook-entry p-4 mb-4 rounded border ${
          entry.status === "Checked Out" ? "bg-light" : "border-success"
        }`}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5>
            {entry.date} {entry.title}
          </h5>
          {entry.timeRemaining && (
            <span className="text-muted">{entry.timeRemaining}</span>
          )}
          <span className="text-muted">12:00AM</span>
        </div>
        <div className="mt-3">
          <textarea
            className="form-control"
            rows={2}
            placeholder="What did you learn from today's lessons?"
            value={entry.description}
            onChange={(e) => {
              const newEntry = { ...entry, description: e.target.value };
              setEntry(newEntry);
            }}
            readOnly={entry.status === "Checked Out"}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <button
              className="btn btn-outline-success me-2"
              disabled={entry.status === "Checked Out" || rating !== ""}
              onClick={() => setRating("good")}
            >
              <i className="bi bi-emoji-smile"></i> Good
            </button>
            <button
              className="btn btn-outline-secondary me-2"
              disabled={entry.status === "Checked Out" || rating !== ""}
              onClick={() => setRating("okay")}
            >
              <i className="bi bi-emoji-neutral"></i> Okay
            </button>
            <button
              className="btn btn-outline-danger"
              disabled={entry.status === "Checked Out" || rating !== ""}
              onClick={() => setRating("bad")}
            >
              <i className="bi bi-emoji-frown"></i> Bad
            </button>
          </div>
          {entry.status === "Checked Out" ? (
            <button className="btn btn-secondary" disabled>
              {entry.status}
            </button>
          ) : entry.status === "Checked In" ? (
            <button
              className="btn btn-success"
              onClick={() => handleCheckout(entry, setEntry, setTimer)}
            >
              Checkout
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => handleCheckin(entry, setEntry, setTimer)}
            >
              Checkin
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.logbookContainer}`}>
      <div className={styles.icon}>
        <i className="bi bi-journal-bookmark"></i>
        <span className="get-4-color style-3-left logText">Logbook</span>
        <div className="section-title">
          <h4 className="get-4-color">
            <span className={`logText ${styles.activeTabLabel}`}>
              {activeTab === "school" ? "Student" : "Work"}
            </span>
          </h4>
        </div>
      </div>

      <div className={styles.navbar}>
        <button
          className={`btn ${styles.navButton} ${
            activeTab === "school" ? styles.navButtonActive : ""
          }`}
          onClick={() => setActiveTab("school")}
        >
          School
        </button>
        <button
          className={`btn ${styles.navButton} ${
            activeTab === "work" ? styles.navButtonActive : ""
          }`}
          onClick={() => setActiveTab("work")}
        >
          Work
        </button>
      </div>

      <div className="text-end my-3">
        <button
          className="btn btn-primary"
          onClick={() =>
            addNewEntry(
              activeTab === "school" ? setStudentEntry : setWorkEntry,
              activeTab === "school" ? studentEntry : workEntry
            )
          }
        >
          <i className="bi bi-plus"></i> Add Entry
        </button>
      </div>

      <div className={`${styles.logbookCard}`}>
        {activeTab === "school"
          ? renderForm(studentEntry, setStudentEntry, setStudentTimer)
          : renderForm(workEntry, setWorkEntry, setWorkTimer)}
      </div>
    </div>
  );
};

export default StudentLogbook;
