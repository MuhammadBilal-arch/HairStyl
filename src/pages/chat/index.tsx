import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import io from 'socket.io-client';

import {
  FaArrowLeft,
  FaCamera,
  FaImage,
  FaMicrophone,
  FaRegArrowAltCircleLeft,
  FaStop,
} from 'react-icons/fa';

import {
  API_HANDLER,
  API_HANDLER_FORM_DATA,
  onGetOrderCurrentStatus,
  showToast,
} from '../../utils/functions';
import { END_POINTS } from '../../utils/endpoints';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOAST_TYPE } from '../../utils/constants';
import { ASSETS } from '../../images/path';
import { useSocket } from '../../context/socketContext';
import { BASE_URL } from '../../utils/urls';

export const ChatComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();

  const { user } = useSelector((state) => state.User);

  const [messages, setMessages] = useState<any>([]);

  const [fileUpload, setFileUpload] = useState(' ');

  const messagesEndRef = useRef(null);
  const newMessage = useRef(null);

  const onUploadFile = (e) => {
    e.preventDefault();
    var file = e.target.files[0];
    setFileUpload({
      url: URL.createObjectURL(file),
      file: file,
    });
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behaviour: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  useEffect(() => {    
    if(!socket) return ;
    socket.emit('ChatRoom',location.state._id)
    const handleMessage = (message:any) => {
      setMessages((prevMessages:any) => [...prevMessages, message]);
    };

    socket?.on('message', handleMessage);
    return () => {
      socket?.off('message', handleMessage);
    };
  }, [socket]);
  
  useEffect(() => {
    onGetChat();
  }, [])

  const onGetChat = async () => {
    // FOR UPDATING EXiSTING CHAT
    const _id = location?.state?._id;
    const _chat = await API_HANDLER('POST', END_POINTS.CHAT.GET, {
      chat_id: _id,
    });

    if (_chat?.data) {
      // setChatWith(_chat?.data?.data?.users);
      setMessages(_chat?.data?.data?.messages);
    } else {
      // FOR CREATING NEW CHAT

      const payload = {
        chat_id: _id,
        is_seen: false,
        messages: [],
      };
      const _chat = await API_HANDLER('POST', END_POINTS.CHAT.ADD, payload);
      console.log(_chat);
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (newMessage.current.value === '' && !fileUpload?.file) {
      return showToast('Please enter message to submit', TOAST_TYPE.error);
    }

    const _id = location?.state?._id;
    const formData = new FormData();

    // Append text message
    formData.append('chat_id', _id);
    formData.append('sender_info[fname]', user.fname || user.dispensary.name);
    formData.append('sender_info[lname]', user.lname || '');
    formData.append('sender_info[email]', user.email);
    formData.append('sender_info[sender_id]', user._id);
    formData.append('is_seen', false);
    formData.append('messages[0][message]', newMessage.current.value);
    formData.append('messages[0][attachments]', []);

    // Append image file
    if (fileUpload?.file) {
      formData.append('image', fileUpload.file);
    }

    try {
      await API_HANDLER_FORM_DATA('PATCH', END_POINTS.CHAT.UPDATE, formData);

      let arr = [...messages];
      const ChatObject = {
        DateAndTime: Date.now(),
        message: newMessage?.current?.value,
        attachments: [],
        message_by: {
          fname: user.fname || user.dispensary.name,
          lname: user.lname || '',
          email: user.email,
          sender_id: user._id,
        },
      };
      if (fileUpload?.file) {
        ChatObject.image = fileUpload.url;
      }

      arr.push(ChatObject);

      setMessages(arr);
      setFileUpload('');
      newMessage.current.value = null;
    } catch (error:any) {
      // Handle API request errors
    }
  };

  const onGetName = (result: any) => {
    return result?.fname + ' ' + result?.lname;
  };

  return (
    <div className="min-h-screen space-y-4 bg-gray-base">
      {/* NAVIGATION */}
      <div className="z-20 flex h-20 w-full flex-row items-center justify-between bg-gray-transparent py-5 px-10">
        <div className="flex space-x-6 lg:space-x-10">{/* <LogoBtn /> */}</div>
        <div className="flex h-4 space-x-2 text-xs sm:text-sm md:h-8 md:space-x-3">
          <span className="flex w-full items-center justify-center space-x-3 text-lg font-medium text-white">
            <img onClick={() => navigate('/')} src={ASSETS.LOGO} />
            <div
              onClick={() => navigate('/profile')}
              className="cursor-pointer"
            >
              {user?.fname}
            </div>
          </span>
        </div>
      </div>
      {/*  */}
      <div className="flex items-center space-x-4 px-4 text-base font-normal text-white md:px-10 md:text-xl">
        <FaRegArrowAltCircleLeft
          className="cursor-pointer text-xl md:text-2xl"
          onClick={() => navigate(-1)}
        />
        <div>
          Chat with{' '}
          {location?.state?.driver?.fname +
            ' ' +
            location?.state?.driver?.lname}
        </div>
      </div>

      <div className="relative mx-auto w-11/12 rounded-md bg-gray-light py-4 md:w-7/12">
        <div className="flex flex-row items-center justify-between border-b-2 border-gray-normal px-8 pb-2">
          <div className="flex w-full justify-between ">
            <div className="flex flex-col space-y-1 text-xs md:text-sm">
              <div className="font-semibold">Order #{location?.state?._id}</div>
              <div className="text-xs">
                {moment(location?.state?.createdAt).format(
                  'MMM D, YYYY @ h:mm A'
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1 text-xs md:text-sm">
              <div className="font-semibold">
                Status :{' '}
                {
                  onGetOrderCurrentStatus(
                    location?.state,
                    location?.state?.estimatedTime
                  )?.status
                }
              </div>
              <div className="text-xs">{location?.state?.estimatedTime}</div>
            </div>
          </div>
        </div>
        <div className="   ">
          <div className=" Lato-Regular lg:text-normal scroll-[#ccc] flex h-[25rem] flex-col gap-2 overflow-y-scroll  scroll-smooth px-8  pt-5 text-sm text-white hover:scroll-auto">
            {messages?.map((items, id) => (
              <div
                key={id}
                className={`flex flex-row  items-center gap-2   ${
                  items?.message_by.email == user.email
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div className="mb-5 flex flex-col gap-1">
                  <div className="text-xs text-black-primary">
                    {onGetName(items.message_by)}
                  </div>
                  {items?.message && (
                    <div
                      ref={messagesEndRef}
                      className={`rounded-md px-4  py-1.5 text-xs lg:rounded-xl 2xl:text-sm ${
                        items?.message_by.email === user?.email
                          ? 'bg-purple-base text-white'
                          : 'bg-gray-normal text-black-primary'
                      }`}
                    >
                      {items?.message}
                    </div>
                  )}

                  {items?.image && (
                    <img
                      src={
                        items?.image?.includes('blob')
                          ? items?.image
                          : ` ${BASE_URL}/${items?.image}`
                      }
                      alt=""
                      className="h-32"
                    />
                  )}
                  {items?.attachments?.video && (
                    <video width="320" height="300" controls className="mt-0.5">
                      <source src={items?.attachments?.video} />
                    </video>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={submitHandler}
          id="messageForm"
          className="overflow-hidden "
        >
          <div className="items flex w-full justify-between rounded-md bg-white px-2 py-5 ">
            <div className="ml-2 flex w-full flex-row items-center justify-start gap-2">
              <label htmlFor="image" className="text-xl text-purple-base">
                <FaCamera />
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onUploadFile}
              />
              <label htmlFor="file" className="text-xl text-purple-base">
                <FaImage />
              </label>
              <input
                id="file"
                name="file"
                type="file"
                className="hidden"
                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.txt,video/*"
                onChange={onUploadFile}
              />

              <input
                type="text"
                ref={newMessage}
                className="Lato-Regular bg- ml-10 w-full rounded-2xl border-0  bg-gray-normal px-5 py-1 text-sm text-black-primary outline-none   placeholder:text-black-primary "
                placeholder="Write your message here..."
              />
            </div>

            <div className="mx-4 flex h-full items-center gap-2">
              <button
                type="submit"
                className="Loto-Bold cursor-pointer text-base text-purple-base"
              >
                SEND
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
