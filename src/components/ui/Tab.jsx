// Tab.jsx
export default function Tab({ genre, setActiveTab, activeTab }) {
  const isActive = activeTab === genre.name;

  return (
    <button
      onClick={() => setActiveTab(genre.name)}
      className={`
        px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
        border
        ${
          isActive
            ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
            : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
        }
      `}
    >
      {genre.name}
    </button>
  );
}
