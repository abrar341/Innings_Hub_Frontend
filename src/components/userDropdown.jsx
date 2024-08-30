import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/auth/usersApiSlice';
import { logout } from '../slices/auth/authSlice';
import { toast } from 'react-hot-toast';


const UserDropdown = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);

    const data = userInfo._id;
    console.log(data)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const res = await login(data).unwrap();
    // dispatch(setCredentials({ ...res }));
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            const res = await logoutApiCall().unwrap();
            dispatch(logout());
            setIsOpen(false)
            toast.success(res.message)
            navigate('/account/login');
        } catch (err) {
            console.error(err);
        }
    };
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative  inline-block text-left">
            <div className='flex'>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3URjWpcZfPfzAHxrU_Xms2GzfUJmvWXGjuw&s" className='h-8 rounded-full  w-8 border' alt="" />

                </div>
                <button
                    type="button"
                    className="  text-sm font-medium text-white  focus:outline-none "
                    id="username"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="username"
                >
                    <div className="py-1" role="none">
                        <Link to="/profile" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
                            Profile
                        </Link>
                        <button
                            type="button"
                            className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                            role="menuitem"
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
