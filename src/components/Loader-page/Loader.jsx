import React from 'react'
import "./Loader.css"
const Loader = () => {
    return (
        <>
            <div className='loader_container'>
                <div style={{alignItems:"center"}} className='d-flex text-center justify-content-center  w-100'>

                <svg viewBox="25 25 50 50" className='svgloader'>
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
                </div>
            </div>
        </>
    )
}

export default Loader