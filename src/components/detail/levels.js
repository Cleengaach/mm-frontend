import React, { useState } from "react";
import * as levelStyles from "./detail-level.module.scss";
import Modal from "../modal";

const Levels = ({ level, tourType }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={levelStyles.tour_basic_levels}>
            <div className={levelStyles.tour_basic_levels_item} onClick={() => setIsOpen(true)}>
                {level === 'easy' ? 'ľahká' : null}
                {level === 'medium' ? 'stredná' : null}
                {level === 'hard' ? 'ťažká' : null}
                {level === 'ferrata' ? 'ferata' : null}
                {level === 'guided' ? 's vodcom' : null}
            </div>
            <div className={levelStyles.tour_basic_levels_item}>
                {tourType === 'okruh' ? 'okruh' : null}
                {tourType === 'tamSpat' ? 'tam a späť' : null}
                {tourType === 'prechod' ? 'prechod' : null}
            </div>
            {isOpen &&
                <Modal setIsOpen={setIsOpen}>
                    <h3>nieco sadfsa</h3>
                </Modal>
            }
        </div>
    );
};

export default Levels;