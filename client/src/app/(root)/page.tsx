import Accessories from './components/sections/Accessories'
import BannerHero from './components/sections/BannerHero'
import MenMostWanted from './components/sections/MenMostWanted'
import MostWanted from './components/sections/MostWanted'
import NewArrivals from './components/sections/NewArrivals'
import Stores from './components/sections/Stores'
import SummerAccessories from './components/sections/SummerAccessories'

export default function Home() {
  return (
    <div>
      <BannerHero />
      <NewArrivals />
      <SummerAccessories />
      <Accessories />
      <MostWanted />
      <MenMostWanted />
      <Stores />
    </div>
  )
}
