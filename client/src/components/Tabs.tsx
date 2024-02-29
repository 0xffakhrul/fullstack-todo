import { FC, useState } from "react";

interface TabsProps {}

const Tabs: FC<TabsProps> = ({}) => {
  const [selectedTab, setSelectedTab] = useState("all");

  const tabs = [
    { id: 1, text: "All", showAll: true },
    { id: 2, text: "Open", showAll: false, filterCompleted: false },
    { id: 3, text: "Completed", showAll: false, filterCompleted: true },
  ];

  return (
    <div>
      <div role="tablist" className="tabs tabs-bordered">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            role="tab"
            className={`tab ${selectedTab === tab.text ? "tab-active" : ""}`}
            onClick={() => setSelectedTab(tab.text)}
          >
            {tab.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tabs;