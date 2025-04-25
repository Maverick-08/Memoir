

const UserPostsCard = () => {
  return (
    <div>
      <div className="pl-4 pr-4 flex items-center gap-4">
        <p className="text-2xl">Posts</p>
        <div className="w-full border border-black"></div>
      </div>
      <div className="my-4 px-8 py-8 rounded-lg bg-white">
        <p className="text-gray-500">Share your thoughts, create a post...</p>
      </div>
    </div>
  );
};

export default UserPostsCard;
