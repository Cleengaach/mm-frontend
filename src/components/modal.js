import React from "react";
import "./modal.scss";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ setIsOpen, children }) => {

    return (
        <>

                <div className="modal_wrap"  onClick={() => setIsOpen(false)}>
                    <motion.div
                        initial={{
                            opacity: 0, scale: 0.95, y: 100
                        }}
                        animate={
                            { opacity: 1, scale: 1, y: 0 }
                        }
                        exit={
                            { opacity: 0, scale: 0.95, y: 100 }
                        }
                        transition={{ duration: 0.3 }}
                        className="modal_body">
                        {children}
                    </motion.div>

                    <motion.div
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
        </>
    );
};

export default Modal;