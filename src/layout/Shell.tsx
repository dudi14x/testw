import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";
import StarField from "../components/StarField";
import ChatWidget from "../components/ChatWidget";

export default function Shell() {
  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto">
      <ParticleBackground />
      <StarField />
      <Navbar />
      <ChatWidget />
      <main className="relative z-10 pt-14 sm:pt-16" role="main">
        <Outlet />
      </main>
    </div>
  );
}