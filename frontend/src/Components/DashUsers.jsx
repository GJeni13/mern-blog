import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { Modal } from 'flowbite-react';
import {FaCheck,FaTimes} from 'react-icons/fa';


export default function DashUsers() {
  const {currentUser}=useSelector((state)=>state.user);
  const [users,setUsers]=useState([]);
  const [showMore,setShowMore]=useState(true);
  const [showModal,setShowModal]=useState(false); 
  const [userIdToDelete,setUserIdToDelete]=useState('');
  useEffect(()=>{
    const fetchUsers=async()=>{
      try{
        const res=await fetch(`/api/user/getusers`);
        const data=await res.json();
        if(res.ok){
          setUsers(data.users);
         if(data.users.length<9){
          setShowMore(false);
         
         }
        }
      }catch(error){
        console.log(error.message);
      }
      };
      if(currentUser.isAdmin){
        fetchUsers();
      }
  },[currentUser._id]);

const handleShowMore=async()=>{
  const startIndex=users.length;
  try{
    const res=await fetch
     (`/api/user/getusers?startIndex=${startIndex}`);
    const data=await res.json();
    if(res.ok){
      setUsers((prev)=>[...prev,...data.users]);
      if(data.users.length<9){
        setShowMore(false);
      }
    }
  }catch(error){
    console.log(error.message);
  }
};

const handleDeleteUser = async () => {
    try {
        const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
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
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <div className="shadow-md overflow-hidden rounded-lg">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-6 py-3">Date Created</th>
                  <th className="px-6 py-3">User Image</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Admin </th>
                  <th className="px-6 py-3">Delete</th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                     
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="w-10 h-10 object-cover rounded-full bg-gray-500"
                        />
                      
                    </td>
                    <td className="px-6 py-4">
                      
                        {user.username}
                     
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.isAdmin? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
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
        <p className="text-gray-500 dark:text-gray-400">You have no users yet!</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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