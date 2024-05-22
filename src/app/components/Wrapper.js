import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className='lg:mx-[2rem] lg:my-[1.25rem] mx-2 my-2'>
        {children}
    </div>
  )
}

export default Wrapper