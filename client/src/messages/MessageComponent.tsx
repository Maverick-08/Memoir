import { data } from "./temp";
import { TiPin } from "react-icons/ti";

const MessageComponent = () => {
  return (
    <div className="h-full grid grid-cols-12">
              <div className="col-span-4 border-r border-l overflow-scroll ">
                {data.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center px-2 py-4 gap-4 cursor-pointer border-b hover:bg-sky-50"
                    >
                      {/* Profile Photo  */}
                      <div className="h-16 w-16 rounded-full bg-gray-100"></div>

                      {/* Name  */}
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <p>
                              {data.fname}&nbsp;
                              {data.lname}
                            </p>
                            <p className="text-xs text-slate-500">
                              {data.messages[data.messages.length - 1].date}
                            </p>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {data.messages[data.messages.length - 1].textData[
                              data.messages[data.messages.length - 1].textData
                                .length - 1
                            ].sentBy == "Me"
                              ? "You : "
                              : data.fname + " : "}
                            {
                              data.messages[data.messages.length - 1].textData[
                                data.messages[data.messages.length - 1].textData
                                  .length - 1
                              ].text
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="col-span-8 overflow-auto">
                <div className="h-[15%] flex justify-between items-center px-4 border-b">
                  <div className="flex flex-col gap-1 py-1">
                    <p className="text-lg">
                      {data[0].fname}&nbsp;{data[0].lname}
                    </p>
                    <p className="text-sm text-gray-400">
                      DevOps Engineer @BrowserStack
                    </p>
                  </div>
                  <div className="text-red-500 cursor-pointer">
                    <TiPin className="w-8 h-8" />
                  </div>
                </div>

                <div className="h-[60%] py-4 overflow-auto">
                  {data[0].messages.map((messageData, index) => (
                    <div key={index}>
                      <div className="text-center text-sm mb-4">
                        <span className="bg-black text-white px-2 py-1 rounded-md">{messageData.date}</span>
                        
                      </div>
                      {messageData.textData.map((textData, idx) => (
                        <div
                          key={idx}
                          className={`flex px-2 ${
                            textData.sentBy === "Me"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div className="bg-gray-100 text-sm px-3 py-2 rounded-md max-w-[70%]">
                            <p>{textData.text}</p>
                            <p className="text-[10px] text-right mt-1 text-gray-400">
                              {textData.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="h-[25%]">
                <div className="w-full px-4 pt-2 bg-white">
          <textarea
            name="text-message"
            placeholder="Write a message..."
            className="w-full rounded-md resize-none px-4 py-2 focus:outline-none border border-gray-200 focus:border-gray-400"
          ></textarea>
          <div className="flex justify-end mt-2">
            <span className="px-8 py-1 rounded-md transform hover:scale-105 duration-200 cursor-pointer bg-sky-500 text-white">
              Send
            </span>
          </div>
        </div>
                </div>
              </div>
            </div>
  );
};

export default MessageComponent;
