import {mdiCloseThick, mdiOpacity} from "@mdi/js";
import {Icon} from "@mdi/react";
import React, {useContext, useEffect, useState} from "react";
import {
    Card,
    CardContent,
    Dialog,
    H6,
    IconButton,
    overrideThemeVariables,
    ToggleButton,
    ToggleButtonGroup
} from "ui-neumorphism";
import AddThemeButton from "./Add-theme-button";
import {FirebaseContext, ITheme} from "../../providers/firebase-context";


export default function ThemedButton(props: { dark: boolean }) {
    const {dark} = props;
    // @ts-ignore
    const {themes} = useContext(FirebaseContext);
    const [themesList, setThemesList] = useState<any[]>([]);
    const [showThemesListDialog, setShowThemesListDialog] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<string>('3');

    useEffect(() => {
        const _theme = window.localStorage.getItem('selectedTheme');
        _theme && setSelectedTheme(_theme);
        const subs = themes.collection.subscribe((value: ITheme[]) => {
            setThemesList(value);
            const _selectedTheme = value.find(d => d.id === _theme);
            if (_selectedTheme) {
                overrideThemeVariables(_selectedTheme);
            }
        });
        return () => {
            subs.unsubscribe();
        };
    }, [themes.collection]);

    useEffect(() => {
        window.localStorage.setItem('selectedTheme', selectedTheme);
        const _selectedTheme = themesList.find(d => d.id === selectedTheme);
        if (_selectedTheme) {
            overrideThemeVariables(_selectedTheme);
        }
    }, [selectedTheme, themesList]);

    const renderMainButton = () => {
        return (
            <IconButton onClick={() => setShowThemesListDialog(true)}
                        dark={dark}
                        className="ms-auto border-0"
                        rounded
                        text={false}>
                <Icon path={mdiOpacity} size={1}/>
            </IconButton>
        )
    }

    const renderMainCard = () => (
        <Card dark={dark} rounded elevation={5} className="manage-theme-card">
            {renderMainHeader()}
            {renderMainContent()}
            {renderMainFooter()}
        </Card>
    )

    const renderMainHeader = () => (
        <Card rounded flat bordered
              dark={dark}
              className="
              d-flex
              rounded-0
              mx-3
              justify-content-between
              align-items-center
              border-top-0
              border-start-0
              border-end-0
              "
        >
            <H6 dark={dark} className="ms-3 mt-2">Theme Configuration</H6>
            <IconButton dark={dark} onClick={() => setShowThemesListDialog(false)}
                        className="mt-3 mb-2 border-0"
                        text={false}
                        size='small'
                        rounded>
                <Icon path={mdiCloseThick} size={0.7}/>
            </IconButton>
        </Card>
    )

    const renderMainContent = () => (
        <CardContent dark={dark}>
            <Card dark={dark} className="py-1 px-3"
                  style={{height: 'calc(100vh - 195px)', overflowY: 'auto'}} inset>
                {renderThemesList()}
            </Card>
        </CardContent>
    )

    const renderThemesList = () => {
        return (
            <ToggleButtonGroup dark={dark} value={selectedTheme} className="mt-2" multiple={false}>
                {
                    themesList && themesList.map(d => {
                        return (
                            <ToggleButton dark={dark} color='var(--primary)' key={d.id}
                                          onClick={() => setSelectedTheme(d.id)}
                                          value={d.id}
                                          className="py-3 px-3 d-block w-100 h-auto">
                                {d.id}
                            </ToggleButton>
                        )
                    })
                }
            </ToggleButtonGroup>
        )
    }

    const renderMainFooter = () => (
        <Card rounded flat
              bordered
              dark={dark}
              className="
              position-absolute
              mb-3
              bottom-0
              d-flex
              justify-content-end
              align-items-center
              border-bottom-0
              border-start-0
              border-end-0
              rounded-0
              end-0
              start-0
              pe-3
              mx-3
              pt-3
              "
        >
            <AddThemeButton dark={dark}/>
        </Card>
    )


    return (
        <>
            {renderMainButton()}
            <Dialog dark={dark} persistent={true} className="manage-theme-dialog" visible={showThemesListDialog}
                    onClose={() => setShowThemesListDialog(false)}>
                {renderMainCard()}
            </Dialog>
        </>
    )
}
