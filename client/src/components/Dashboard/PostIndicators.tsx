import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";

const PostIndicators = () => {
  const [postImpressionCount, setPostImpressionCount] = useState<number | null>(
    null
  );
  const [saveCount, setSaveCount] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/user/stats`, {
        withCredentials: true,
      });
      if (response.data) {
        setPostImpressionCount(response.data.impressionCount);
        setSaveCount(response.data.saveCount);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="shadow bg-white border-l-4 border-sky-400 rounded-lg px-4 py-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-gray-700 font-medium">Post Impressions</p>{" "}
          <span className="text-sky-500 tracking-wide">
            {postImpressionCount ? postImpressionCount : 0}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 font-medium">Saved Articles</p>{" "}
          <span className="text-sky-500 tracking-wide">
            {saveCount ? saveCount : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostIndicators;
