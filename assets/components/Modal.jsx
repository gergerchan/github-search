import React, { useState } from "react";
import dayjs from "dayjs";

const Modal = ({ open, close, data }) => {
  console.log(data);

  const showHideClassName = open
    ? "gthb-modal gthb-modal-show"
    : "gthb-modal-hide";

  return (
    <div className={showHideClassName}>
      <div className='gthb-modal-content'>
        <button type='button' className='gthb-modal-close' onClick={close}>
          X
        </button>
        {data && (
          <div>
            <span className='gthb-user-repo__card-id'>{data.id}</span>
            <span className='gthb-user-repo__card-badge'>
              {data.language || "Unknown"}
            </span>
            <p className='gthb-user-repo__card-date'>
              Created At : {dayjs(data.created_at).format("DD-MM-YYYY")}
            </p>
            <h3 className='gthb-user-repo__card-name'>{data.name}</h3>
            <p className='gthb-user-repo__card-date'>{data.description}</p>
            <p className='gthb-user-repo__card-date'>
              Last Update : {dayjs(data.updated_at).format("DD-MM-YYYY")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
