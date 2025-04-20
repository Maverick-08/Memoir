

const TrendingCard = () => {
  return (
    <div>
      <div className="shadow bg-white border-t-4 border-red-700 rounded-xl px-4 py-4 flex flex-col gap-6">

        <p className="text-xl font-semibold text-gray-700">Trending Now <span>&#x1F525;</span></p>

        <div className="flex flex-col gap-4 text-gray-800 text-lg">
            <div className="flex flex-col gap-0.5"><p>Development</p><span className="pl-1 text-xs text-gray-400">2,332 searches</span></div>
            <div className="flex flex-col gap-0.5"><p>Microsoft</p><span className="pl-1 text-xs text-gray-400">2,021 searches</span></div>
            <div className="flex flex-col gap-0.5"><p>Data Structure & Algorithms</p><span className="pl-1 text-xs text-gray-400">1,920 searches</span></div>
            <div className="flex flex-col gap-0.5"><p>Open Source</p><span className="pl-1 text-xs text-gray-400">500 searches</span></div>
        </div>
      </div>
    </div>
  )
}

export default TrendingCard
