import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../../firebase.js';
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {signInSuccess} from "../../redux/user/userSlice.js";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result)

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
            })
            const data = await res.json()
            dispatch(signInSuccess(data));
            navigate('/');
        }catch(err){
            console.log('could not able to log in with google', err);
        }
    }
    return (
        <button onClick={handleGoogleClick} type="button" className="p-3 bg-red-700 text-white rounded-lg hover:opacity-95 uppercase">Continue with google</button>
    )
}