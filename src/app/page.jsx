"use client"

import Link from 'next/link';

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

//JS
import { updates_data } from "./data/all_updates";

import SessionLoader from "./helper/SessionLoader";

// Zustand
import { useStoreChampion } from "./store";

export default function Page() {
  SessionLoader();

  const championList = useStoreChampion((state) => state.championList);

  // Find the last champion released
  var latestChampionIndex = 1;

  if (championList) {
    latestChampionIndex = championList.findIndex((champ) => {
      return champ.latestChampion === "y";
    });
    console.log(championList[latestChampionIndex]);
  }

  return (
    <section className="homepage">
      <div className="homepage__hero">
        <img
          className="homepage__hero__img"
          src="/assets/Loading_Screen_default.png"
          alt=""
        />
      </div>
      <section className="homepage__update">
        <div className="homepage__update__title">
          <FontAwesomeIcon icon={faArrowsRotate} />
          <h2>Les dernières updates</h2>
          <Link href="https://www.paladins.com/news/" passHref>
            Voir toutes les updates
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <Swiper
          breakpoints={{
            767: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          loop={true}
          modules={[Navigation, Pagination, A11y]}
          navigation={true}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={40}
        >
          {updates_data.updates.slice(0, 5).map((patch, index) => (
            <SwiperSlide key={index}>
              <Link href={patch.link} passHref>
                <img src={`/assets/update/${patch.image}`} alt="" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* <section className="homepage__news">
        <div className="homepage__news__title">
          <FontAwesomeIcon icon={faComments} />
          <h2>Les News</h2>
        </div>
        <div className="homepage__news__container">
            {championList ? (
              <Link
                to={`/champions/${championList[latestChampionIndex].Name}`}
                className="homepage__news__content__champion__card"
              >
                  <img
                    src={championList[latestChampionIndex].ChampionIcon_URL}
                    alt=""
                  />
                  <div className="homepage__news__content__champion__card__title">
                    <h4>{championList[latestChampionIndex].Name}</h4>
                  </div>
              </Link>
            ) : (
              <img
                src="https://placehold.co/200x200?text=Nouveau+Perso"
                alt=""
              />
            )}
          </div>
      </section> */}
    </section>
  );
}
