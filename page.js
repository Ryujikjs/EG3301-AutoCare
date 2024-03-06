"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react';
import sghlogo from 'public/singapore-general-hospital-logo.jpg'
import autocarelogo from 'public/autocare.jpg'
import erroricon from 'public/error_icon.png'
import LoginPopup from './components/LoginPopup.js';
import StandbyPage from './components/Standby.js';
import DropoffPopup from './components/DropoffPopup.js';
import { CHANGE_STATUS_URL, AMR_STATUS_URL, RECOVERY_AMR_URL, STATION_RELEASE_URL, SERVER_STATUS_URL, AMR_SPEED_URL } from './config.js';


// export const NEW_TASK = {"id":1,"waypoint":{"amr_types":[],"config":{"theta":1.55,"theta_modulo":6.28,"theta_tolerance":0.05,"theta_waypoint":0,"goal_tolerance":0.1,"sd_id":[]},"footprints":[],"id":1,"map_id":"abfd8d7e-7e84-4007-aa89-003814168bf3","name":"RC1","type":"recovery","x":0.062,"y":0.251}};


function HomePage() {
  
  document.documentElement.webkitRequestFullscreen(); // Chrome, Safari

  const [status, setStatus] = useState('LOADING');
  const [mode, setMode] = useState('Normal');
  const [location, setLocation] = useState("OT1");
  const [estop, setEstop] = useState("idle");

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginPopup(true);
  };

  const handleLoginPopupClose = () => {
    setShowLoginPopup(false);
  };

  const operationalmode = 'Normal';

  //######################################################### Start of functions section #########################################################
  // Poll the status from the Django API every 1 second and update the webpage
  const pollStatus = async () => {
    try {
      // Fetch status from Django API and update setStatus\

      const response = await fetch( SERVER_STATUS_URL , {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        const jsonString = JSON.stringify(data);

        // Parse the JSON string into an array
        const dataArray = JSON.parse(jsonString);

        // Access the "mode" property from the first element of the array
        const modeValue = dataArray[0].mode;
        setStatus(modeValue);
        console.log(status)
      }
    } catch (error) {
      console.error('Error polling status:', error);
    }
  };


  const pollIdle = async () => {
    try {
      const standby_status_response = await fetch( AMR_STATUS_URL , {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTg2ODMxNDQsIm5iZiI6MTY5ODY4MzE0NCwianRpIjoiODkyMDU3MWEtNjdhNi00OGFmLThmNWUtMmQ4ZTY3ZWZmNTdjIiwiZXhwIjoxNzAxMjc1MTQ0LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.LLvaP-UOxZjY_V9iA2mLjJid1i3Z1IcRSg0A2EjQjfs',
          'Content-Type': 'application/json',
        },
      });

      const speed_response = await fetch( AMR_SPEED_URL , {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTg2ODMxNDQsIm5iZiI6MTY5ODY4MzE0NCwianRpIjoiODkyMDU3MWEtNjdhNi00OGFmLThmNWUtMmQ4ZTY3ZWZmNTdjIiwiZXhwIjoxNzAxMjc1MTQ0LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.LLvaP-UOxZjY_V9iA2mLjJid1i3Z1IcRSg0A2EjQjfs',
          'Content-Type': 'application/json',
        },
      });


      if(standby_status_response.ok){
        const status = await standby_status_response.json();
        const speed = await speed_response.json();
        const navigationState = status[0]["navigation_state"];
        const goal = status[0]["is_goal_reached"];
        const stationId = status[0]['goal']['waypoint_id']
        const operatingspeed = speed[0]['categorical_speed']['medium']
        const operatingstatus = status[0]['goal']['status']
        setEstop(status[0].navigation_state);
        console.log(status)
        


        if((stationId == 12 || stationId == 1) && ( navigationState == 'idle' || navigationState == 'cancelled' )){
          const server_response = await fetch( CHANGE_STATUS_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mode: 'STANDBY' }), // Adjust the request payload as needed
          });
          if(server_response.ok){
            // console.log('change  back to standby state')
          }
        }
        if(navigationState == 'navigating'){
          if(operatingspeed == 0.6){
            const moving_mode = await fetch( CHANGE_STATUS_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ mode: 'MOVING' }), // Adjust the request payload as needed
            });
            if(moving_mode.ok){
              console.log('moving')
            }
          } else if (operatingspeed == 1){
            const Emergency_mode = await fetch( CHANGE_STATUS_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ mode: 'PICKUP' }), // Adjust the request payload as needed
            });
            if(Emergency_mode.ok){
              console.log('emergency')
            }
          }
        }

        if(navigationState == 'recovery'){
          console.log('entered second if')
          const recover_amr = await fetch( RECOVERY_AMR_URL , {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTg2ODMxNDQsIm5iZiI6MTY5ODY4MzE0NCwianRpIjoiODkyMDU3MWEtNjdhNi00OGFmLThmNWUtMmQ4ZTY3ZWZmNTdjIiwiZXhwIjoxNzAxMjc1MTQ0LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.LLvaP-UOxZjY_V9iA2mLjJid1i3Z1IcRSg0A2EjQjfs',
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({"id":1,"waypoint":{"amr_types":[],"config":{"theta":1.55,"theta_modulo":6.28,"theta_tolerance":0.05,"theta_waypoint":0,"goal_tolerance":0.1,"sd_id":[]},"footprints":[],"id":1,"map_id":"abfd8d7e-7e84-4007-aa89-003814168bf3","name":"RC1","type":"recovery","x":0.062,"y":0.251}})
          });
          if(recover_amr.ok){
            // console.log('sent recovery point')
          }
        }
        if(stationId == 1 && navigationState == 'station'){
          const release_station = await fetch( STATION_RELEASE_URL , {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTg2ODMxNDQsIm5iZiI6MTY5ODY4MzE0NCwianRpIjoiODkyMDU3MWEtNjdhNi00OGFmLThmNWUtMmQ4ZTY3ZWZmNTdjIiwiZXhwIjoxNzAxMjc1MTQ0LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.LLvaP-UOxZjY_V9iA2mLjJid1i3Z1IcRSg0A2EjQjfs',
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({"id":1,"status":"released"})
          });
          if(release_station.ok){
            console.log('released')
          }
        }
        // if(operatingstatus == "completed"){
        //   const amr_speed_response = await fetch( AMR_SPEED_URL, {
        //     method: 'PUT',
        //     headers: {
        //       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTgwODIxMTcsIm5iZiI6MTY5ODA4MjExNywianRpIjoiNDBmOWQ2NTEtMzA4Zi00YmI0LTk4Y2EtYzFjNzdiOTNhYzk5IiwiZXhwIjoxNzAwNjc0MTE3LCJpZGVudGl0eSI6eyJncm91cF9uYW1lIjoicGFydG5lcl9hZG1pbiIsInVzZXJfbmFtZSI6InBhcnRuZXIiLCJmaXJzdF9uYW1lIjoiRElTVFJJQlVUT1IiLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiIiwiY3JlYXRvciI6InNlc3RvIiwiaWQiOiJjZGFmYjc2Ni04OGMxLTQwYTktYjc2NC0xMWRjYTc5MGNkNDkifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.OoV75Eq0hjZZVZv0N10i8TZa5XKaeho3b1t0XmjdeJc',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify( {"type":1,"name":"Fleet1","categorical_speed":{"low":0.3,"medium":0.6,"high":1.2},"default_speed":{"forward":"low","backward":"low"},"max_speed":{"forward":"high","backward":"high"},"platform":"Magnus(v1.3)","payload":"None","charging_mode":["acsv","hcse"],"battery":{"high":80,"low":10,"swap":5},"network_loss":30,"default_footprint_id":4,"footprint_ids":[4],"default_volume":0,"slots":1,"max_dist_to_first_wp":2.6,"timestamp":"2023-03-09 01:03:08"})
        //   });
        // }

      }
    } catch (error) {
      console.error('Error polling status:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      pollStatus();
      pollIdle();
    }, 1000); // Poll every 1 second

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Removed setStatus and setEstop from the dependency array to prevent re-creating the interval unnecessarily


  //######################################################### Start of Page content Section #########################################################

  // Define different page content based on the status 
  let pageContent;
  if(estop == "estopped"){
    pageContent = (
      <div className="min-h-screen flex items-center justify-center min-w-screen">
      <div className="text-center flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-16">ERROR Emergency Stop triggered</h1>
        <div className='motion-reduce:animate-bounce justify-center items-center mb-16 flex'>
          <Image height="300" src={erroricon} alt="Error Icon" />
        </div>
        <p className="text-2xl font-bold">Please release Stop button(red) and press release button(blue)</p>
      </div>
    </div> 
    );
  }
  else if (status === 'STANDBY') {
    pageContent = (
      <main className="min-h-screen min-w-full flex-col items-center justify-between px-20 overflow-hidden"> 
        <div className='flex justify-between px-10 py-2'>
          <Image height = '100' src={autocarelogo} alt="Autocare Logo" />
          <Image height='100' src={sghlogo} alt="SGH Logo" />
        </div>
        <div className='shadow-2xl shadow-black p-8 rounded-2xl mb-10 bg-green-700 min-w-full'>
          <div className= 'flex-col items-center justify-center '>
            <div className="flex justify-center mx-auto pt-10">
              <div className="w-28 h-28 bg-white rounded-full mx-auto"></div>
              <div className="w-28 h-28 bg-white rounded-full mx-auto"></div>
            </div>
            <div class="h-16 w-36 bg-white rounded-bl-full rounded-br-full mx-auto mt-10"></div>
          </div>
        </div>
        <div className="text-center">
            <h2 className="mb-3 text-2xl font-semibold">
              Dispatch{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="text-sm opacity-50">
              Please Enter the location and mode 
            </p>
            <label for="OT" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select value={location} onChange={(e) => {setLocation(e.target.value)}} id="OT" class="w-96 mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Select Delivery Location</option>
              <option value="OT1">Operating Theatre 1</option>
              <option value="OT2">Operating Theatre 2</option>
              <option value="OT3">Operating Theatre 3</option>
              <option value="OT4">Operating Theatre 4</option>
              <option value="ST6">testing</option>
            </select>
            <div class="flex justify-center space-y-6 py-6 sm:py-12 overflow-auto">
              <div class="">
                <button  onClick={() => setMode('Normal')} class="text-white mx-5">
                  <input class="hidden" type="radio" id="Normal" name="operating_mode" />
                  <label class="bg-gray-700 px-8 py-2.5 rounded-md" for="Normal">Normal</label>
                </button>
                <button  onClick={() => setMode('Emergency')} class="text-white mx-5">
                  <input class="hidden" type="radio" id="Emergency" name="operating_mode" />
                  <label class="bg-gray-700 px-5 py-2.5 rounded-md" for="Emergency">Emergency</label>
                </button>
              </div>
            </div>
            <button onClick={handleLoginButtonClick} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Dispatch
            </button>
        </div>
        {showLoginPopup && <LoginPopup mode ={mode} location ={location} onClose={handleLoginPopupClose} />}
      </main>
    );

  } else if (status === 'MOVING') {
    pageContent = (
      <div className="min-h-screen bg-green-700 overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex justify-between mx-auto mt-60">
          <div className="w-56 h-56 bg-white rounded-full mx-40 animate-bounce"></div>
          <div className="w-56 h-56 bg-white rounded-full mx-40 animate-bounce"></div>
        </div>
        <div class="h-36 w-72 bg-white rounded-bl-full rounded-br-full mx-auto mt-20 mb-10"></div>
      </div>
    </div>
    );
    } else if (status == 'PICKUP') {
      pageContent = (
        <div className="min-h-screen bg-red-600 overflow-hidden">
        <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-bold text-white text-4xl">Emergency Delivery of Blood, Keep Clear!</h1>
          <div className="flex justify-between mx-auto mt-36">
            <div className="w-56 h-56 bg-white rounded-full mx-40 animate-bounce"></div>
            <div className="w-56 h-56 bg-white rounded-full mx-40 animate-bounce"></div>
          </div>
          <div class="h-36 w-72 bg-white rounded-bl-full rounded-br-full mx-auto mt-20 mb-10"></div>
        </div>
      </div>  
      );
    } else if (status === 'DROPOFF') {
    pageContent = (
      <main className="min-h-screen flex-col items-center justify-between "> 
        <div className='flex justify-between px-10'>
          <Image height = '100' src={autocarelogo} alt="Autocare Logo" />
          <Image height='100' src={sghlogo} alt="SGH Logo" />
        </div>
        <div className='text-center px-32 my-40 justify-center items-center'>
          <h1 className='text-center text-4xl font-bold my-10'>DROPOFF</h1>
          <h2 className='shadow-2xl py-10 px-10 rounded-2xl my-5 bg-green-700 text-white'> Please collect the blood components from the compartment and press the completed button when done to send robot back.</h2>
          <button onClick={handleLoginButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-10">
              SEND BACK!
          </button>
        </div>
        {showLoginPopup && <DropoffPopup onClose={handleLoginPopupClose} />}
      </main>
    );
  }  else if (status === 'LOADING') {
    pageContent = (
      <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-32">Loading Page...</h1>
        <svg
            aria-hidden="true"
            role="status"
            className="inline w-20 h-20 mr-3 text-blue animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
      </div>
    </div>   
    );
  }

  return (
    <div>
      {pageContent}
    </div>
  );
}

export default HomePage;

