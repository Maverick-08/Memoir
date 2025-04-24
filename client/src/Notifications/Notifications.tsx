

const Notifications = () => {
  return (
    <div className="min-h-screen pt-[15vh] bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-[50%] h-[85vh] mx-auto bg-white border-t-4 border-sky-500 rounded-lg">
          <NotificationTitleComponent />
        </div>
      </div>
    </div>
  )
}

const NotificationTitleComponent = () => {
  return(
    <div>
      <p className="pl-4 pt-4 text-lg sm:text-xl lg:text-2xl">Notifications</p>
    </div>
  )
}

export default Notifications
