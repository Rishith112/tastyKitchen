import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = Cookies.get('jwt_token');
        if (jwt) {
            navigate('/home', { replace: true });
        }
    }, [navigate]);;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'https://tastykitchen-backend-uok6.onrender.com/api/users/register';
        const userDetails = { username, password };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                setError('');
                navigate('/login', { replace: true });
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden">
            <div className="flex flex-1 items-center justify-center bg-[#f8fafc] h-full">
                <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-sm flex flex-col items-center">
                    <img src="https://res.cloudinary.com/dbwnoheep/image/upload/v1750759230/Frame_274_gavlyp.png" alt="logo" className="w-12 h-12 mb-2" />
                    <span className="text-xl font-semibold italic text-[#f59e0b] mb-2">Tasty Kitchens</span>
                    <h2 className="text-lg font-medium mb-4 text-[#1e293b]">Sign Up</h2>
                    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-xs font-semibold mb-1" htmlFor="username">USERNAME</label>
                            <input
                                id="username"
                                type="text"
                                className="w-full px-3 py-2 border border-gray-200 rounded bg-[#f1f5f9] focus:outline-none"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1" htmlFor="password">PASSWORD</label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-3 py-2 border border-gray-200 rounded bg-[#f1f5f9] focus:outline-none"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#f59e0b] text-white py-2 rounded mt-2 font-medium hover:bg-[#d97706] transition-colors">Sign Up</button>
                    </form>
                    {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
                    <button
                        className="mt-4 text-xs text-[#f59e0b] underline"
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
            <div className="hidden md:block flex-1 h-full">
                <img
                    src="https://res.cloudinary.com/dbwnoheep/image/upload/v1753977183/ceff20e8367d1981f2a409a617ac848670d29c7e_f4qmug.jpg"
                    alt="food"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default SignUp;
