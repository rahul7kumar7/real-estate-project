import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/users/signin', {
        method: 'POST', headers: {
          'Content-type': 'application/json',
        }, body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setFormData(null);
      console.log(data);
      navigate("/");

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (<div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>


        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg"
                 onChange={handleChange}/>
          <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg"
                 onChange={handleChange}/>
          <button disabled={loading}
                  className='bg-slate-600 disabled:opacity-80 p-3 text-white rounded-lg uppercase hover:opacity-95'>{loading ? 'Loading....' : 'Sign In'}</button>
        </form>

        <div className="flex gap-1 mt-5">
          <p>Do not have an account?</p>
          <Link to={'/sign-up'}><span className='text-blue-700'>Sign Up</span> </Link>
        </div>
        {error && <p className='text-red-400 mt-5'>{error}</p>}
      </div>

  )
}
