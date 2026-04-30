// Tabs.jsx
import Tab from "./Tab";

export default function Tabs({ tabs, setActiveTab, activeTab }) {
  return (
    <div className="flex flex-wrap gap-3 px-6 pt-6 pb-2">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          genre={tab}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      ))}
    </div>
  );
}
