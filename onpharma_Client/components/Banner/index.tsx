import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import styles from './styles.module.css'

export const Banner = () => {
    return(
        <div className={styles.container}>
            <Swiper
            slidesPerView={1}
            loop={true}
            autoplay ={{
                delay: 1500,
                disableOnInteraction: false
            }}
            modules={[Autoplay]}
            className={styles.swiper}
            >
                <SwiperSlide className={styles.slide}><div className={styles.slideImg}>1</div></SwiperSlide>
                <SwiperSlide className={styles.slide}><div className={styles.slideImg}>2</div></SwiperSlide>
                <SwiperSlide className={styles.slide}><div className={styles.slideImg}>3</div></SwiperSlide>
            </Swiper>
        </div>
    );
}