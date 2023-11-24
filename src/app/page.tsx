import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Gem, TimerIcon, UserCircle2 } from "lucide-react";
import ProductReel from "@/components/ProductReel";

const features= [
  {
    name: "Time-Traveling Search",
    Icon: TimerIcon,
    description: "A unique search feature that allows users to filter products by era, making it easy for customers to find items from their favorite time periods.",
  },
  {
    name: "Personalized Recommendations",
    Icon: UserCircle2,
    description: "Utilize machine learning algorithms to provide personalized product recommendations based on a user's browsing history and purchase behavior.",
  },
  {
    name: "Retro Rewards Program",
    Icon: Gem,
    description: "Implement a rewards program that offers customers points for purchases, reviews, and referrals, which can be redeemed for discounts or exclusive retro-themed items.",
  },
]


export default function Home() {
  return (
    <>
   <Wrapper>
     <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl ">
     <h1 className={`text-4xl font-bold text2 tracking-tight sm:text-6xl text-primary`}>
  <span className="">Sail through time, shop the retro rhyme:</span>
  <br />
  <span className="font-semibold text1 text-4xl tracking-tight text-secondary  ">
    Explore, Experience, Embrace 
  </span>
  <br />
  <span className="font-bold text1 text-4xl tracking-widest text-stroke text-secondary uppercase">
  Retro Emporium
  </span>
</h1>
  

        <div className="flex flex-col sm:flex-row gap-4 mt-8 ">
          <Link href={"/products"} className={buttonVariants({ variant: "default" })} >
            Shop Now
          </Link>
          <Button variant={"ghost"} className="text-secondary" >Quality products &rarr;</Button>
        </div>
     </div>

    <ProductReel title="Explore Products" href="/products" />
   </Wrapper>

   <section className="border-t border-[#c0c4cc] bg-[#f0f5ff]">
    <Wrapper className="py-20">
      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
        {features.map((feature) => (
          <div key={feature.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">

            <div className="md:flex-shrink-0 flex justify-center">
             <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary text-white">
              <feature.Icon className="h-1/2 w-1/2" />
             </div>
            </div>

            <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
              <h3 className="text-base font-medium text-foreground">{feature.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
   </section>
    </>

  )
}
