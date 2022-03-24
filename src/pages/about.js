import React, { useEffect } from "react";
import { motion } from "framer-motion"

const AboutPage = ({ transitionStatus, entry, exit }) => {
    useEffect(() => {
        console.log(transitionStatus, entry, exit)
        if (transitionStatus === 'exiting') {
            //play the exit animation  
        }
        if (transitionStatus === 'entering') {
            //play the enter animation  
        }
        if (transitionStatus === 'entered') {
            //the page is loaded, play another animation
        }
    }, [transitionStatus]);
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={
                transitionStatus === "entered"
                    ? { opacity: 1 }
                    : { opacity: 0 }
            }
            transition={{ duration: 0.2 }}
        >
            asdfsa
        </motion.div>
    );
}

export default AboutPage;
