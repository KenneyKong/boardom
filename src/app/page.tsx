import SeekWall from '@/components/SeekWall';

export default function Home() {
  const onlineUsers = [
    { name: "Raynor_Jim", status: "online" },
    { name: "Kerrigan_QoB", status: "online" },
    { name: (
      <span>
        <span className="inline-block mr-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        Zeratul_DT
      </span>
    ), status: "away" },
    { name: "Artanis_HT", status: "online" },
    { name: "Fenix_Zealot", status: "online" },
    { name: "Nova_Ghost", status: "online" },
    { name: (
      <span>
        <span className="inline-block mr-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        Tassadar_HT
      </span>
    ), status: "away" },
    { name: "Tychus_Marine", status: "online" },
    { name: "Zagara_BW", status: "online" },
    { name: (
      <span>
        <span className="inline-block mr-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        Alarak_HC
      </span>
    ), status: "away" },
    { name: "Stukov_Inf", status: "online" },
    { name: "Dehaka_PW", status: "online" },
    { name: "Vorazun_DT", status: "online" },
    { name: (
      <span>
        <span className="inline-block mr-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        Swann_Mech
      </span>
    ), status: "away" },
    { name: "Karax_Phase", status: "online" }
  ];

  const trendingTopics = [
    { title: "Zerg Rush Strategies", count: 156 },
    { title: "Protoss Shield Upgrades", count: 143 },
    { title: "Terran Mech Build", count: 128 },
    { title: "Map: Lost Temple", count: 98 },
    { title: "Pro League Finals", count: 87 },
    { title: "Hydralisk Den Timing", count: 82 },
    { title: "Carrier Micro Tips", count: 76 },
    { title: "Ghost vs High Templar", count: 71 },
    { title: "Map: Antiga Shipyard", count: 65 },
    { title: "Baneling Bust Defense", count: 63 },
    { title: "Dark Templar Builds", count: 58 },
    { title: "Marine Split Challenge", count: 54 },
    { title: "Brood Lord Transitions", count: 49 },
    { title: "Warp Prism Micro", count: 45 },
    { title: "Battlecruiser Rush", count: 42 }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] bg-[url('/images/rustymetal.png')] bg-cover bg-fixed">
      <div className="container mx-auto px-4">
        <h1 className="font-['Metal_Mania'] text-center py-8 relative">
          <span className="chrome-logo">
            BOARDOM.NET
          </span>
        </h1>
        
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="sidebar rounded-lg">
            <h2 className="sidebar-title">Online Users</h2>
            <ul className="user-list">
              {onlineUsers.map((user, index) => (
                <li key={index} className={`user-item ${user.status}`}>
                  {user.name}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <SeekWall />
          </div>

          {/* Right Sidebar */}
          <aside className="sidebar rounded-lg">
            <h2 className="sidebar-title">Trending Topics</h2>
            <ul className="trending-list">
              {trendingTopics.map((topic, index) => (
                <li key={index} className="trending-item">
                  #{topic.title}
                  <span className="text-amber-500 ml-2">({topic.count})</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
