import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";
import StarField from "../components/StarField";
import OpenAIChat from "../components/OpenAIChat";

export default function Shell() {
  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto">
      <ParticleBackground />
      <StarField />
      <Navbar />
      <OpenAIChat />
      <main className="relative z-10 pt-14 sm:pt-16" role="main">
        <Outlet />
      </main>
    </div>
  );
}