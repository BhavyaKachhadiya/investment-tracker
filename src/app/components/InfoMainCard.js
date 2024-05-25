import React from 'react'

const InfoMainCard = ({firstlabel,firstvalue,secondlabel,secondvalue,thirdlabel,thirdvalue}) => {
  return (
    <>
        <div className="main-container grid grid-cols-3 mb-10 w-[55rem] py-[2rem] px-[2rem] border-[.06rem] rounded-[2.5rem] ">
            <div className="semi-container ">
                <h3 className="title font-semibold">{firstlabel}</h3>
                <p className="title-info">Rs. {firstvalue}</p>
            </div>
            <div className="semi-container">
                <h3 className="title font-semibold">{secondlabel}</h3>
                <p className="title-info">Rs. {secondvalue}</p>
            </div>
            <div className="semi-container">
                <h3 className="title font-semibold">{thirdlabel}</h3>
                <p className="title-info">Rs. {thirdvalue}</p>
            </div>
        </div>
    </>
  )
}

export default InfoMainCard