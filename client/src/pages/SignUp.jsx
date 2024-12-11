import {Link} from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>

      <form className="flex flex-col gap-4" >
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg"/>
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg"/>
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg"/>
        <button className='bg-slate-600 disabled:opacity-80 p-3 text-white rounded-lg uppercase hover:opacity-95'>Sign Up</button>
      </form>

      <div className="flex gap-1 mt-5"  >
        <p>Have an account?</p>
        <Link to={'/sign-in'}><span className='text-blue-700'>Sign In</span> </Link>
      </div>

    </div>

  )
}
