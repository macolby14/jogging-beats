// eslint-disable-next-line no-use-before-define
import React, { useState } from "react";

export type OptionType = "RUNNING" | "BPM" | "INTENSITY";

interface ContextProps {
  bpm: [string, React.Dispatch<React.SetStateAction<string>>];
  targetDuration: [number, React.Dispatch<React.SetStateAction<number>>];
  allowExplicit: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selectedGenres: [
    Record<string, boolean>,
    React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  ];
  selectedOption: [
    OptionType,
    React.Dispatch<React.SetStateAction<OptionType>>
  ];
  shownOption: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const SettingsContext = React.createContext<ContextProps>({
  bpm: ["160", () => {}],
  targetDuration: [30 * 60 * 1000, () => {}],
  allowExplicit: [true, () => {}],
  selectedGenres: [{}, () => {}],
  selectedOption: ["RUNNING", () => {}],
  shownOption: ["PACE", () => {}],
});

interface SettingsProviderProps {
  children: React.ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [bpm, setBpm] = useState("160");
  const [targetDuration, setTargetDuration] = useState(30 * 60 * 1000);
  const [allowExplicit, setAllowExplict] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedOption, setSelectedOption] = useState<OptionType>("RUNNING");
  const [shownOption, setShownOption] = useState<string>("PACE");

  return (
    <SettingsContext.Provider
      value={{
        bpm: [bpm, setBpm],
        targetDuration: [targetDuration, setTargetDuration],
        allowExplicit: [allowExplicit, setAllowExplict],
        selectedGenres: [selectedGenres, setSelectedGenres],
        selectedOption: [selectedOption, setSelectedOption],
        shownOption: [shownOption, setShownOption],
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
