import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar/Navbar";
import NoteCards from "../../component/cards/NoteCards";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import moment from "moment";
import Toast from "../../component/ToastMessage/Toast";
import EmptyCard from "../../component/EmptyCard/EmptyCard";
import AddNoteImg from "../../assets/images/AddNoteImg.png";
import NoDataImge from "../../assets/images/NoDataImge.jpg";

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [allNotes, setAllNotes] = useState([]);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditNote({ isShown: true, type: "edit", data: noteDetails });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Get user-info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        // setUserInfo(response.data.user);
        console.log(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  };

  //Delete  Notes
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again");
      }
    }
  };

  //Search
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Pinned Note

  const updateIsPinned = async(noteData)=>{
    const nodeId = noteData._id
    try{
      const response = await axiosInstance.put("/update-note-pinned/"+ nodeId,{
        isPinned:!noteData.isPinned
      });
  
      if(response.data && response.data.note){
        showToastMessage("Note Pinned Successful");
        getAllNotes();
      
      }
     }catch(error){
      console.log(error);
     }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        <h1>{userInfo}</h1>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes && allNotes.length > 0 ? (
            allNotes.map((item) => (
              <NoteCards
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))
          ) : (
            <EmptyCard
              imgSrc={isSearch ? NoDataImge : AddNoteImg}
              message={isSearch? `Oops no data found matching your search`:"Start creating your first note! Click the 'ADD' button to jot down yourthoughts, idea, and remainder. Let's get started!"}
            />
          )}
        </div>
      </div>

      <button
        className="h-16 w-16 flex justify-center items-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditNote({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditNote.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditNote.type}
          noteData={openAddEditNote.data}
          onClose={() => {
            setOpenAddEditNote({ isShown: false, type: "data", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        showToastMessage={showToastMessage}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
