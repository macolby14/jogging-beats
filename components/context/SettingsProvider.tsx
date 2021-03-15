// eslint-disable-next-line no-use-before-define
import React, { useState } from "react";

export type OptionType = "RUNNING" | "BPM" | "INTENSITY";

interface ContextProps {
  bpm: [string, React.Dispatch<React.SetStateAction<string>>];
  bpmTolerance: [string, React.Dispatch<React.SetStateAction<string>>];
  targetDuration: [number, React.Dispatch<React.SetStateAction<number>>];
  allowExplicit: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selectedGenres: [
    Record<string, boolean>,
    React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  ];
  bpmSelectionOption: [
    OptionType,
    React.Dispatch<React.SetStateAction<OptionType>>
  ];
  optionsBarOtpion: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const SettingsContext = React.createContext<ContextProps>({
  bpm: ["160", () => {}],
  bpmTolerance: ["5", () => {}],
  targetDuration: [30 * 60 * 1000, () => {}],
  allowExplicit: [true, () => {}],
  selectedGenres: [{}, () => {}],
  bpmSelectionOption: ["RUNNING", () => {}],
  optionsBarOtpion: ["PACE", () => {}],
});

interface SettingsProviderProps {
  children: React.ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [bpm, setBpm] = useState("160");
  const [bpmTolerance, setBpmTolearnce] = useState("5");
  const [targetDuration, setTargetDuration] = useState(30 * 60 * 1000);
  const [allowExplicit, setAllowExplict] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<Record<string, boolean>>(
    {}
  );
  const [bpmSelectionOption, setBpmSelectionOption] = useState<OptionType>(
    "RUNNING"
  );
  const [optionsBarOption, setOptionsBarOption] = useState<string>("PACE");

  return (
    <SettingsContext.Provider
      value={{
        bpm: [bpm, setBpm],
        bpmTolerance: [bpmTolerance, setBpmTolearnce],
        targetDuration: [targetDuration, setTargetDuration],
        allowExplicit: [allowExplicit, setAllowExplict],
        selectedGenres: [selectedGenres, setSelectedGenres],
        bpmSelectionOption: [bpmSelectionOption, setBpmSelectionOption],
        optionsBarOtpion: [optionsBarOption, setOptionsBarOption],
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
