import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { Modal } from 'flowbite-react';
import {FaCheck,FaTimes} from 'react-icons/fa';


export default function DashComments() {
  const {currentUser}=useSelector((state)=>state.user);
  const [comments,setComments]=useState([]);
  const [showMore,setShowMore]=useState(true);
  const [showModal,setShowModal]=useState(false); 
  const [commentIdToDelete,setCommentIdToDelete]=useState('');
  useEffect(()=>{
    const fetchComments=async()=>{
      try{
        const res=await fetch(`/api/comment/getcomments`);
        const data=await res.json();
        if(res.ok){
          setComments(data.comments);
         if(data.comments.length<9){
          setShowMore(false);
         
         }
        }
      }catch(error){
        console.log(error.message);
      }
      };
      if(currentUser.isAdmin){
        fetchComments();
      }
  },[currentUser._id]);

const handleShowMore=async()=>{
  const startIndex=comments.length;
  try{
    const res=await fetch
     (`/api/comment/getcomments?startIndex=${startIndex}`);
    const data=await res.json();
    if(res.ok){
      setComments((prev)=>[...prev,...data.comments]);
      if(data.comments.length<9){
        setShowMore(false);
      }
    }
  }catch(error){
    console.log(error.message);
  }
};

const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <div className="shadow-md overflow-hidden rounded-lg">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-6 py-3">Date Updated</th>
                  <th className="px-6 py-3">Comment Content</th>
                  <th className="px-6 py-3">Number of Likes</th>
                  <th className="px-6 py-3">PostId</th>
                  <th className="px-6 py-3">UserId</th>
                  <th className="px-6 py-3">Delete</th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {comments.map((comment) => (
                  <tr
                    key={comment._id}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      {new Date(comment.UpdatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                     
                       {comment.content}
                      
                    </td>
                    <td className="px-6 py-4">
                      
                        {comment.numberofLikes}
                     
                    </td>
                    <td className="px-6 py-4">{comment.postId}</td>
                    <td className="px-6 py-4">

                    {comment.userId}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
                        }}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">You have no comments yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}   