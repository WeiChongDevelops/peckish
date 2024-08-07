import { Recipe, SupermarketPreferences } from "@/utility/types.ts";
import RecipeSubsection from "@/components/RecipeSelectorPage/RecipeSubsection.tsx";
import { DotLoader } from "react-spinners";
import { CloudMoon, Sun, SunHorizon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface RecipeGalleryProps {
  recipeCollection: Recipe[];
  selectedRecipeIds: string[];
  setSelectedRecipeIds: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
  supermarketPreferences: SupermarketPreferences;
  // hasClickedGetRecipes: boolean;
}
export default function RecipeGallery({
  recipeCollection,
  selectedRecipeIds,
  setSelectedRecipeIds,
  isLoading,
  supermarketPreferences,
  // hasClickedGetRecipes,
}: RecipeGalleryProps) {
  const [isFabLoading, setIsFabLoading] = useState(true);
  const [breakfastRecipes, setBreakfastRecipes] = useState<Recipe[]>([]);
  const [lunchRecipes, setLunchRecipes] = useState<Recipe[]>([]);
  const [dinnerRecipes, setDinnerRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setTimeout(() => setIsFabLoading(false), 350);
  }, []);

  useEffect(() => {
    if (!!recipeCollection) {
      setBreakfastRecipes(
        recipeCollection.filter((recipe) => recipe.BLD === "Breakfast"),
      );
      setLunchRecipes(
        recipeCollection.filter((recipe) => recipe.BLD === "Lunch"),
      );
      setDinnerRecipes(
        recipeCollection.filter((recipe) => recipe.BLD === "Dinner"),
      );
    }
  }, [recipeCollection]);

  if (!recipeCollection || isLoading || isFabLoading) {
    return (
      <div className={"flex justify-center items-center pt-32 w-full"}>
        <DotLoader />
      </div>
    );
  }

  if (
    // !hasClickedGetRecipes ||
    breakfastRecipes.length === 0 ||
    lunchRecipes.length === 0 ||
    dinnerRecipes.length === 0
  ) {
    return (
      <p className={"mt-20 text-[#33E14D] brightness-50"}>
        {"Your recipe options will appear here!"}
      </p>
    );
  }

  return (
    <div className={"xl:w-[92vw] w-[95vw] min-h-screen z-0"}>
      {breakfastRecipes && (
        <RecipeSubsection
          setSelectedRecipeIds={setSelectedRecipeIds}
          selectedRecipeIds={selectedRecipeIds}
          headerIcon={<SunHorizon size={36} />}
          recipes={breakfastRecipes}
          supermarketPreferences={supermarketPreferences}
          label={"Breakfast"}
        />
      )}
      {lunchRecipes && (
        <RecipeSubsection
          setSelectedRecipeIds={setSelectedRecipeIds}
          selectedRecipeIds={selectedRecipeIds}
          headerIcon={<Sun size={36} />}
          recipes={lunchRecipes}
          supermarketPreferences={supermarketPreferences}
          label={"Lunch"}
        />
      )}
      {dinnerRecipes && (
        <RecipeSubsection
          setSelectedRecipeIds={setSelectedRecipeIds}
          selectedRecipeIds={selectedRecipeIds}
          headerIcon={<CloudMoon size={36} />}
          recipes={dinnerRecipes}
          supermarketPreferences={supermarketPreferences}
          label={"Dinner"}
        />
      )}
    </div>
  );
}
