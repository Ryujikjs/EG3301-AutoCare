// LoginPopup.js

import React, { useState } from 'react';
import { LOGIN_URL, AMR_SPEED_URL, AMR_TASK_URL, CHANGE_STATUS_URL } from '../config.js';

const LoginPopup = ({ mode, location, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null); // Can be 'success', 'error', or null

  function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout)
      ),
    ]);
  }

  const createnewtask = async () => {
    try {
      console.log('entercreatenewtask');
      if(mode == 'Normal'){
        const amr_speed_response = await fetchWithTimeout( AMR_SPEED_URL, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTgwODIxMTcsIm5iZiI6MTY5ODA4MjExNywianRpIjoiNDBmOWQ2NTEtMzA4Zi00YmI0LTk4Y2EtYzFjNzdiOTNhYzk5IiwiZXhwIjoxNzAwNjc0MTE3LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.OoV75Eq0hjZZVZv0N10i8TZa5XKaeho3b1t0XmjdeJc',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {"type":1,"name":"Fleet1","categorical_speed":{"low":0.3,"medium":0.6,"high":1.2},"default_speed":{"forward":"low","backward":"low"},"max_speed":{"forward":"high","backward":"high"},"platform":"Magnus(v1.3)","payload":"None","charging_mode":["acsv","hcse"],"battery":{"high":80,"low":10,"swap":5},"network_loss":30,"default_footprint_id":4,"footprint_ids":[4],"default_volume":0,"slots":1,"max_dist_to_first_wp":2.6,"timestamp":"2023-03-09 01:03:08"})
        },5000);
        console.log('entermode');
      }
      else if(mode == 'Emergency'){
        const amr_speed_response = await fetchWithTimeout( AMR_SPEED_URL, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTgwODIxMTcsIm5iZiI6MTY5ODA4MjExNywianRpIjoiNDBmOWQ2NTEtMzA4Zi00YmI0LTk4Y2EtYzFjNzdiOTNhYzk5IiwiZXhwIjoxNzAwNjc0MTE3LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.OoV75Eq0hjZZVZv0N10i8TZa5XKaeho3b1t0XmjdeJc',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {"type":1,"name":"Fleet1","categorical_speed":{"low":0.3,"medium":1,"high":1.2},"default_speed":{"forward":"low","backward":"low"},"max_speed":{"forward":"high","backward":"high"},"platform":"Magnus(v1.3)","payload":"None","charging_mode":["acsv","hcse"],"battery":{"high":80,"low":10,"swap":5},"network_loss":30,"default_footprint_id":4,"footprint_ids":[4],"default_volume":0,"slots":1,"max_dist_to_first_wp":2.6,"timestamp":"2023-03-09 01:03:08"})
        },5000);   
        console.log('entermode');
      }

      const amr_response = await fetchWithTimeout( AMR_TASK_URL , {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTgwODIxMTcsIm5iZiI6MTY5ODA4MjExNywianRpIjoiNDBmOWQ2NTEtMzA4Zi00YmI0LTk4Y2EtYzFjNzdiOTNhYzk5IiwiZXhwIjoxNzAwNjc0MTE3LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.OoV75Eq0hjZZVZv0N10i8TZa5XKaeho3b1t0XmjdeJc',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"id":0,"amr_id":0,"workflow_id":124,"goals":[{"id":"6b5856d4-660e-4d0d-b8c9-996cbc00e846","goto":{"name":"Goto","description":"Goto goal command","command":"Goto","command_method":"goto","parameters":{"footprint_id":4,"station_id":"6b5856d4-660e-4d0d-b8c9-996cbc00e846","pos":[13,7],"route_type":{"name":"all","type":-1}},"type":"common","is_active":true,"id":"2.1","parent":"1.1","label":"Goal 1","waypoint_name":location},"pickups":[],"deliveries":[]}],"priority":100,"state":null}), // Adjust the request payload as needed
      },5000);

      console.log('task sent')
      setLoginStatus('success')
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error sending robot return command:', error);
      throw error;
    }
  };


  // const createnewtask = async () => {
  //   try {
  //     if(mode == 'Normal'){
  //       const amr_speed_response = await fetchWithTimeout( AMR_SPEED_URL, {
  //         method: 'PUT',
  //         headers: {
  //           'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTg2ODMxNDQsIm5iZiI6MTY5ODY4MzE0NCwianRpIjoiODkyMDU3MWEtNjdhNi00OGFmLThmNWUtMmQ4ZTY3ZWZmNTdjIiwiZXhwIjoxNzAxMjc1MTQ0LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.LLvaP-UOxZjY_V9iA2mLjJid1i3Z1IcRSg0A2EjQjfs',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify( {"type":1,"name":"Fleet1","categorical_speed":{"low":0.3,"medium":0.6,"high":1.2},"default_speed":{"forward":"low","backward":"low"},"max_speed":{"forward":"high","backward":"high"},"platform":"Magnus(v1.3)","payload":"None","charging_mode":["acsv","hcse"],"battery":{"high":80,"low":10,"swap":5},"network_loss":30,"default_footprint_id":4,"footprint_ids":[4],"default_volume":50,"slots":1,"max_dist_to_first_wp":2.6,"timestamp":"2023-03-09 01:03:08"})
  //       },5000);
  //       if(!amr_speed_response.ok){
  //         setLoginStatus('error');
  //       }
  //     }
  //     else if(mode == 'Emergency'){
  //       const amr_speed_response = await fetchWithTimeout( AMR_SPEED_URL, {
  //         method: 'PUT',
  //         headers: {
  //           'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTg2ODMxNDQsIm5iZiI6MTY5ODY4MzE0NCwianRpIjoiODkyMDU3MWEtNjdhNi00OGFmLThmNWUtMmQ4ZTY3ZWZmNTdjIiwiZXhwIjoxNzAxMjc1MTQ0LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.LLvaP-UOxZjY_V9iA2mLjJid1i3Z1IcRSg0A2EjQjfs',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify( {"type":1,"name":"Fleet1","categorical_speed":{"low":0.3,"medium":1,"high":1.2},"default_speed":{"forward":"low","backward":"low"},"max_speed":{"forward":"high","backward":"high"},"platform":"Magnus(v1.3)","payload":"None","charging_mode":["acsv","hcse"],"battery":{"high":80,"low":10,"swap":5},"network_loss":30,"default_footprint_id":4,"footprint_ids":[4],"default_volume":50,"slots":1,"max_dist_to_first_wp":2.6,"timestamp":"2023-03-09 01:03:08"})
  //       },5000);
  //       if(!amr_speed_response.ok){
  //         setLoginStatus('error');
  //       }        
  //     }

  //     const amr_response = await fetchWithTimeout( AMR_TASK_URL , {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTg2ODMxNDQsIm5iZiI6MTY5ODY4MzE0NCwianRpIjoiODkyMDU3MWEtNjdhNi00OGFmLThmNWUtMmQ4ZTY3ZWZmNTdjIiwiZXhwIjoxNzAxMjc1MTQ0LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.LLvaP-UOxZjY_V9iA2mLjJid1i3Z1IcRSg0A2EjQjfs',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({"id":0,"amr_id":0,"workflow_id":124,"goals":[{"id":"6b5856d4-660e-4d0d-b8c9-996cbc00e846","goto":{"name":"Goto","description":"Goto goal command","command":"Goto","command_method":"goto","parameters":{"footprint_id":4,"station_id":"6b5856d4-660e-4d0d-b8c9-996cbc00e846","pos":[13,7],"route_type":{"name":"all","type":-1}},"type":"common","is_active":true,"id":"2.1","parent":"1.2","label":"Goal 1","waypoint_name":location },"pickups":[],"deliveries":[]}],"priority":100,"state":null}), // Adjust the request payload as needed
  //     },5000);

  //     if(amr_response.ok){
  //       console.log('task sent')
  //       setLoginStatus('success')
  //       setTimeout(() => {
  //         onClose();
  //       }, 1000);
  //     } else {
  //       setLoginStatus('error')
  //     }
  //   } catch (error) {
  //     console.error('Error sending robot return command:', error);
  //     setLoginStatus('error')
  //   }
  // };

  const handleLogin = async () => {
    try {
        setLoginStatus('loading');
      // Mock API call (replace with actual API call)
      const response = await fetchWithTimeout(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'firstname':username, 'password':password }),
      },5000);


      // Check if the user is valid
      if (response.ok) {
        // User is valid, set the success status
        createnewtask();
        // Close the popup after a delay (you can customize the delay)
      } else {
        // User is not valid, set the error status
        setLoginStatus('wrong');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className="login-popup p-20 bg-white w-1/3 mx-auto mt-10 rounded-lg shadow-md relative">
          <button
            className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900"
            onClick={onClose} // Attach the onClose function to the close button
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        <h2 className="text-xl font-semibold mb-4 text-center">AUTHENTICATION</h2>
        {loginStatus === 'success' ? (
            <p className="text-green-600">Login successful! Task successfully sent! Redirecting...</p>
        ) : (
            <>
            <label className="block mb-2">
                Username:
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full border border-gray-300 rounded p-2"
                />
            </label>
            <label className="block mb-12">
                Password:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-gray-300 rounded p-2"
                />
            </label>
            {loginStatus === 'loading' ? (
            <div className="flex justify-center items-center mt-10">
                <button
                className="bg-blue-500 text-white py-2 px-4 rounded cursor-not-allowed w-32" // Set the width you desire
                disabled
                >
                <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Loading
                </button>
            </div>
            ) : (
            <div className="flex justify-center items-center relative">
                <button
                onClick={handleLogin}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue w-32" // Set the same width as the loading button
                >
                Login
                </button>
            </div>
            )}
            {loginStatus === 'wrong' && (
                <p className="text-red-500 mt-2 text-center">Invalid username or password!</p>
            )}
            {loginStatus === 'error' && (
                <p className="text-red-500 mt-2 text-center">Error occured, please try again!</p>
            )}
            </>
        )}
        </div>
    </div>
 
  );
};

export default LoginPopup;
