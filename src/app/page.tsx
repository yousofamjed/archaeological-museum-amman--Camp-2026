import { ArrivalScene } from "@/components/arrival-scene";
import { EntranceScene } from "@/components/entrance-scene";
import { GiftShopSection } from "@/components/gift-shop-section";
import { Landing, LandingIntro } from "@/components/landing";
import { MiniMap } from "@/components/mini-map";
import { ReviewsSection } from "@/components/reviews-section";
import { RoomMusic } from "@/components/room-music";
import { RoomSection } from "@/components/room-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StairsTransition } from "@/components/stairs-transition";
import { WalkthroughProvider } from "@/components/walkthrough-provider";
import { ROOMS } from "@/content/museum";

export default function Home() {
  const floorOne = ROOMS.filter((r) => r.floor === 1);
  const floorZero = ROOMS.filter((r) => r.floor === 0);

  return (
    <WalkthroughProvider>
      <SiteHeader />
      <main>
        <LandingIntro />
        <ReviewsSection />
        <Landing />
        <ArrivalScene />
        <StairsTransition
          stop="front-steps"
          direction="up"
          from="The Citadel"
          to="Floor 1"
          title="Up the front steps"
          titleAr="صعوداً على الدرج الأمامي"
          note="The 1951 entrance steps stay as they are; a new ramp alongside them makes the way in step-free."
          steps={8}
          className="h-[140svh]"
        />
        <EntranceScene />
        {floorOne.map((room) => (
          <RoomSection key={room.id} room={room} />
        ))}
        <StairsTransition
          stop="stairs"
          direction="down"
          from="Floor 1"
          to="Floor 0"
          title="Down the stairs to the classical world"
          titleAr="نزولاً إلى العصور الكلاسيكية"
          note="Stairs only. No lift shaft is cut into the 1951 structure, so the building itself is untouched."
        />
        {floorZero.map((room) => (
          <RoomSection key={room.id} room={room} />
        ))}
        <GiftShopSection />
      </main>
      <SiteFooter />
      <MiniMap />
      <RoomMusic />
    </WalkthroughProvider>
  );
}
