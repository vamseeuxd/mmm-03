import {mdiCloseThick} from "@mdi/js";
import {Icon} from "@mdi/react";
import React, {forwardRef, useContext, useEffect, useImperativeHandle, useState} from "react";
import {
    Button,
    Caption,
    Card,
    CardContent,
    Dialog,
    H6,
    IconButton,
    Subtitle2,
    Tab,
    TabItem,
    TabItems,
    Tabs,
    TextField
} from "ui-neumorphism";
import {FirebaseContext, ITheme} from "../../providers/firebase-context";
import firebase from "firebase/app";

const defaultTheme = {
    "--light-bg-light-shadow": "#ffffff",
    "--dark-bg": "#444444",
    "id": "",
    "name": "",
    "default": false,
    "--dark-bg-light-shadow": "#525252",
    "--light-bg": "#E4EBF5",
    "createdAt": {"seconds": 1623954600, "nanoseconds": 0},
    "--light-bg-dark-shadow": "#bec8e4",
    "--dark-bg-dark-shadow": "#363636",
    "--primary-dark": "#2962ff",
    "--primary": "#2979ff",
    "--primary-light": "#82b1ff"
};

const AddOrUpdateThemePage = forwardRef((props: {
                                             dark: boolean,
                                             isEdit: boolean,
                                             themeToEdit: ITheme | null,
                                             ref: any,
                                         },
                                         ref) => {

    const {dark, themeToEdit} = props;
    const [showAddThemesPageDialog, setShowAddThemesPageDialog] = useState(false);
    const [themeProps] = useState<string[]>([
        'light-bg',
        'light-bg-dark-shadow',
        'light-bg-light-shadow',
        'dark-bg',
        'dark-bg-dark-shadow',
        'dark-bg-light-shadow',
        'primary',
        'primary-dark',
        'primary-light',
    ]);
    // @ts-ignore
    const {themes} = useContext(FirebaseContext);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [themesList, setThemesList] = useState<any[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(props.isEdit);
    const [activeTabIndex, setActiveTabIndex] = useState<Number>(0);
    const [selectedValues, setSelectedValues] = useState<ITheme>(
        (isEdit && themeToEdit) ? themeToEdit : defaultTheme);

    useEffect(() => {
        const _theme = window.localStorage.getItem('selectedTheme');
        const subs = themes.collection.subscribe((value: ITheme[]) => {
            setThemesList(value);
            const _selectedTheme = value.find(d => d.id === _theme);
            if (_selectedTheme) {
                setSelectedValues(_selectedTheme);
            }
        });
        return () => {
            subs.unsubscribe();
        };
    }, [themes.collection]);

    useImperativeHandle(ref, () => ({
        setShowDialog: (show: boolean, themeToEdit: ITheme, isEdit: boolean) => {
            setShowAddThemesPageDialog(show);
            setIsEdit(isEdit);
            setSelectedValues(themeToEdit);
        }
    }));

    const renderMainButton = () => {
        return (
            <Button dark={dark} onClick={() => {
                setShowAddThemesPageDialog(true);
                setIsEdit(false);
                setSelectedValues(defaultTheme);
            }} className="border-0">Add Theme</Button>
        )
    }

    const renderMainCard = () => (
        <Card dark={dark} rounded elevation={5} className="manage-theme-card add-them-card">
            {renderMainHeader()}
            {renderMainContent()}
            {renderMainFooter()}
        </Card>
    )

    const renderMainHeader = () => (
        <Card dark={dark} rounded flat bordered
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
            <H6 dark={dark} className="ms-3 mt-2">Add New Theme</H6>
            <IconButton dark={dark} onClick={() => setShowAddThemesPageDialog(false)}
                        className="mt-3 mb-2 border-0"
                        text={false}
                        size='small'
                        rounded>
                <Icon path={mdiCloseThick} size={0.7}/>
            </IconButton>
        </Card>
    );


    const renderMainContent = () => (
        <CardContent dark={dark}>
            <Card dark={dark} className="py-2 ps-2" style={{height: 'calc(100vh - 275px)', overflowY: 'auto'}} inset>
                {renderAddThemeForm()}
            </Card>
        </CardContent>
    )

    const updateValue = (prop: string, value: string) => {
        setSelectedValues({
            ...selectedValues,
            [prop]: value
        });
    };

    const getFormControlsByTheme = (isDark = false) => {
        return themeProps.filter(d => (d.toLowerCase().indexOf(isDark ? 'dark' : 'light') >= 0)).map(themeProp => {
            // @ts-ignore
            return (
                <React.Fragment key={themeProp}>
                    <div className="d-flex px-4 flex-row justify-content-between">
                        <Subtitle2 dark={dark}
                                   className="text-capitalize d-inline-block">{themeProp}</Subtitle2>
                        {
                            /* @ts-ignore */
                            <input defaultValue={selectedValues['--' + themeProp]}
                                   onChange={(e: any) => {
                                       updateValue('--' + themeProp, e.target.value)
                                   }}
                                   type="color"/>
                        }
                    </div>
                </React.Fragment>
            )
        })
    }

    const renderAddThemeForm = () => {
        return (
            <div className="row mx-0">
                <div className="col-12 align-items-center">
                    <Subtitle2 dark={dark} className="m-0 ps-2 mb-2">
                        Theme Name <code>*</code>
                        <span className="fw-light m-0 ps-2 d-inline d-block" style={{fontSize: '10px'}}>
                            unique & required & in between 3 to 15 characters
                        </span>
                    </Subtitle2>
                    <TextField dark={dark} onChange={(e: any) => updateValue('name', e.value)}
                               value={selectedValues.name}
                               label='Theme Name'
                               className='add-theme-input'/>
                </div>
                <div className="d-flex px-3 flex-row justify-content-between">
                    <div className="w-100">
                        <Tabs dark={dark} value={activeTabIndex}
                              onChange={(e: any) => setActiveTabIndex(e.active)}>
                            <Tab dark={dark}>Drak Mode</Tab>
                            <Tab dark={dark}>Light Mode</Tab>
                        </Tabs>

                        <TabItems dark={dark} value={activeTabIndex}>
                            <TabItem dark={dark}>
                                {getFormControlsByTheme(true)}
                            </TabItem>
                            <TabItem dark={dark}>
                                {getFormControlsByTheme()}
                            </TabItem>
                        </TabItems>
                    </div>
                </div>
            </div>
        )
    }

    const saveTheme = async () => {
        if (isEdit) {
            const docRef = themes.getDoc(selectedValues.id);
            await docRef.set({
                ...selectedValues,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        } else {
            const docRef = themes.getDoc();
            await docRef.set({
                ...selectedValues,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        setShowAddThemesPageDialog(false);
    }

    const isNameUnique = (): boolean => {
        debugger;
        if (isEdit) {
            return themesList
                .filter(
                    d => {
                        return (
                            d.name.toLowerCase() === selectedValues.name.trim().toLowerCase() &&
                            d.id !== selectedValues.id
                        )
                    }).length === 0;
        } else {
            return themesList
                .filter(d => d.name.toLowerCase() === selectedValues.name.trim().toLowerCase()).length === 0;
        }
    }

    const isFormValid = (): boolean => {
        return (
            (selectedValues?.name?.trim().length > 2) &&
            (selectedValues?.name?.trim().length < 16)
        )
    }

    const renderMainFooter = () => (
        <Card rounded flat
              dark={dark}
              bordered
              className="
              position-absolute
              mb-3
              bottom-0
              d-flex
              justify-content-end
              flex-column
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
            {!isFormValid() &&
            <Caption className="text-danger">Theme name should in between 3 to 15 characters</Caption>}
            {!isNameUnique() && <Caption className="text-danger">Duplicate Theme Name, it should be Unique</Caption>}
            <Button dark={dark} disabled={!isFormValid() || !isNameUnique()} onClick={() => saveTheme()}
                    className="border-0 ms-auto">Save</Button>
        </Card>
    )


    return (
        <>
            {renderMainButton()}
            <Dialog dark={dark} persistent={true} className="manage-theme-dialog" visible={showAddThemesPageDialog}
                    onClose={() => setShowAddThemesPageDialog(false)}>
                {renderMainCard()}
            </Dialog>
        </>
    )


});
export default AddOrUpdateThemePage;

