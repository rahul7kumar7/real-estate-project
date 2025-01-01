import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Contact({listing}){
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    }
    useEffect(() => {
        const fetchLandLord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch(error){
                console.error(error);
            }

    }
    fetchLandLord();
    }, [listing.userRef]);

    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-3">
                    <p>Contact <span className="font-semibold">{landlord.username}</span> for <span className="font-semibold">{listing.name.toLowerCase()}</span></p>
                    <textarea name="message" id="message"  rows="2" value={message} onChange={onChangeMessage} className="w-full border p-3 rounded-lg" placeholder="Enter your message here..."></textarea>
                    <Link className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg"  to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
                    Send Message
                    </Link>
                </div>
            )}
        </>
    );
}
