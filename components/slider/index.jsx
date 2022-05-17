import { GamePrev } from 'components'
import SwiperCore, { Autoplay, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import css from './styles.module.css'
import 'swiper/css'
import 'swiper/css/navigation'

export function Slider({ slides }) {
  SwiperCore.use([Autoplay])

  return (
    <Swiper
      breakpoints={{
        701: { slidesPerView: 2 },
        1000: { slidesPerView: 3 },
        1601: { slidesPerView: 5 },
        2000: { slidesPerView: 6 },
      }}
      freeMode={true}
      spaceBetween={30}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay, FreeMode]}
      className={css.slider}
    >
      {slides.map(slide => {
        return (
          <SwiperSlide key={slide.id}>
            <GamePrev game={slide} fullsize />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}