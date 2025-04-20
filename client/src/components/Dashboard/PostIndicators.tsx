

const PostIndicators = () => {
  return (
    <div>
      <div className="shadow bg-white border-l-4 border-sky-400 rounded-lg px-4 py-4 flex flex-col gap-4">
        <div className="flex justify-between"><p className="text-gray-700 font-medium">Post Impressions</p> <span className="text-sky-500 tracking-wide">45</span></div>
        <div className="flex justify-between"><p className="text-gray-700 font-medium">Saved Articles</p> <span className="text-sky-500 tracking-wide">10</span></div>
      </div>
    </div>
  )
}

export default PostIndicators
