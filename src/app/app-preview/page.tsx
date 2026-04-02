"use client";

import { useState, useEffect, type ReactNode } from "react";
import {
  Home,
  Map,
  Phone,
  Download,
  User,
  Wifi,
  WifiOff,
  AlertTriangle,
  ChevronRight,
  Bell,
  Search,
  Settings,
  MapPin,
  Compass,
  FileText,
  Calendar,
  Shield,
  Flame,
  Heart,
  CheckCircle2,
  HardDriveDownload,
  Globe,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type Tab = "home" | "map" | "emergency" | "offline" | "profile";

// ─── Data ───────────────────────────────────────────────────────────────────

const EMERGENCY_NUMBERS = [
  { label: "Medical Emergency", number: "108", color: "#ef4444", icon: Heart },
  { label: "Police", number: "100", color: "#3b82f6", icon: Shield },
  { label: "Fire Brigade", number: "101", color: "#f97316", icon: Flame },
  { label: "Disaster Mgmt", number: "1070", color: "#a855f7", icon: AlertTriangle },
  { label: "Child Helpline", number: "1098", color: "#ec4899", icon: Heart },
  { label: "Women Helpline", number: "1091", color: "#14b8a6", icon: Shield },
  { label: "Tourist Helpline", number: "1800-11-1363", color: "#22c55e", icon: MapPin },
];

const DISTRICT_CONTACTS = [
  { district: "Tawang", hospital: "03794-222239", police: "03794-222236" },
  { district: "Itanagar", hospital: "0360-2350331", police: "0360-2212351" },
  { district: "Ziro", hospital: "03788-224440", police: "03788-224422" },
  { district: "Pasighat", hospital: "0368-2222411", police: "0368-2222234" },
  { district: "Bomdila", hospital: "03782-222244", police: "03782-222322" },
];

const DESTINATIONS = [
  { name: "Tawang", tag: "3048m", emoji: "⛪", color: "#6366f1" },
  { name: "Ziro Valley", tag: "UNESCO", emoji: "🌾", color: "#10b981" },
  { name: "Namdapha", tag: "Tiger Reserve", emoji: "🐯", color: "#f59e0b" },
  { name: "Mechuka", tag: "Hidden Gem", emoji: "🏔️", color: "#0ea5e9" },
];

const OFFLINE_PACKS = [
  { id: "maps-west", label: "West AR Maps (Tawang, Bomdila)", size: "120 MB", downloaded: false },
  { id: "maps-central", label: "Central AR Maps (Itanagar, Ziro)", size: "95 MB", downloaded: true },
  { id: "maps-east", label: "East AR Maps (Pasighat, Namdapha)", size: "110 MB", downloaded: false },
  { id: "guides", label: "All Travel Guides", size: "85 MB", downloaded: true },
  { id: "emergency", label: "Emergency Data (Always Included)", size: "2 MB", downloaded: true },
];

// ─── Sub-screens ─────────────────────────────────────────────────────────────

function HomeScreen() {
  const quickActions = [
    { label: "Travel Guides", icon: Compass, href: "#", color: "#6366f1" },
    { label: "ILP Permit", icon: FileText, href: "#", color: "#0ea5e9" },
    { label: "My Itinerary", icon: Calendar, href: "#", color: "#f59e0b" },
    { label: "Safety Tips", icon: Shield, href: "#", color: "#10b981" },
  ];

  return (
    <div className="flex flex-col gap-4 pb-2">
      {/* Greeting */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white">
        <p className="text-sm font-medium text-emerald-100 mb-1">Welcome to</p>
        <h2 className="text-xl font-bold">Arunachal Explore</h2>
        <p className="text-xs text-emerald-200 mt-1">Land of the Rising Sun 🌅</p>
        <button className="mt-3 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1 transition-colors">
          Start Exploring <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Quick Actions */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</p>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${a.color}22` }}
                >
                  <Icon className="h-5 w-5" style={{ color: a.color }} />
                </span>
                <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">
                  {a.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SOS Banner */}
      <button className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-2xl p-4 flex items-center justify-between transition-colors shadow-lg shadow-red-200">
        <div>
          <p className="font-bold text-base">🆘 SOS Emergency</p>
          <p className="text-xs text-red-100">Tap to alert local authorities & share location</p>
        </div>
        <div className="bg-white/20 rounded-full p-2">
          <AlertTriangle className="h-6 w-6" />
        </div>
      </button>

      {/* Destinations */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Top Destinations</p>
        <div className="flex flex-col gap-2">
          {DESTINATIONS.map((d) => (
            <button
              key={d.name}
              className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{d.emoji}</span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">{d.name}</p>
                  <p className="text-xs text-gray-400">{d.tag}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MapScreen() {
  return (
    <div className="flex flex-col gap-4 pb-2">
      <div>
        <h3 className="text-base font-bold text-gray-800 mb-1">District Map</h3>
        <p className="text-xs text-gray-500">Interactive map with all key locations</p>
      </div>

      {/* Map Placeholder */}
      <div className="relative bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 rounded-2xl overflow-hidden h-52 flex items-center justify-center shadow-inner">
        {/* Stylized map illustration */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
            <path d="M0 100 Q80 60 160 80 Q240 100 320 70 L320 200 L0 200 Z" fill="#10b981" opacity="0.3" />
            <path d="M0 130 Q100 100 200 120 Q280 130 320 110 L320 200 L0 200 Z" fill="#059669" opacity="0.2" />
            <circle cx="60" cy="80" r="6" fill="#ef4444" />
            <circle cx="160" cy="90" r="6" fill="#ef4444" />
            <circle cx="240" cy="75" r="6" fill="#ef4444" />
            <circle cx="120" cy="120" r="4" fill="#3b82f6" />
            <circle cx="200" cy="130" r="4" fill="#3b82f6" />
            <path d="M50 150 Q100 100 160 90 Q220 80 260 70" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
          </svg>
        </div>
        <div className="relative flex flex-col items-center gap-2 text-emerald-700">
          <Map className="h-10 w-10" />
          <p className="text-sm font-semibold">Arunachal Pradesh</p>
          <p className="text-xs text-emerald-600 bg-white/70 px-3 py-1 rounded-full">25 districts • Interactive</p>
        </div>
      </div>

      {/* Map Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", "Monasteries", "Treks", "Hospitals", "Police", "Hotels"].map((f) => (
          <button
            key={f}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 transition-colors ${
              f === "All"
                ? "bg-emerald-600 text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Nearby Pins */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Nearby Landmarks</p>
        <div className="flex flex-col gap-2">
          {[
            { name: "Tawang Monastery", type: "Heritage", dist: "0.8 km", color: "#6366f1" },
            { name: "TRIHMS Hospital", type: "Medical", dist: "2.1 km", color: "#ef4444" },
            { name: "Itanagar Police HQ", type: "Police", dist: "3.4 km", color: "#3b82f6" },
          ].map((p) => (
            <div key={p.name} className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg" style={{ backgroundColor: `${p.color}22` }}>
                  <MapPin className="h-4 w-4" style={{ color: p.color }} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.type}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium">{p.dist}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmergencyScreen() {
  return (
    <div className="flex flex-col gap-4 pb-2">
      {/* SOS */}
      <button className="bg-red-500 hover:bg-red-600 active:scale-95 text-white rounded-2xl p-5 flex flex-col items-center gap-2 transition-all shadow-lg shadow-red-200">
        <AlertTriangle className="h-8 w-8" />
        <span className="text-lg font-bold">EMERGENCY SOS</span>
        <span className="text-xs text-red-100">Tap & hold 3 seconds to alert authorities</span>
      </button>

      {/* National Numbers */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">National Helplines</p>
        <div className="grid grid-cols-2 gap-2">
          {EMERGENCY_NUMBERS.map((e) => {
            const Icon = e.icon;
            return (
              <a
                key={e.number}
                href={`tel:${e.number}`}
                className="bg-white rounded-xl p-3 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow active:scale-95"
              >
                <span className="p-2 rounded-lg w-fit" style={{ backgroundColor: `${e.color}22` }}>
                  <Icon className="h-4 w-4" style={{ color: e.color }} />
                </span>
                <div>
                  <p className="text-xs text-gray-500 leading-none">{e.label}</p>
                  <p className="text-base font-bold mt-0.5" style={{ color: e.color }}>
                    {e.number}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* District Contacts */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">District Contacts</p>
        <div className="flex flex-col gap-2">
          {DISTRICT_CONTACTS.map((d) => (
            <div key={d.district} className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-sm font-bold text-gray-800 mb-2">{d.district}</p>
              <div className="flex gap-2">
                <a
                  href={`tel:${d.hospital}`}
                  className="flex-1 bg-red-50 rounded-lg p-2 flex flex-col items-center gap-1"
                >
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-[10px] font-semibold text-red-600">{d.hospital}</span>
                </a>
                <a
                  href={`tel:${d.police}`}
                  className="flex-1 bg-blue-50 rounded-lg p-2 flex flex-col items-center gap-1"
                >
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-[10px] font-semibold text-blue-600">{d.police}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OfflineScreen() {
  const [packs, setPacks] = useState(OFFLINE_PACKS);

  function toggleDownload(id: string) {
    setPacks((prev) =>
      prev.map((p) => (p.id === id ? { ...p, downloaded: !p.downloaded } : p))
    );
  }

  const downloadedCount = packs.filter((p) => p.downloaded).length;

  return (
    <div className="flex flex-col gap-4 pb-2">
      {/* Status */}
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-4 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <WifiOff className="h-4 w-4 text-yellow-300" />
            <span className="text-xs font-semibold text-yellow-300">Offline Mode Ready</span>
          </div>
          <p className="text-sm font-bold">{downloadedCount}/{packs.length} packs downloaded</p>
          <p className="text-xs text-slate-400 mt-0.5">Emergency data is always available offline</p>
        </div>
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(#10b981 ${(downloadedCount / packs.length) * 360}deg, #374151 0deg)`,
          }}
        >
          <div className="h-9 w-9 bg-slate-800 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">{Math.round((downloadedCount / packs.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* WiFi reminder */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
        <Wifi className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">
          Connect to WiFi before your trip to download maps and guides for offline use in remote areas.
        </p>
      </div>

      {/* Download Packs */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Offline Packs</p>
        <div className="flex flex-col gap-2">
          {packs.map((pack) => (
            <div key={pack.id} className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <span
                  className={`p-2 rounded-lg ${
                    pack.downloaded ? "bg-emerald-100" : "bg-gray-100"
                  }`}
                >
                  {pack.downloaded ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <HardDriveDownload className="h-4 w-4 text-gray-400" />
                  )}
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-800 leading-snug max-w-[170px]">
                    {pack.label}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{pack.size}</p>
                </div>
              </div>
              <button
                onClick={() => toggleDownload(pack.id)}
                disabled={pack.id === "emergency"}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  pack.downloaded
                    ? "bg-red-50 text-red-500 hover:bg-red-100"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {pack.downloaded ? "Remove" : "Download"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="flex flex-col gap-4 pb-2">
      {/* Avatar */}
      <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
          T
        </div>
        <div>
          <p className="font-bold text-gray-800">Tourist</p>
          <p className="text-xs text-gray-400">tourist@example.com</p>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            ILP Verified ✓
          </span>
        </div>
      </div>

      {/* My Trips */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">My Trips</p>
        <div className="flex flex-col gap-2">
          {[
            { name: "Tawang Winter Trip", date: "Dec 2024", status: "Upcoming" },
            { name: "Ziro Festival Visit", date: "Sep 2024", status: "Completed" },
          ].map((trip) => (
            <div key={trip.name} className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-gray-800">{trip.name}</p>
                <p className="text-xs text-gray-400">{trip.date}</p>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                  trip.status === "Upcoming"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {trip.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Settings</p>
        <div className="flex flex-col gap-1">
          {[
            { label: "Notifications", icon: Bell },
            { label: "Language", icon: Globe },
            { label: "App Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Version */}
      <p className="text-center text-xs text-gray-400 py-2">Arunachal Explore v1.0.0</p>
    </div>
  );
}

// ─── Desktop Block ────────────────────────────────────────────────────────────

function DesktopBlock() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8">
      <div className="max-w-md text-center bg-white rounded-3xl p-10 shadow-xl">
        <div className="text-6xl mb-4">📱</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Mobile Only</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          This page is the exclusive preview of the{" "}
          <span className="font-semibold text-emerald-700">Arunachal Explore</span>{" "}
          mobile app. Please open it on your{" "}
          <strong>Android or iOS device</strong>.
        </p>
        <div className="bg-gray-50 rounded-2xl p-5 flex flex-col items-center gap-3">
          <div className="h-28 w-28 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-xs font-medium">
            QR Code
            <br />
            (coming soon)
          </div>
          <p className="text-xs text-gray-400">Scan to open on mobile</p>
        </div>
        <p className="mt-5 text-xs text-gray-400">
          API endpoint:{" "}
          <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-emerald-700">
            GET /api/mobile-app
          </code>
        </p>
      </div>
    </div>
  );
}

// ─── Main App Shell ───────────────────────────────────────────────────────────

export default function AppPreviewPage() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    function check() {
      const ua = navigator.userAgent;
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const smallScreen = window.innerWidth < 768;
      setIsMobile(mobileUA || smallScreen);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hydration guard
  if (isMobile === null) return null;

  // Block desktop
  if (!isMobile) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white">
        <DesktopBlock />
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "map", label: "Map", icon: Map },
    { id: "emergency", label: "SOS", icon: Phone },
    { id: "offline", label: "Offline", icon: Download },
    { id: "profile", label: "Profile", icon: User },
  ];

  const screenMap: Record<Tab, ReactNode> = {
    home: <HomeScreen />,
    map: <MapScreen />,
    emergency: <EmergencyScreen />,
    offline: <OfflineScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-100 flex flex-col overflow-hidden">
      {/* Status Bar */}
      <div className="bg-emerald-700 text-white px-4 pt-2 pb-2 flex items-center justify-between shrink-0">
        <span className="text-xs font-semibold">Arunachal Explore</span>
        <div className="flex items-center gap-2 text-[11px] text-emerald-200">
          <Wifi className="h-3 w-3" />
          <span>GPS</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 shrink-0 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-base font-bold text-gray-900 capitalize">
            {activeTab === "home"
              ? "Explore Arunachal"
              : activeTab === "emergency"
              ? "Emergency & SOS"
              : activeTab === "offline"
              ? "Offline Content"
              : activeTab === "map"
              ? "Interactive Map"
              : "My Profile"}
          </h1>
          <p className="text-xs text-gray-400">
            {activeTab === "home" && "Land of the Rising Sun 🌅"}
            {activeTab === "map" && "25 districts • Offline Maps"}
            {activeTab === "emergency" && "Tap any number to call"}
            {activeTab === "offline" && "Download for offline use"}
            {activeTab === "profile" && "Manage your account"}
          </p>
        </div>
        {activeTab === "home" && (
          <button className="bg-gray-100 p-2 rounded-xl">
            <Search className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {screenMap[activeTab]}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isEmergency = tab.id === "emergency";
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center py-2 gap-1 transition-colors ${
                  isEmergency
                    ? "relative -mt-5"
                    : ""
                }`}
              >
                {isEmergency ? (
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isActive ? "bg-red-600 scale-105" : "bg-red-500"
                    }`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                ) : (
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      isActive ? "text-emerald-600" : "text-gray-400"
                    }`}
                  />
                )}
                <span
                  className={`text-[10px] font-semibold transition-colors ${
                    isEmergency
                      ? isActive
                        ? "text-red-600"
                        : "text-gray-400"
                      : isActive
                      ? "text-emerald-600"
                      : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
        {/* Home indicator */}
        <div className="h-1 flex justify-center pb-1">
          <div className="w-24 h-1 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
