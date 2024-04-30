"use client"

import React from "react";
import { usePathname } from "next/navigation";

// Component
import HeroBanner from "@/components/Championpage/HeroBanner";
import Abilities from "@/components/Championpage/Abilities";
import TalentsAndCards from "@/components/Championpage/TalentsAndCards";

// JS
import SessionLoader from "@/app/helper/SessionLoader";
import { all_champion_list } from "@/app/data/all_champions";

// Zustand
import { useStoreChampion } from "@/app/store";

function Championpage() {
  SessionLoader();
  const championList = useStoreChampion((state) => state.championList);

  const location = usePathname().replace(/_/g, ' ');
  var champion;

  // Get Champion Info by the location

  if (championList == 0) {
    console.log("null");
    const championFilter = all_champion_list.champions_list.filter(
      (champions) => {
        return (
          champions.Name.toUpperCase() ===
          location.substring(10).toUpperCase()
        );
      }
    );
    champion = championFilter[0];
  } else if (championList !== null)
    {
    const championFilter = championList.filter(
      (champions) => {
        return (
          champions.Name.toUpperCase() ===
          location.substring(10).toUpperCase()
        );
      }
    );
    champion = championFilter[0];
  }

  return (
    <div className="champion__page">
    {champion && (
      <>
        <HeroBanner
          champion_name={champion.Name}
          champion_lore={champion.Lore}
          champion_health={champion.Health}
          champion_roles={champion.Roles}
        />
        <Abilities champion={champion} />
        <TalentsAndCards champion_id={champion.id}/>
      </>
    )}
  </div>
    
  );
}

export default Championpage;
