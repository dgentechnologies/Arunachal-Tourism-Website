"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Star, CalendarDays, Leaf, Filter, TrendingUp, TreePine, Users, Trash2 } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function WildlifePage() {
  return (
    <main>
      {/* Hero Section - bleeds up behind the transparent fixed nav */}
      <div className="-mt-16">
        <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Clouded Leopard in Arunachal Forest"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOI1MI0tAfzfXDHAhtE5QFytzi0ZvAC4C3yEoaHC2kW0hiGrDbTuazpJRdc13CHbJBTDLze4RcGqH2Ca2mSFXlcTN75nZYCxapPG9eZcH_Fefzg9H-b6z1LkHW04warIJvGc3YMXx6P7sElXdKJEisM1xKFEascaTkGKcdqS25AT_61nb_8Ldoi92PlAYoJz16ZRCIiuNrNSzzEwjZ01OU6AazkuwGS8SjlKLlDirl4P2FZcBm6jqOoAWZJ537cjy_BxsuAIEWYVI"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-8 lg:px-12 w-full">
          <ScrollReveal variant="up" className="max-w-3xl space-y-4 md:space-y-6">
            <span className="inline-block px-3 md:px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-medium text-xs md:text-sm tracking-widest uppercase animate-pulse">
              The Wild Pulse of the Eastern Himalayas
            </span>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold leading-[1.1] tracking-tight">
              Where the <br />
              <span className="text-primary-container animate-pulse">Clouds Meet</span> the Earth.
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-stone-200 max-w-xl font-light leading-relaxed">
              Venture into the pristine sanctuaries of Arunachal Pradesh, where the rare Red Panda thrives and the elusive Snow Leopard patrols the peaks. An ecosystem untouched by time.
            </p>
            <div className="pt-6 md:pt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="bg-primary text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition-all duration-300 active:scale-95">
                Explore the Wild Trails
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 active:scale-95">
                Watch the Documentary
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
      </div>

      {/* Featured Species: Bento Grid */}
      <section className="py-16 md:py-20 lg:py-24 px-6 md:px-8 lg:px-12 max-w-screen-2xl mx-auto">
        <ScrollReveal variant="up">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-on-surface">
                Encounter the Unseen
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                From the rhythmic call of the Hoolock Gibbon to the silent glide of the Snow Leopard, discover species that exist nowhere else on Earth.
              </p>
            </div>
            <div className="flex gap-4 self-start md:self-auto">
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary-container/20 transition-all">
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary-container/20 transition-all">
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[800px]">
          {/* Great Hornbill - Large Card */}
          <ScrollReveal variant="left" className="md:col-span-8 group relative overflow-hidden rounded-2xl md:rounded-[3rem] bg-surface-container-low shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[400px] md:min-h-0">
            <Image
              alt="Great Hornbill"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr0W8iPi4qDg2cxHepS9IqTX4p6a3C8dTrmTSjNo9s-RpCPQVCYHdVQAKZBiSaj-dsU24x7lVa8ubUeKEchmum7yMFFHqBqIs7SmvQybbe49txVfNRIcUHj31cwzHDwOIY3j37amAXhgsIHrb1F0VMjrPpW8hDbfJy__rGqLfFjo_1EvR9CoQMt4bKXEwxfEqAYmbI6tk8-fmQ3feIatVFDfGjvL-KJku9_IVoKCZxHJXEpqjviuHnep2sStDiC4YY5yU9MrGmdFk"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 md:p-10 lg:p-12 flex flex-col justify-end transition-all duration-500 group-hover:from-black/90">
              <h3 className="text-white font-headline text-2xl md:text-3xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">Great Hornbill</h3>
              <p className="text-stone-300 text-sm md:text-base max-w-md transform transition-all duration-300 group-hover:text-white">
                The state bird and a cultural icon, known for its majestic presence and resonant calls echoing through the canopy.
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            {/* Hoolock Gibbon */}
            <ScrollReveal variant="right" delay={100} className="group relative overflow-hidden rounded-xl md:rounded-[2rem] bg-surface-container-low hover:shadow-xl transition-all duration-500">
              <Image
                alt="Hoolock Gibbon"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4knN1-PdVuSPbNVjmH5Izs-m8DHd4CWnX0HYe90IUPwM0CB7SEzAzN3cgfJJD9ldp7DROt-2QVNL9-Z19HNTeRv4LCfSWAJEFA9Jn8XZ2QyblKsQ0qY7LsHjCbLr7E6w8fLCxx5274u0Va9i6nZMQJJ3QsFvoHUv_YQ0L5j0yWMNVN8Ri4JqrpOF851zHDBYtt6YNr04ht-5wEvqz1oZ7m7f3itOqYBYO8Sgwp1MAldktg_4EWOFUbU2CdIkcExoNxsVkCl702uE"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end transition-all duration-500 group-hover:from-black/90">
                <h3 className="text-white font-headline text-2xl font-bold mb-1 transform transition-transform duration-300 group-hover:translate-y-[-4px]">Hoolock Gibbon</h3>
                <p className="text-stone-300 text-sm transform transition-all duration-300 group-hover:text-white">
                  India's only ape, performing acrobatic feats in the evergreen forests of Namdapha.
                </p>
              </div>
            </ScrollReveal>

            {/* Red Panda */}
            <ScrollReveal variant="right" delay={200} className="group relative overflow-hidden rounded-xl md:rounded-[2rem] bg-surface-container-low hover:shadow-xl transition-all duration-500">
              <Image
                alt="Red Panda"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFxtMFJjK_L3jlu2IAOn0eHPxpBUoUjTulUUOaR7dQvTgomyBrRM393Gy4oDklyDehyTiwxbMttdT2PIjrndthFGcwadEaLGsOKBgKOeUVk_Z90gPUba-NWYrpP8P7mOO2042GbD2iyVCzsjXKBhL_4Nz27EvWaPuM_-b0yZwlE0ecbfLeQNcPUAyomKYwbZxT5Qv0YctOdPSqi06xlIwHTRiCCcTQXjXxGfSC4WIegJGxah3q9taTkYC02AUZW9dA8UA1pYhNwyM"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end transition-all duration-500 group-hover:from-black/90">
                <h3 className="text-white font-headline text-2xl font-bold mb-1 transform transition-transform duration-300 group-hover:translate-y-[-4px]">Red Panda</h3>
                <p className="text-stone-300 text-sm transform transition-all duration-300 group-hover:text-white">
                  A shy inhabitant of the high-altitude bamboo thickets, emerging only at twilight.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* National Parks Section */}
      <section className="bg-surface-container-low py-24 px-8 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <ScrollReveal variant="up">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-6xl font-bold text-on-surface mb-6">
                Sanctuaries of the Sacred
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                Vast protected expanses that serve as the last refuge for endangered biodiversity across thousands of vertical meters.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Namdapha National Park */}
            <ScrollReveal variant="up" delay={0}>
              <div className="bg-surface-container-lowest p-6 rounded-xl md:rounded-tl-[3rem] md:rounded-br-[3rem] shadow-sm flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="h-64 rounded-xl overflow-hidden mb-6 relative">
                  <Image
                    alt="Namdapha Landscape"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={PlaceHolderImages.find(img => img.id === "dest-namdapha")?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDmvtnNWIjNqJ4egYlC-L9M8HsXvSFBooQ46Q7KQ35mtR1qAy_EZDCZsV33iqLstjXV43pO3-nSd_gT2FK4_yj3DJSLdFJ46VUc-CR3XTeXQQ2ByTMD4O-kdkvtpHmn5hpBxqKTJMZe4dR5ZHkMbLYtqJFqQfW6Xy__WjZK2m4rNzWVoSM73YV9vh1d0yB3HSg-gQ_Yw4nBY3r41eEcDOXLlZyUPCy2ToB_7VnuwXtkxate6oEOe0M7-ljPvSJCYW4-gBo2ECRqQlA"}
                    width={400}
                    height={256}
                  />
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-primary/80">Namdapha National Park</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-secondary-container/30 text-on-secondary-container rounded animate-pulse">
                    Hotspot
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-surface-container-high text-on-surface-variant rounded">
                    Easternmost
                  </span>
                </div>
                <p className="text-on-surface-variant mb-6 flex-grow">
                  The largest protected area in the Eastern Himalaya biodiversity hotspot, featuring the widest altitudinal range of any park in the world.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant transition-colors duration-300 group-hover:text-primary">
                    <Star className="h-4 w-4 text-primary" />
                    <span>Look for: Snow Leopards, Clouded Leopards</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant transition-colors duration-300 group-hover:text-primary">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>Best Visit: November to March</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-full font-bold hover:scale-105 active:scale-95">
                  Plan Visit
                </button>
              </div>
            </ScrollReveal>

            {/* Mouling National Park */}
            <ScrollReveal variant="up" delay={100}>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-t-4 border-secondary group">
                <div className="h-64 rounded-xl overflow-hidden mb-6 relative">
                  <Image
                    alt="Mouling National Park"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={PlaceHolderImages.find(img => img.id === "hero-valley")?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDAzRCtE-D6aTpINkXbbijIN6kWfOAizjuGx5Tt9P9j953vGAOUFNyXgYLj5gCrVceaMmMsafSg7m7uhZ-bQzoWbAgW6eN4Xvke6ssOm31KDKNjRwaakqMiDbioPaCRl5_I0rl6JBZfx1_ogFfNigdQjV-Qur-TSPJOIg0FTxZaDx4wkiNTnyJyt7qYfFoaLeMTwrtj-M-SVw7ljGeZvl8XZhfi4g8eFawBv3XOiPKPkTGomp7qRzclcTQXMNjsCwS31XwcCY8AbQ8"}
                    width={400}
                    height={256}
                  />
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-primary/80">Mouling National Park</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-secondary-container/30 text-on-secondary-container rounded animate-pulse">
                    Pristine
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-surface-container-high text-on-surface-variant rounded">
                    Red Panda Habitat
                  </span>
                </div>
                <p className="text-on-surface-variant mb-6 flex-grow">
                  Meaning "Red Poison," this park is a dramatic landscape of steep slopes and high rainfall, creating a sanctuary for takins and pandas.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant transition-colors duration-300 group-hover:text-primary">
                    <Star className="h-4 w-4 text-primary" />
                    <span>Look for: Takin, Mishmi Hill Giant Squirrel</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant transition-colors duration-300 group-hover:text-primary">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Access: Rugged trekking trails</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-full font-bold hover:scale-105 active:scale-95">
                  Plan Visit
                </button>
              </div>
            </ScrollReveal>

            {/* Pakhui Tiger Reserve */}
            <ScrollReveal variant="up" delay={200}>
              <div className="bg-surface-container-lowest p-6 rounded-xl md:rounded-tr-[3rem] md:rounded-bl-[3rem] shadow-sm flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="h-64 rounded-xl overflow-hidden mb-6 relative">
                  <Image
                    alt="Pakhui Wildlife"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={PlaceHolderImages.find(img => img.id === "hero-mountains")?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuA7ftQY3dEIcUmoQ5JMIDdBmMFasHYTWBDMYNzP9VxZclpOmD3MsT8kG_5cDvNv97poVg9DkVpYRPZwbCQ1W99I5yvbqbocv-ovy6a392OC68EF5xyCm1lFF-X01xj8svVkVs03kdRhQqPZ0ymw73Q6CvT0M543wT_ZphIkDq_srBVyGpGeHT4reyx6tbNxj5hJIA8diaf53gsA2fqOyHY4qrxTIAdluTCHMkJ9CJf5lGH68ydQnZTgFsiDXQZRPz4mlT3nqaIBy_o"}
                    width={400}
                    height={256}
                  />
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-primary/80">Pakhui Tiger Reserve</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-secondary-container/30 text-on-secondary-container rounded animate-pulse">
                    Tiger Haven
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-surface-container-high text-on-surface-variant rounded">
                    Community Conservation
                  </span>
                </div>
                <p className="text-on-surface-variant mb-6 flex-grow">
                  A landscape of semi-evergreen and evergreen forests, world-renowned for its successful community-led hornbill nest adoption program.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant transition-colors duration-300 group-hover:text-primary">
                    <Star className="h-4 w-4 text-primary" />
                    <span>Look for: Bengal Tiger, Hornbills</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant transition-colors duration-300 group-hover:text-primary">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Focus: Birdwatching Paradise</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-full font-bold hover:scale-105 active:scale-95">
                  Plan Visit
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Botanical Wonders: Orchids */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Images Grid */}
          <ScrollReveal variant="left" className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full h-80 mt-12 rounded-2xl overflow-hidden group">
                <Image
                  alt="Arunachal Orchid"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdjZaRPUkHzo9MID6lz3vj9c2snqe0YkLX7gtM0WX4EvQmlaAlTQdC9RBobxBWbmcWW5Hb-lB4AD6j3p5wecTIjsEuxjsRUeEqMGJpFgURWouxX8PIKXoOJtdGgjK9K4FTT7pp3LoNw_bH7OElajDwRk2mZU9s7YYU94Zxz11kxleYSHdfpzrcNPAJ8jm0IEMb9gBS72qtYyyW8xJ--mGDKAX2MWOWJIATmocqul7IlESoqjJ2bPFxRxLYecw7MxFqnj03mAouxFE"
                  fill
                />
              </div>
              <div className="relative w-full h-80 rounded-2xl overflow-hidden group">
                <Image
                  alt="Rhododendron"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJLK2hU8S8EdKS6FFp9LW2RIy9HeusYIW3ZyrYL6_6CEenGqon9bJtWF3enDhicx2CfkWkJHbi_DLYOHXux2s9HhL7EyjDrb7FBbH42gS_QqbWU0yIBDCeweds070C2jtt63kdpGwf1TKE8-TG8NIWOlK2wiqfXqrlIP3J682SIwMcO4uU98psrcSVdMmhEA-lHykBH0lWMaC_Ejg41f0MtBcGbaOrROxvBytXZ3ZSEJFpu2DhXnv1KXaZlYnQ4xcPtGFfvEy_A2M"
                  fill
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white shadow-2xl rounded-2xl rotate-3 hover:rotate-6 hover:scale-110 transition-all duration-500 animate-float">
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <p className="font-headline text-4xl font-bold text-primary">500+</p>
                <p className="text-on-surface-variant font-medium">Orchid Species</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal variant="right" className="order-1 lg:order-2 space-y-8">
            <h2 className="font-headline text-4xl md:text-6xl font-bold leading-tight">The Orchid State</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Arunachal Pradesh is a botanical paradise, home to nearly half of India's orchid species. From the ephemeral Lady's Slipper to the rare Blue Vanda, the state transforms into a tapestry of color every spring.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Leaf className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary">Rare Endemics</h4>
                  <p className="text-sm text-on-surface-variant">
                    Discover species that have evolved exclusively in these remote valleys.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Filter className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary">Rhododendron Belts</h4>
                  <p className="text-sm text-on-surface-variant">
                    Traverse forests that turn bright red and pink during the summer bloom.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
                Explore Botanical Gardens
                <TrendingUp className="h-5 w-5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sustainable Tourism: Conservation Section */}
      <section className="mb-24 px-8 md:px-12 max-w-screen-2xl mx-auto">
        <ScrollReveal variant="up">
          <div className="bg-primary-container/20 rounded-xl md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-10">
              <div className="text-[300px] leading-none">🧠</div>
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-primary-container mb-8">
                Leave Only Footprints
              </h2>
              <p className="text-on-primary-container text-lg mb-12 opacity-90 leading-relaxed">
                Arunachal's beauty is as fragile as it is magnificent. We invite you to be a custodian of this land. Our sustainable tourism initiatives focus on community-owned homestays, wildlife guardianship, and plastic-free trails to ensure the "Land of the Rising Sun" remains pristine for generations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl">
                  <TreePine className="h-6 w-6 text-primary mb-3" />
                  <h4 className="font-bold mb-1">Protect Habitat</h4>
                  <p className="text-xs text-on-surface-variant">
                    Stay on marked trails to avoid disturbing nesting wildlife.
                  </p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl">
                  <Users className="h-6 w-6 text-primary mb-3" />
                  <h4 className="font-bold mb-1">Local Guides</h4>
                  <p className="text-xs text-on-surface-variant">
                    Hire local experts to support the community economy.
                  </p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl">
                  <Trash2 className="h-6 w-6 text-primary mb-3" />
                  <h4 className="font-bold mb-1">Zero Waste</h4>
                  <p className="text-xs text-on-surface-variant">
                    Pack out everything you pack in. No exceptions.
                  </p>
                </div>
              </div>
              <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                Become a Responsible Traveler
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
