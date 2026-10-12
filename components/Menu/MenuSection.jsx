"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MenuTabs from "@/components/Menu/MenuTabs";
import MenuGroup from "@/components/Menu/MenuGroup";
import MenuVisual from "@/components/Menu/MenuVisual";
import CafePattern from "@/components/CafePattern";
import {
  breakfast,
  breakfastExtras,
  breakfastTakeaway,
  sandwichBar,
  burgers,
  focacciaWraps,
  hotSandwiches,
  pastries,
  snacks,
  sweets,
  coffee,
  business,
} from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

function buildCategories() {
  const coffeeItems = [
    ...coffee.sizes.map((s) => ({ name: `Coffee ${s.name}`, price: s.price })),
    ...coffee.iced,
    {
      name: coffee.milkshake.name,
      price: coffee.milkshake.price,
      description: coffee.milkshake.flavours.join(" · "),
    },
    ...coffee.extras.map((e) => ({ name: e.name, price: e.price, description: "Extra" })),
  ];

  const focacciaItems = focacciaWraps.items.map((item) => ({
    name: item.name,
    price: focacciaWraps.price,
    ingredients: item.ingredients,
  }));

  return [
    {
      id: "breakfast",
      label: "Breakfast",
      image: "/images/high-ground/big-breakfast.jpg",
      visualAlt: "Breakfast plate",
      items: [...breakfast, ...breakfastExtras.map((e) => ({ ...e, description: "Extra" })), ...breakfastTakeaway],
    },
    {
      id: "sandwich-bar",
      label: "Sandwich Bar",
      image: "/images/high-ground/hero-breakfast.jpg",
      visualAlt: "Sandwich bar",
      items: sandwichBar,
    },
    {
      id: "burgers",
      label: "Burgers",
      image: "/images/high-ground/burger.jpg",
      visualAlt: "Burger",
      items: burgers,
    },
    {
      id: "focaccia",
      label: "Focaccia + Wraps",
      image: "/images/high-ground/focaccia.jpg",
      visualAlt: "Focaccia",
      items: focacciaItems,
    },
    {
      id: "hot-sandwiches",
      label: "Hot Sandwiches",
      image: "/images/high-ground/hot-meal.jpg",
      visualAlt: "Hot sandwich",
      items: hotSandwiches,
    },
    {
      id: "pastries",
      label: "Pastries",
      image: "/images/high-ground/pastry.jpg",
      visualAlt: "Pastries",
      items: pastries,
    },
    {
      id: "hot-meals",
      label: "Hot Meals",
      image: "/images/high-ground/hot-meal.jpg",
      visualAlt: "Hot meal",
      items: [
        { name: "Dine in Small", price: 14.5 },
        { name: "Dine in Large", price: 16.9 },
        { name: "Takeaway Small", price: 13.5 },
        { name: "Takeaway Large", price: 15.9 },
        { name: "Today's selection", description: "See today's hot-meal and salad selection in store." },
      ],
    },
    {
      id: "snacks",
      label: "Snacks",
      image: "/images/high-ground/counter.jpg",
      visualAlt: "Snacks",
      items: snacks,
    },
    {
      id: "sweets",
      label: "Sweets",
      image: "/images/high-ground/cake.jpg",
      visualAlt: "Sweets",
      items: sweets,
    },
    {
      id: "coffee",
      label: "Coffee + Drinks",
      image: "/images/high-ground/hero-coffee.jpg",
      visualAlt: "Coffee",
      items: coffeeItems,
    },
  ];
}

export default function MenuSection() {
  const categories = useMemo(() => buildCategories(), []);
  const [active, setActive] = useState(categories[0].id);
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const current = categories.find((c) => c.id === active) || categories[0];

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const rows = root.querySelectorAll(".menu-row");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        root.querySelector("[data-menu-visual]"),
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power2.inOut" }
      );
    }, root);

    return () => ctx.revert();
  }, [active, reduced]);

  return (
    <section
      id="menu"
      ref={rootRef}
      className="relative overflow-hidden bg-milk py-20 md:py-28"
    >
      <CafePattern variant="wrapper" opacity={0.03} className="text-petrol" />
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <p className="utility-label text-coral">Cafe board · Menu {business.menuVerifiedAt}</p>
        <h2 className="mt-3 font-display text-4xl text-petrol md:text-5xl">Full cafe menu</h2>

        <div className="mt-8">
          <MenuTabs categories={categories} active={active} onChange={setActive} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[65%_35%]">
          <div
            id={`menu-panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`menu-tab-${current.id}`}
          >
            <MenuGroup items={current.items} />
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-stone">
              {business.allergenDisclaimer}
            </p>
          </div>
          <div className="hidden lg:block">
            <MenuVisual category={current} />
          </div>
        </div>

        <div className="mt-6 lg:hidden">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.visualAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
