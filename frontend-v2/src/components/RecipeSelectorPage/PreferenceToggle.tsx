import { Toggle } from "@/components/ui/toggle.tsx";
import { Dispatch, SetStateAction } from "react";
import { DietaryPreferences } from "@/utility/types.ts";
import { cn } from "@/utility/utils.ts";

interface PreferenceToggleProps {
  label: string;
  toggleProperty: keyof DietaryPreferences;
  dietaryPreferences: DietaryPreferences;
  setDietaryPreferences: Dispatch<SetStateAction<DietaryPreferences>>;
  iconComponent?: React.ReactNode;
  className?: string;
}

export default function PreferenceToggle({
  dietaryPreferences,
  label,
  toggleProperty,
  setDietaryPreferences,
  iconComponent,
  className,
}: PreferenceToggleProps) {
  const handlePressedChange = () => {
    setDietaryPreferences((prevPreferences) => ({
      ...prevPreferences,
      [toggleProperty]: !prevPreferences[toggleProperty],
    }));
  };
  return (
    <Toggle
      pressed={dietaryPreferences[toggleProperty]}
      variant="outline"
      className={cn(
        "h-10 w-36 rounded-2xl flex justify-center items-center hover:opacity-70",
        className,
      )}
      onClick={handlePressedChange}
      aria-label={`Toggle ${toggleProperty}`}
    >
      {iconComponent}
      <span>{label}</span>
    </Toggle>
  );
}
