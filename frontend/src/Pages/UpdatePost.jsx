import { uploadBytesResumable , ref} from 'firebase/storage';
import { FileInput, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getStorage} from 'firebase/storage';

import { useState ,useEffect} from 'react';
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate,useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function UpdatePost() {
    const [file,setfile]=useState(null);
    const [imageUploadProgress,setImageUploadProgress]=useState(null);
    const [imageUploadError,setImageUploadError]=useState(null);
    const [formData,setFormData]=useState({}); 
    const [publishError,setPublishError]=useState(null);
    const {postId}=useParams();

const navigate=useNavigate();
const {currentUser}=useSelector((state)=>state.user)

useEffect(()=>{
    try{
        const fetchPost=async()=>{
            const res=await 
             fetch(`/api/post/getposts?postId=${postId}`);
            const data=await res.json();
            if(!res.ok){
                console.log(data.message);
                setPublishError(data.message);
                return;
            }
            if(res.ok){
                setPublishError(null);
                setFormData(data.posts[0]);
            }
        };
        fetchPost();
    }catch(error){
        console.log(error);
    }
},[postId]);

    const handleUploadImage=async()=>{
        try{
            if(!file){
                setImageUploadError('please select an image');
                return;
            }
            setImageUploadError(null);
            const storage=getStorage(app);
            const fileName=new Date().getTime()+'-'+file.name;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,file);
            uploadTask.on('state_changed',
            (snapshot)=>{
                const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                setImageUploadProgress(progress.toFixed(0));
            },
            (error)=>{
                setImageUploadError('Image upload failed');
                setImageUploadProgress(null);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageUploadProgress(null);
                    setImageUploadError(null);
                    setFormData({...formData,image:downloadURL});
                });
            }
        );
        }catch(error){
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);  
            console.log(error);
        }
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            const data=await res.json();
            if(!res.ok){
               setPublishError(data.message);
               return
            }
           
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`);
                
            }
        }catch(error){
            setPublishError('Something went wrong');
        }
    };
    
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-3xl font-semibold text-center my-7'>Update Post</h1>
        <form className='flex flex-col mt-7 gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1'
              onChange={(e)=>setFormData({...formData,title: e.target.value})
              }
              value={formData.title}/>
                <select onChange={(e)=>setFormData({...formData,category:e.target.value})}
                    value={formData.category}>
                    <option value="uncategorized">Select a category</option>
                    <option value="food">Food</option>
                    <option value="travel">travel</option>
                    <option value="entertainment">Entertainment</option>
                </select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={(e)=> setfile(e.target.files[0])}/>
                <button type='button' className='bg-gradient-to-r rounded-lg from-purple-500 via-pink-500 to-red-500 text-black sm:' 
                outline onClick={handleUploadImage}
                disabled={imageUploadProgress} >
                        
                            {imageUploadProgress ? (
                                <div className='W-16 h-16'>
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                                </div>
                            ):(
                                'Upload Image'
                            )
                            }
                        
                </button>
            </div>
            {imageUploadError && <alert color='failure'>{imageUploadError}</alert>}
            {formData.image && (
                <img src={formData.image} alt='upload' className='w-full h-72 object-cover'/>
            )}
                <ReactQuill theme='snow' value={formData.content} placeholder='write something....' className='h-72 mb-12' required onChange={(value)=>{setFormData({...formData,content:value});
            }}/>
<button type='submit' className='bg-gradient-to-r rounded-lg from-purple-500 via-pink-500 to-red-500 text-black' > 
Update Post
</button>
{publishError && <alert color='failure' className='mt-5'>{publishError}</alert>}
        </form>

    </div>
  )
}
