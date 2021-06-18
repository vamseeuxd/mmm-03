import React, {useState} from 'react';
import {Card, IconButton, CardContent, Button, CardAction} from "ui-neumorphism";
import Icon from "@mdi/react";
import {mdiCloseThick, mdiPlus} from "@mdi/js";

export default function MainMenu(props: { dark: boolean, toggleMainMenu: () => void }) {
    const {dark, toggleMainMenu} = props;
    const [menuData, setMenuData] = useState<any[]>([
        {label: 'Manage Income', id: 'manage_Income', open: false},
        {label: 'Manage Expenses', id: 'manage_Expenses', open: false},
        {label: 'Manage Tax Saving', id: 'manage_Tax_Saving', open: false},
        {label: 'Manage Assets', id: 'manage_Assets', open: false},
    ]);

    const onMenuToggleClick = (menu: any) => {
        setMenuData(menuData.map(d => {
            return menu.id === d.id ? ({...d, open: !d.open}) : d;
        }))
    }

    return (
        <Card elevation={5} className='main-menu-card' rounded dark={dark}>
            <IconButton
                dark={dark} onClick={() => toggleMainMenu()}
                className='float-end'
                style={{margin: '13px 13px 10px 10px'}}
                text={false}
                size='small'
                rounded
            >
                <Icon
                    path={mdiCloseThick}
                    size={0.7}
                />
            </IconButton>

            <div className='clearfix'/>
            <div className='vertical-menu'>
                {
                    menuData.map(menu => (
                        <Card key={menu.label} dark={dark} className='rounded-0 mb-2 mt-1 py-2 px-2 mx-4'>
                            <div className='m-0 p-0 d-flex justify-content-start align-items-center mb-2'>
                                <label>{menu.label}</label>
                                <IconButton dark={dark} size='small' onClick={() => onMenuToggleClick(menu)}
                                            className='ms-auto button-mode'><Icon
                                    className={menu.open ? 'plus-icon close' : 'plus-icon'} path={mdiPlus} size={0.8}/></IconButton>
                            </div>
                            <Card inset className={menu.open ? 'rounded-0 sub-menu open' : 'sub-menu'}>
                                <CardContent>

                                </CardContent>
                                <CardAction>
                                    <Button text>Learn More</Button>
                                </CardAction>
                            </Card>
                        </Card>
                    ))
                }
            </div>
        </Card>
    )
}
