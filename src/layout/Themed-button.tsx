import {mdiCloseThick, mdiOpacity} from "@mdi/js";
import {Icon} from "@mdi/react";
import React, {useState} from "react";
import {Body2, Button, Card, CardAction, CardContent, Dialog, H5, H6, IconButton, Subtitle2} from "ui-neumorphism";


export default function ThemedButton() {
    const [showMainMenu, setShowMainMenu] = useState(false);
    return (
        <>
            <IconButton onClick={() => setShowMainMenu(true)} className="ms-auto" rounded text={false}>
                <Icon path={mdiOpacity} size={1}/>
            </IconButton>
            <Dialog persistent={true} className='main-menu-dialog' minWidth={300} visible={showMainMenu} onClose={() => setShowMainMenu(false)}>
                <Card>
                    <Card flat className="d-flex justify-content-between align-items-center border-bottom rounded-0">
                        <H6 className="ms-3 mt-2">Theme Configuration</H6>
                        <IconButton onClick={() => setShowMainMenu(false)} style={{margin: '13px 13px 10px 10px'}} text={false} size='small' rounded>
                            <Icon path={mdiCloseThick} size={0.7}/>
                        </IconButton>
                    </Card>
                    <CardContent>
                        <Subtitle2 secondary style={{marginBottom: '4px'}}>
                            Word of the day
                        </Subtitle2>
                        <H5>
                            be<span>•</span>nev<span>•</span>o<span>•</span>lent
                        </H5>
                        <Subtitle2 secondary style={{marginBottom: '12px'}}>
                            adjective
                        </Subtitle2>
                        <Body2>
                            well meaning and kindly.
                            <br/>
                            "a benevolent smile"
                        </Body2>
                    </CardContent>
                    <CardAction>
                        <Button text>
                            Learn More
                        </Button>
                    </CardAction>
                </Card>
            </Dialog>
        </>
    )
}
