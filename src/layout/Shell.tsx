import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";
import StarField from "../components/StarField";

export default function Shell() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <StarField />
      <Navbar />
      <main className="relative z-10 pt-16" role="main">
        <Outlet />
      </main>
    </div>
  );
}