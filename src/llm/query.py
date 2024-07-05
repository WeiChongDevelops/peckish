import os
from groq import Groq

typescript_types = '''
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface IngredientItem {
  product: string;
  amount: string;
}

export interface Recipe {
  recipeTitle: string;
  recipeId: string;
  recipeDescription: string;
  totalCost: number;
  timeTaken: number;
  recipeIngredients: IngredientItem[];
  recipeSteps: string[];
  recipeImageURL: string;
}

export type mealOfDay = "Breakfast" | "Lunch" | "Dinner";

export interface MealRecipeCollection {
  mealOfDay: mealOfDay;
  recipeOptions: Recipe[];
}

export interface WeeklyMealPlanDay {
  day: DayOfWeek;
  allRecipes: MealRecipeCollection[];
}
'''

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


def meal_plan_query(ingredients, user_input):
    groq_input = {"role": "user", "content": user_input}
    strategy = get_low_cost_strategy(ingredients)

    meal_plan = client.chat.completions.create(
        messages=[
            strategy,
            groq_input,
        ],
        model="llama3-8b-8192",
    )

    return meal_plan.choices[0].message


def get_low_cost_strategy(ingredient):
    prompt = "You are a JSON-generating kiosk, incapable of responding in English sentences. I will be giving you a set of ingredients with their corresponding costs. "
    prompt += "Take EXCLUSIVELY the ingredients I provide, and create a nutritious meal-plan for intermediate home-cooks, for the lowest cost possible. "
    prompt += "You will give me EXCLUSIVELY the meal plan for monday and tuesday, as an array of json objects and nothing more or less. "
    prompt += "Specifically, you will respond in type WeeklyMealPlanDay[], given these Typescript types: \n"
    prompt += typescript_types
    prompt += "You will give me NO introductory statements such as 'Here is your meal plan'. "
    prompt += "You will give me the ENTIRE meal plan that I ask for, without placeholders. "
    prompt += "recipeDescriptions will be in the format 'with key_ingredient_1 and key_ingredient_2', choosing those key ingredients based on the recipe. "
    prompt += "recipeTitle must NOT include the description ('with x and y'), and MUST have an appealing adjective as relevant eg. succulent/juicy etc. . "
    prompt += "These are the ingredients and each of their corresponding costs: \n"
    prompt += get_ingredients(ingredient)
    return {
        "role": "system",
        "content": prompt
    }


def get_ingredients(ingredients):
    ingredients_str = ""
    for ingredient in ingredients:
#         print(ingredient)
        ingredients_str += f"{ingredient.get('name')}, ${ingredient.get('cost')}\n"
    return ingredients_str
