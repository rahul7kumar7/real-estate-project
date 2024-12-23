import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {updateUserStart, updateUserFailure, updateUserSuccess, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess} from "../redux/user/userSlice.js";
import {useDispatch} from "react-redux";


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
      setFormData({...formData,[e.target.id]: e.target.value })
  }

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data =  await res.json();
      if (data.success === false){
          dispatch(updateUserFailure(data.message));
          return
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDelete = async (e) => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })
      const data = await res.json();
      if (data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async (e) => {
    try{
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = res.json();
      if (data.success === false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error){
        dispatch(signOutUserFailure(error.message));
    }
  }

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    console.log(`file is ${file.name}`);
    if (!file) {
      return;
    }

    const maxFileSize = 2 * 1024 * 1024;

    if (file.size > maxFileSize) {
      setFileUploadError(true);
      return;
    }
    setFileUploadError(false);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', import.meta.env.VITE_CLOUDINARY_UPLOAD_ENDPOINT);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        console.log(`Upload progress: ${progress}%`);
        setFilePerc(Math.round(progress));
      }
    });

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setFormData({...formData, avatar: response.url});
        console.log('File uploaded successfully', response.url);
      } else {
        console.error(`Upload failed;`, xhr.statusText);
        setFileUploadError(true);
      }
    }

    xhr.onerror = () => {
      console.log('Upload failed;', xhr.statusText);
      setFileUploadError(true);
    };

    xhr.send(data);

      // const res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_ENDPOINT, {
      //   method: 'POST',
      //   body: data
      // });
      // if (!res.ok) {
      //   console.log(res);
      //   setFileUploadError(true);
      // }
      // const downloadURL = await res.json();
      // setFormData({...formData, avatar: downloadURL.url})
      // console.log(downloadURL.url);
  }
    // old firebase code to upload image.....
    // const storage = getStorage(app);
    // const fileName = new Date().getTime() + file.name;
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, file);
    //
    // uploadTask.on(
    //     'state_changed',
    //     (snapshot) => {
    //       const progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       setFilePerc(Math.round(progress));
    //     },
    //     (error) => {
    //       setFileUploadError(true);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
    //           setFormData({ ...formData, avatar: downloadURL })
    //       );
    //     }
    // );
  // };
  return (
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
              onChange={(e) => setFile(e.target.files[0])}
              // onChange={handleFileUpload}
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
          />
          <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt='profile'
              className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />
          <p className='text-sm self-center'>
            {fileUploadError ? (
                <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
            ) : filePerc > 0 && filePerc < 100 ? (
                <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
                <span className='text-green-700'>Image successfully uploaded!</span>
            ) : (
                ''
            )}
          </p>
          <input
              type='text'
              placeholder='username'
              id='username'
              className='border p-3 rounded-lg'
              defaultValue={currentUser.username}
              onChange={handleChange}
          />
          <input
              type='email'
              placeholder='email'
              id='email'
              className='border p-3 rounded-lg'
              defaultValue={currentUser.email}
              onChange={handleChange}
          />
          <input
              type='password'
              placeholder='password'
              id='password'
              className='border p-3 rounded-lg'
              onChange={handleChange}
          />
          <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'loading...' : 'update'}
          </button>
        </form>
        <div className='flex justify-between mt-5'>
          <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete account</span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
        </div>
        <p className="text-red-700"> {error ? error : ''}</p>
        <p className="text-green-600">{updateSuccess ? 'User update Successfully': ''}</p>
      </div>
  );
}