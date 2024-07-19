import { List, Question, QuestionMark, Sun } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button.tsx";
import { Toggle } from "@/components/ui/toggle.tsx";

interface AppHeaderProps {}

export default function AppHeader({}: AppHeaderProps) {
  return (
    <div
      className={
        "w-full border-b-[1px] h-[65px] flex flex-row items-center pl-8 bg-white"
      }
    >
      <List size={20} weight={"bold"} />
      <img className={"h-[60px] "} src="/assets/peckish-logo-4.png" alt="" />
      <div
        className={
          "flex flex-row justify-center items-center ml-10 mr-auto gap-7"
        }
      >
        <a className={"text-sm"} href="#">
          Recipes
        </a>
        <a className={"text-sm"} href="#">
          Explore
        </a>
        <a className={"text-sm"} href="#">
          Meal Plans
        </a>
        <a className={"text-sm"} href="#">
          Shop
        </a>
      </div>
      <Button variant={"pale"} className={"ml-auto"}>
        Sign Out
      </Button>
      <Toggle className={"ml-6"} aria-label="Toggle bold">
        <Sun size={24} weight={"bold"} />
      </Toggle>
      <Toggle className={"mr-[4vw]"} aria-label="Toggle bold">
        <Question size={24} weight={"bold"} />
      </Toggle>
    </div>
  );
}