import React from 'react';

 
function Mapping(map, posx, posy, rotation) {
    return (
        <div className='flex justify-center relative flex-grow min-w-full'>
        <img
            className='rounded-lg min-w-full'
            src={`data:image/png;base64,${map}`}
            alt="Map"
            style={{ width: '500px', height: '666px' }}
        />
        <img
            src="/amrfootprint.svg" // Replace with the path to your robot's SVG
            alt="Robot"
            style={{
                position: 'relative',
                left: `${posx}px`,
                top: `${posy}px`,
                width: '12px', // Adjust the size of the robot's footprint
                height: '12px',
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`, // Rotate the robot
                border: '2px solid green', // Add a green border for highlighting
            }}
        />
        </div>
    );
  }

  export default Mapping

