import { FC, useState } from "react";
import { Task } from "./List";

interface HeaderProps {
  tasks: Task[];
}

const Header: FC<HeaderProps> = ({ tasks }) => {
  const [selectedTab, setSelectedTab] = useState("all");
  console.log(selectedTab);

  return (
    <div className="pb-4">
      <h1 className="font-bold text-3xl pb-4 text-secondary">
        You have {tasks.length > 0 ? tasks.length : "no"} tasks.
      </h1>
      {/* <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab ${selectedTab === "all" ? "tab-active" : ""}`}
          onClick={() => setSelectedTab("all")}
        >
          All
        </a>
        <a
          role="tab"
          className={`tab ${selectedTab === "pending" ? "tab-active" : ""}`}
          onClick={() => setSelectedTab("pending")}
        >
          Pending
        </a>
        <a
          role="tab"
          className={`tab ${selectedTab === "completed" ? "tab-active" : ""}`}
          onClick={() => setSelectedTab("completed")}
        >
          Completed
        </a>
      </div> */}
    </div>
  );
};

export default Header;
