import '../../index.css'

const Review = () => {
  return (
    <div  className=" mt-12 p-4">
       <p className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-gray-500 to-gray-800 bg-clip-text mb-16">
        What Our Juniors Say
      </p>
      <div id="Reviews" className='overflow-x-hidden'>
        <div className='flex gap-16 flex-row-reverse slider-card-animation slider-card-pause p-2'>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          </div>
      </div>
    </div>
  )
}

const ReviewCard = () => {
  return(
    <div className="shrink-0 h-72 w-100 md:h-48 md:w-112 p-4 border border-gray-200 shadow rounded-2xl">
      <div className='h-full flex flex-col justify-between'>
        <p className='text-xl md:text-sm tracking-wider'>The advice I received helped me focus on what really mattered. It was like a roadmap through the chaos of preparation. The support and guidance from those who had been through it before was truly priceless.</p>
        <div>
          <p className='text-lg md:text-sm  text-slate-700'>Vivek Ojha</p>
          <p className='text-lg md:text-sm  text-slate-700'>Memoir Org</p>
        </div>
      </div>
    </div>
  )
}


export default Review
