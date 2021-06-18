import React, {useState} from 'react';
import {IconButton} from "ui-neumorphism";
import Icon from "@mdi/react";
import {mdiDatabaseArrowLeft, mdiDatabaseArrowRight, mdiPiggyBank, mdiTabletDashboard} from "@mdi/js";

export default function Footer(props: { dark: boolean }) {
    const [activeButton, setActiveButton] = useState('Dash');
    const {dark} = props;
    const buttons = [
        {name: 'Dash', icon: mdiTabletDashboard},
        {name: 'Expenses', icon: mdiDatabaseArrowRight},
        {name: 'Income', icon: mdiDatabaseArrowLeft},
        {name: 'Savings', icon: mdiPiggyBank},
    ];
    const footerClasses = 'app-footer fixed-bottom w-100';
    return (
        <div className={footerClasses}>
            <div className='toggle-button-group w-100 d-flex justify-content-between py-2 px-4'>
                {
                    buttons.map(button => (
                        <IconButton key={button.name} onClick={() => setActiveButton(button.name)}
                                    active={activeButton === button.name}
                                    className='footer-tab-button' dark={dark} size='large' rounded>
                            <div className='pt-2 d-flex flex-column justify-content-center align-items-center py-2'>
                                <Icon path={button.icon} size={0.9}/>
                                <p className='icon-label m-0 mt-1 text-truncate'>{button.name}</p>
                            </div>
                        </IconButton>
                    ))
                }
            </div>
        </div>
    )
}
