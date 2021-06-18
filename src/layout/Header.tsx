import React from 'react';
import {IconButton, Subtitle2} from "ui-neumorphism";
import Icon from "@mdi/react";
import {mdiMenu} from "@mdi/js";
import ThemedButton from "../pages/themes/Themed-button";

export default function Header(props: { dark: boolean, toggleMainMenu: () => void }) {
    const {dark, toggleMainMenu} = props;
    const headerClasses = 'app-header fixed-top w-100';
    return (
        <div className={headerClasses}>
            <div className='header-content w-100 d-flex justify-content-start align-items-center py-2 px-4'>

                <IconButton onClick={() => toggleMainMenu()}
                            text={false}
                            className='header-menu-button'
                            dark={dark} size='large' rounded>
                    <Icon path={mdiMenu} size={1}/>
                </IconButton>

                <Subtitle2 dark={dark} className='m-0 p-0 ms-3'>Monthly Money Manager - 02</Subtitle2>
                <ThemedButton dark={dark}/>
            </div>
        </div>
    )
}
