import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"

const AnimateWrap = ({ transitionStatus, entry, exit, children }) => {
    const [status, setStatus] = useState('');



    useEffect(() => {
        if (transitionStatus === 'exiting') {
            setStatus('exiting');
        }
        if (transitionStatus === 'entering') {
            setStatus('entering');
        }
        if (transitionStatus === 'entered') {
            setStatus('entered');
        }
        if (transitionStatus === undefined) {
            setStatus('entered');
        }
    }, [transitionStatus]);
    console.log(transitionStatus)


    return (
        <AnimatePresence>
            <motion.main
                initial={{
                    opacity: 0
                }}
                animate={
                    transitionStatus === "entered"
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: "100%" }
                }
                exit={
                    transitionStatus === "exiting"
                        ? { opacity: 0, x: 0 }
                        : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.7 }}
            >
                {children}
            </motion.main>
        </AnimatePresence>
    );
}

export default AnimateWrap;
