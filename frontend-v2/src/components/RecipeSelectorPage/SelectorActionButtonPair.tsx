import { Button } from "@/components/ui/button.tsx";
import { getRecipeCollection } from "@/api/api.ts";
import { Robot } from "@phosphor-icons/react";
import { Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DietaryPreferences, FullRecipeCollection } from "@/utility/types.ts";
import useGetRecipeCollection from "@/hooks/queries/useGetRecipeCollection.ts";
import { useQueryClient } from "@tanstack/react-query";

interface SelectorActionButtonPairProps {
  setRecipeCollection: Dispatch<SetStateAction<FullRecipeCollection | null>>;
  dietaryPreferences: DietaryPreferences;
  selectedRecipeIds: string[];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
}

export default function SelectorActionButtonPair({
  setRecipeCollection,
  dietaryPreferences,
  selectedRecipeIds,
  setIsLoading,
  setSelectedRecipeIds,
}: SelectorActionButtonPairProps) {
  const navigate = useNavigate();
  // const { isFetching, data } = useGetRecipeCollection({
  //   dietaryPreferences,
  // });
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   setRecipeCollection(data);
  // }, [data]);

  return (
    <div className={"right-4 bottom-4 flex flex-col fixed items-end gap-4"}>
      <Button
        className={"px-[1.5em] py-[1.25em] text-xl font-bold z-10"}
        onClick={async () => {
          setSelectedRecipeIds([]);
          setIsLoading(true);
          getRecipeCollection(dietaryPreferences).then((result) => {
            setRecipeCollection(result);
            setIsLoading(false);
          });
          // await queryClient.invalidateQueries({
          //   queryKey: ["recipeCollection"],
          // });
        }}
      >
        <Robot size={32} className={"mr-3"} />
        <span>Get New Recipes</span>
      </Button>
      <Button
        variant={"green"}
        className={"px-[1.5em] py-[1.25em] text-xl font-bold z-10"}
        disabled={selectedRecipeIds.length < 2}
        onClick={() => {
          navigate("/app/plans/myMealPlan");
        }}
      >
        <Utensils size={32} className={"mr-3"} />
        <span>
          {selectedRecipeIds.length < 2
            ? "Select at Least Two Recipes"
            : "Create Meal Plan"}
        </span>
      </Button>
    </div>
  );
}
