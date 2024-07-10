import { useContext, useEffect, useState } from "react";
import {
  decimalToMixedFractionString,
  getFormattedTime,
  getRecipeObjectByIdOrNull,
  roundToNearestQuarter,
} from "@/utility/utils.ts";
import { RecipeCollectionContext } from "@/utility/context.ts";
import { Recipe } from "@/utility/types.ts";
import { useNavigate, useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { Button } from "@/components/ui/button.tsx";
import { getImage } from "@/api/api.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Bookmark } from "lucide-react";
import { BowlFood, CaretLeft } from "@phosphor-icons/react";
import NutritionInfo from "@/components/RecipePage/NutritionInfo.tsx";
import { Toggle } from "@/components/ui/toggle.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import ServingsSelector from "@/components/RecipeSelectorPage/ServingsSelector.tsx";
import RatingDisplay from "@/components/shared/RatingDisplay.tsx";
import AppHeader from "@/components/shared/AppHeader.tsx";

interface RecipeDetailsPageProps {}

export default function RecipeDetailsPage({}: RecipeDetailsPageProps) {
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [numServings, setNumServings] = useState(1);
  const [fabricatedWaitRunning, setFabricatedWaitRunning] = useState(true);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mealPlan = useContext(RecipeCollectionContext);

  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    mealPlan && id && setActiveRecipe(getRecipeObjectByIdOrNull(mealPlan, id));
  }, [mealPlan, id]);

  useEffect(() => {
    console.log(activeRecipe);

    activeRecipe &&
      getImage(activeRecipe.recipeTitle).then((url) => setImageURL(url));

    !!activeRecipe && setNumServings(activeRecipe.numServings);
  }, [activeRecipe]);

  useEffect(() => {
    setTimeout(() => setFabricatedWaitRunning(false), 450);
  }, []);

  if (!activeRecipe || imageURL === "" || fabricatedWaitRunning) {
    return (
      <div className={"flex justify-center items-center w-screen h-screen"}>
        <DotLoader />
      </div>
    );
  }
  const multiplierOnOriginalQty = numServings / activeRecipe.numServings;

  return (
    <div
      className={
        "flex flex-col items-center pt-24 px-12 min-h-screen max-w-[60%] mx-auto"
      }
    >
      <Button
        className={"w-fit absolute top-[85px] left-5"}
        onClick={() => navigate("/app")}
      >
        <CaretLeft weight={"bold"} className={"mr-2"} />
        <span>Go Back</span>
      </Button>
      {/* TOP ROW */}
      <div className={"flex flex-row justify-between gap-16 w-full"}>
        {/* TOP ROW LEFT COLUMN */}
        <div className={"flex flex-col items-start"}>
          <div className={"flex flex-row items-center gap-2 my-4"}>
            <Badge>Top rated</Badge>
            <Badge>{activeRecipe.BLD ?? "Lunch"}</Badge>
            <Badge>{activeRecipe.recipeTitle.split(" ")[0]}</Badge>
            <Badge>Mediterranean</Badge>
          </div>
          <h1 className={"text-6xl font-bold mt-4"}>
            {activeRecipe.recipeTitle}
          </h1>
          <p className={"text-lg font-base text-zinc-500 mb-1"}>
            {activeRecipe.recipeDescription}
          </p>
          <RatingDisplay
            recipeRating={activeRecipe.recipeRating}
            numRatings={activeRecipe.numRatings}
          />
          <div className={"mt-8 flex flex-row items-center gap-2.5"}>
            <Button>
              <Bookmark className={"mr-2"} size={20} />
              Save Recipe
            </Button>
            <Toggle variant={"outline"}>
              <BowlFood weight={"bold"} className={"mr-2"} size={20} />I made
              this!
            </Toggle>
          </div>
          <div
            className={
              "flex flex-row justify-center items-center mt-auto -ml-4"
            }
          >
            <div className={"flex flex-col items-center p-6 w-28"}>
              <p className={"font-semibold text-xl"}>Prep</p>
              <p className={"font-light mt-2 text-sm"}>
                {getFormattedTime(activeRecipe.prepTime)}
              </p>
            </div>
            <div
              className={"flex flex-col items-center p-6 border-x-[1px] w-28"}
            >
              <p className={"font-semibold text-xl"}>Cook</p>
              <p className={"font-light mt-2 text-sm"}>
                {getFormattedTime(activeRecipe.cookTime)}
              </p>
            </div>
            <div className={"flex flex-col items-center p-6 w-28"}>
              <p className={"font-semibold text-xl"}>Difficulty</p>
              <p className={"font-light mt-2 text-sm"}>Easy</p>
            </div>
          </div>
          <NutritionInfo
            numServings={numServings}
            setNumServings={setNumServings}
          />
        </div>

        {/* TOP ROW RIGHT IMAGE COLUMN */}
        <div className={"flex flex-col"}>
          <div
            className={"size-[36rem] aspect-square overflow-hidden rounded-2xl"}
          >
            {!!imageURL ? (
              <img
                className={"min-h-full min-w-full object-cover"}
                src={imageURL}
                alt="Recipe preview"
              />
            ) : (
              <Skeleton className={"size-[36rem]"} />
            )}
          </div>
        </div>
      </div>

      <Separator className={"h-[1px] my-8"} />

      {/* DESCRIPTION ROW*/}
      {!!activeRecipe.recipeLongIntro && (
        <div className={"self-start mb-6"}>{activeRecipe.recipeLongIntro}</div>
      )}

      {/* INGREDIENTS AND METHOD ROW */}
      <div className={"grid grid-cols-[6fr_7fr] w-full mt-8 mb-8 gap-24"}>
        <div className={"flex flex-col items-start"}>
          <h2 className={"text-4xl font-semibold mb-4"}>Ingredients</h2>
          <ServingsSelector
            setNumServings={setNumServings}
            numServings={numServings}
            className={"w-40"}
          />
          <ul className={"flex flex-col list-disc ml-[1.5ch] gap-2 mt-4"}>
            {activeRecipe.recipeIngredients.map((ingredient, index) => {
              return (
                <li
                  key={index}
                >{`${decimalToMixedFractionString(roundToNearestQuarter(ingredient.qtyNumber * multiplierOnOriginalQty))} ${ingredient.qtyUnit} ${ingredient.product}`}</li>
              );
            })}
          </ul>
        </div>
        <div className={"flex flex-col items-start"}>
          <h2 className={"text-4xl font-semibold mb-4"}>Method</h2>
          <ol className={"flex flex-col list-decimal ml-[1.5ch] gap-2"}>
            {activeRecipe.recipeSteps.map((step, index) => {
              return <li key={index}>{step}</li>;
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
