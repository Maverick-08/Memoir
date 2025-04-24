import { useState } from "react";
import { IoVideocamOutline } from "react-icons/io5";
import RoundAccordian from "./RoundAccordian";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button } from "../ui/button";

const RecordExperience = ({
  activatePreviousSection,
}: {
  activatePreviousSection: (x: boolean) => void;
}) => {
  const [roundIds, setRoundIds] = useState<string[]>([]);

  const addNewRound = () => {
    const roundId = "" + Math.floor(Math.random() * 1000);

    setRoundIds((prevRoundIds) => [...prevRoundIds, roundId]);
  };

  return (
    <div className="pt-24">
      <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto shadow bg-white rounded-lg border border-gray-100 px-8 py-4">
        <TitleComponent />

        {roundIds.length == 0 ? (
          <div className="mt-8 ml-4">
            <div>
              <p>Add Rounds</p>
            </div>

            <Button className="cursor-pointer">Add Round</Button>
          </div>
        ) : (
          roundIds.map((round, index) => {
            return (
              <RoundAccordian
                key={index}
                index={index + 1}
                roundId={round}
                addRounds={addNewRound}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

const TitleComponent = () => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-xl sm:text-2xl font-normal">Share Experience</p>
      <div className="flex items-center gap-1 text-xs text-sky-500 cursor-pointer">
        <span className="font-semibold">Feels jarring ?</span>
        <span>Submit a recorded video</span>
        <span>
          <IoVideocamOutline className="h-6 w-6" />
        </span>
      </div>
    </div>
  );
};

export default RecordExperience;
