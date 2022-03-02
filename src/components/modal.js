import React from "react";
import "./modal.scss";

const Modal = ({ setIsOpen,children }) => {

    const showHideClassName = setIsOpen ? "modal_wrap open" : "modal_wrap";

    return (
        <>
            <div className={showHideClassName} >
                <div className="modal_body">
                    {children}
                </div>

                <div className="modal_overlay" onClick={() => setIsOpen(false)}></div>
            </div>
        </>
    );
};

export default Modal;