import  { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { Modal } from 'flowbite-react';
import {set} from 'mongoose';

export default function DashPosts() {
  const {currentUser}=useSelector((state)=>state.user);
  const [userPosts,setUserPosts]=useState([]);
  const [showMore,setShowMore]=useState(true);
  const [showModal,setShowModal]=useState(false); 
  const [postIdToDelete,setPostIdToDelete]=useState('');
  useEffect(()=>{
    const fetchPosts=async()=>{
      try{
        const res=await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data=await res.json();
        if(res.ok){
          setUserPosts(data.posts);
         if(data.posts.length<9){
          setShowMore(false);
         
         }
        }
      }catch(error){
        console.log(error.message);
      }
      };
      if(currentUser.isAdmin){
        fetchPosts();
      }
  },[currentUser._id]);

const handleShowMore=async()=>{
  const startIndex=userPosts.length;
  try{
    const res=await fetch
     (`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
    const data=await res.json();
    if(res.ok){
      setUserPosts((prev)=>[...prev,...data.posts]);
      if(data.posts.length<9){
        setShowMore(false);
      }
    }
  }catch(error){
    console.log(error.message);
  }
};

const handleDeletePost = async () => {
  setShowModal(false);
  try {
    const res = await fetch(
      `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
      {
        method: 'DELETE',
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      setUserPosts((prev) =>
        prev.filter((post) => post._id !== postIdToDelete)
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};


  return (
    <div className="overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <div className="shadow-md overflow-hidden rounded-lg">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-6 py-3">Date Updated</th>
                  <th className="px-6 py-3">Post Image</th>
                  <th className="px-6 py-3">Post Title</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Delete</th>
                  <th className="px-6 py-3">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {userPosts.map((post) => (
                  <tr
                    key={post._id}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-10 object-cover rounded bg-gray-500"
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{post.category}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-post/${post._id}`}
                      >
                        Edit
                      </Link>
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
        <p className="text-gray-500 dark:text-gray-400">You have no posts yet!</p>
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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