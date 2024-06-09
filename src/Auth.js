import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleAuth = async (event) => {
        event.preventDefault();
        const endpoint = isLogin ? 'login' : 'register';
        const payload = isLogin ? { email, password } : { email, password, username };
        try {
            const response = await axios.post(`http://localhost:5000/${endpoint}`, payload);
            const { token } = response.data;
            localStorage.setItem('token', token);
            alert('Success!');
        } catch (error) {
            console.error('Error during authentication', error);
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleAuth}>
                {!isLogin && (
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                )}
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
            <div>
                <h3>Connect with social media</h3>
                <button onClick={() => alert('Connect with Facebook')}>Connect with Facebook</button>
                <button onClick={() => alert('Connect with Google')}>Connect with Google</button>
            </div>
        </div>
    );
};

export default Auth;
