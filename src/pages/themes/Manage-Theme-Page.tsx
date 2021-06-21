import {mdiCloseThick, mdiLeadPencil, mdiOpacity, mdiTrashCanOutline} from "@mdi/js";
import {Icon} from "@mdi/react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Dialog,
    H6,
    IconButton,
    overrideThemeVariables,
    ToggleButton,
    ToggleButtonGroup
} from "ui-neumorphism";
import AddOrUpdateThemePage from "./Add-Or-Update-Theme-Page";
import {FirebaseContext, ITheme} from "../../providers/firebase-context/firebase-context";
import {ThemeContext} from "../../providers/theme-context/theme-context";


export default function ManageThemePage() {
    const addOrUpdateThemeRef = useRef();
    const {isDark, toggleDarkMode} = useContext(ThemeContext);
    // @ts-ignore
    const {themes} = useContext(FirebaseContext);
    const [themesList, setThemesList] = useState<any[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [themeToEdit, setThemeToEdit] = useState<ITheme | null>(null);
    const [showThemesListDialog, setShowThemesListDialog] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<any>(null);

    useEffect(() => {
        const _theme = window.localStorage.getItem('selectedTheme');
        if (_theme !== 'null' && _theme) {
            overrideThemeVariables(JSON.parse(_theme));
            setSelectedTheme(JSON.parse(_theme));
        }
        const subs = themes.collection.subscribe((value: ITheme[]) => {
            setThemesList(value);
            const _selectedTheme = value.find(d => d.id === 'default');
            if (_selectedTheme && !_theme) {
                overrideThemeVariables(_selectedTheme);
                setSelectedTheme(_selectedTheme);
            }
        });
        return () => {
            subs.unsubscribe();
        };
    }, [themes.collection]);

    useEffect(() => {
        if (selectedTheme) {
            const dataToStore = JSON.stringify(selectedTheme).replace(/\\/g, '');
            window.localStorage.setItem('selectedTheme', dataToStore);
            const _selectedTheme = themesList.find(d => d.id === selectedTheme?.id);
            if (_selectedTheme) {
                overrideThemeVariables(_selectedTheme);
            }
        }
    }, [selectedTheme, themesList]);

    const renderMainButton = () => {
        return (
            <IconButton onClick={() => setShowThemesListDialog(true)}
                        dark={isDark}
                        style={{marginRight: '-15px'}}
                        className="ms-auto border-0"
                        rounded
                        text={false}>
                <Icon path={mdiOpacity} size={1}/>
            </IconButton>
        )
    }

    const renderMainCard = () => (
        <Card dark={isDark} rounded elevation={5} className="manage-theme-card">
            {renderMainHeader()}
            {renderMainContent()}
            {renderMainFooter()}
        </Card>
    )

    const renderMainHeader = () => (
        <Card rounded flat bordered
              dark={isDark}
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
            <H6 dark={isDark} className="ms-3 mt-2">Theme Configuration</H6>
            <IconButton dark={isDark} onClick={() => setShowThemesListDialog(false)}
                        className="mt-3 mb-2 border-0"
                        text={false}
                        size='small'
                        rounded>
                <Icon path={mdiCloseThick} size={0.7}/>
            </IconButton>
        </Card>
    )

    const renderMainContent = () => (
        <CardContent dark={isDark}>
            <Card dark={isDark} className="py-1 px-3"
                  style={{height: 'calc(100vh - 195px)', overflowY: 'auto'}} inset>
                {renderThemesList()}
            </Card>
        </CardContent>
    )

    const editTheme = (e: MouseEvent, theme: ITheme) => {
        e.stopPropagation();
        setThemeToEdit(theme);
        setIsEdit(true);
        // @ts-ignore
        addOrUpdateThemeRef?.current?.setShowDialog(true, theme, true);
    }

    const deleteTheme = async (e: MouseEvent, theme: ITheme) => {
        e.stopPropagation();
        const isConfirmed = window.confirm('Are you sure!Do you want to delete theme?');
        if (isConfirmed) {
            const docRef = themes.getDoc(theme.id);
            await docRef.delete();
        }
    }

    const renderThemesList = () => {
        return (
            <ToggleButtonGroup dark={isDark} value={selectedTheme?.name} className="mt-2" multiple={false}>
                {
                    themesList && themesList.map(d => {
                        return (
                            <ToggleButton dark={isDark} key={d.name}
                                          onClick={() => setSelectedTheme(d)}
                                          value={d.name}
                                          className="toggle-button-content py-3 px-3 d-block w-100 h-auto">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    {d.name}
                                    <div>
                                        <IconButton disabled={selectedTheme?.name === d.name || d.default}
                                                    onClick={(e: MouseEvent) => editTheme(e, d)} dark={isDark}><Icon
                                            path={mdiLeadPencil} size={1}/></IconButton>
                                        <IconButton disabled={selectedTheme?.name === d.name || d.default}
                                                    onClick={(e: MouseEvent) => deleteTheme(e, d)} dark={isDark}><Icon
                                            path={mdiTrashCanOutline} size={1}/></IconButton>
                                    </div>
                                </div>
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
              dark={isDark}
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
            <div className="d-flex justify-content-center align-items-center me-auto ms-2">
                <Button dark={isDark} onClick={() => toggleDarkMode(!isDark)}>Toggle Dark Mode</Button>
            </div>
            <AddOrUpdateThemePage lastSelectedTheme={selectedTheme} ref={addOrUpdateThemeRef} isEdit={isEdit}
                                  themeToEdit={themeToEdit}/>
        </Card>
    )


    return (
        <>
            {renderMainButton()}
            <Dialog dark={isDark} persistent={true} className="manage-theme-dialog" visible={showThemesListDialog}
                    onClose={() => setShowThemesListDialog(false)}>
                {renderMainCard()}
            </Dialog>
        </>
    )
}
