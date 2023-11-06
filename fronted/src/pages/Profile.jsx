import {useSelector } from "react-redux"
import {useRef , useState ,useEffect} from "react";
import {getStorage, ref,uploadBytesResumable , getDownloadURL} from "firebase/storage"
import { app } from '../firebase.js';


const Profile = () => {
  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file,setFile] = useState(undefined);
  const [filePerc , setFilePerc] = useState(0);
  const [fileUploadErr , setFileUploadErr] = useState(false)
  const [formData,setFormData] = useState({});
  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadErr);
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])
//firebase storage
// allow read;
// allow write : if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches("image/.*")


const handleFileUpload=(file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);


    uploadTask.on("state_changed", (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
    (error)=>{
        setFileUploadErr(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>
          setFormData({...formData,avatar : downloadURL})
      )
    }
  );
}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" src={ formData.avatar ||currentUser.avatar} alt="Profile" />
        <p className="text-sm self-center">
          {fileUploadErr ? 
            <span className="text-red-700">Error Image Upload(Image must be less than 2mb) </span> :
            filePerc > 0 && filePerc < 100 ? 
              (<span className="text-slate-700">{`Uploading ${filePerc}%`}</span>) : filePerc === 100 ? (
                <span className="text-green-700">Image Successfully  Uploaded!</span>) : ("")
              
          
          }
        </p>

        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-90 uppercase">Update</button>
      </form>
      <div className="flex justify-between mt-5"> 
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}

export default Profile