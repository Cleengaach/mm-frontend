import React from "react";
import "./modal.scss";
import { motion } from "framer-motion";

const Modal = ({ setIsOpen, children }) => {
    return (
        <div className="modal_wrap" onClick={() => setIsOpen(false)}>
            <motion.div
                key="modalBody"
                initial={{
                    opacity: 0, scale: 0.95
                }}
                animate={
                    { opacity: 1, scale: 1}
                }
                exit={
                    { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.15 }}
                className="modal_body">
                {children}
            </motion.div>

            <motion.div
                key="overlay"
                initial={{
                    opacity: 0
                }}
                animate={
                    { opacity: 1 }
                }
                exit={
                    { opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="modal_overlay"
            >

            </motion.div>
        </div>
    );
};

export default Modal;