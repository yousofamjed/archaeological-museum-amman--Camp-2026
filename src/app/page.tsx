import { EntranceScene } from "@/components/entrance-scene";
import { Landing } from "@/components/landing";
import { MiniMap } from "@/components/mini-map";
import { PitchSection } from "@/components/pitch-section";
import { RoomSection } from "@/components/room-section";
import { SiteHeader } from "@/components/site-header";
import { StairsTransition } from "@/components/stairs-transition";
import { WalkthroughProvider } from "@/components/walkthrough-provider";
import { ROOMS } from "@/content/museum";

export default function Home() {
  const floorOne = ROOMS.filter((r) => r.floor === 1);
  const floorTwo = ROOMS.filter((r) => r.floor === 2);

  return (
    <WalkthroughProvider>
      <SiteHeader />
      <main>
        <Landing />
        <EntranceScene />
        {floorOne.map((room) => (
          <RoomSection key={room.id} room={room} />
        ))}
        <StairsTransition />
        {floorTwo.map((room) => (
          <RoomSection key={room.id} room={room} />
        ))}
        <PitchSection />
      </main>
      <MiniMap />
    </WalkthroughProvider>
  );
}
