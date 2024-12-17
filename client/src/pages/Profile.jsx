import {useSelector} from "react-redux";

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
      <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4">
          <img src={currentUser.avatar} className="w-24 h-24 object-cover self-center rounded-full mt-2 cursor-pointer"
               alt=""/>
          <input type="text" placeholder="username" id="username" className="p-3 rounded-lg border"/>
          <input type="email" placeholder="email" id="email" className="p-3 rounded-lg border"/>
          <input type="text" placeholder="password" id="password" className="p-3 rounded-lg border"/>
          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
            update
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">
            Delete account?
          </span>
          <span className="text-red-700 cursor-pointer">
            Sign Out
          </span>
        </div>
      </div>
  )
}
