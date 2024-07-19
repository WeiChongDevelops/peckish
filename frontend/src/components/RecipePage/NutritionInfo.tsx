import { Dispatch, SetStateAction, useEffect } from "react";
import ServingsSelector from "@/components/RecipeSelectorPage/ServingsSelector.tsx";

interface NutritionInfoProps {
  setNumServings: Dispatch<SetStateAction<number>>;
  numServings: number;
}

export default function NutritionInfo({
  setNumServings,
  numServings,
}: NutritionInfoProps) {
  return (
    <div className={"flex flex-col items-start mt-auto gap-3"}>
      <div
        className={"grid 2xl:min-w-[35vw] min-w-[40vw] gap-3"}
        style={{
          gridTemplateColumns: "repeat(6, 1fr)",
        }}
      >
        <p className={"font-bold text-xl mt-1 mr-1 col-span-2"}>Nutrition</p>
        <ServingsSelector
          setNumServings={setNumServings}
          numServings={numServings}
          className={"col-span-2 col-start-5"}
        />
      </div>
      <div
        className={"grid 2xl:min-w-[35vw] min-w-[40vw] min-h-24 gap-3"}
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(80px, 100%), 1fr))",
        }}
      >
        <div
          className={
            "flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 pt-4 rounded-lg"
          }
        >
          <p className={"font-medium text-md"}>Energy</p>
          <p className={"font-light mt-2 text-sm"}>501cal</p>
          <p className={"font-light text-sm"}>(2012kj)</p>
        </div>
        <div
          className={
            "flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 pt-4 rounded-lg"
          }
        >
          <p className={"font-medium text-md"}>Protein</p>
          <p className={"font-light mt-2 text-sm"}>38.4g</p>
        </div>
        <div
          className={
            "flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 pt-4 rounded-lg"
          }
        >
          <p className={"font-medium text-md"}>Fat</p>
          <p className={"font-light mt-2 text-sm"}>15.3g</p>
        </div>
        <div
          className={
            "flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 pt-4 rounded-lg"
          }
        >
          <p className={"font-medium text-md"}>Carbs</p>
          <p className={"font-light mt-2 text-sm"}>56.3g</p>
        </div>
        <div
          className={
            "flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 pt-4 rounded-lg"
          }
        >
          <p className={"font-medium text-md"}>Fibre</p>
          <p className={"font-light mt-2 text-sm"}>3g</p>
        </div>
        <div
          className={
            "flex flex-col items-center border-2 border-[#33E14D]/50 brightness-75 pt-4 rounded-lg"
          }
        >
          <p className={"font-medium text-md"}>Salt</p>
          <p className={"font-light mt-2 text-sm"}>400mg</p>
        </div>
      </div>
    </div>
  );
}