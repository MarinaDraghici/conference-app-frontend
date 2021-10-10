/* eslint-disable react/jsx-no-bind */

import React, { useEffect, useReducer } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from 'prop-types'
import { Grid, Typography } from "@material-ui/core"
import qrCode from "assets/img/QRCode.png";
//import { isEmpty} from "ramda";
//import ConferenceItem from "./ConferenceItem";
import { useHistory, useRouteMatch } from "react-router";
import { useHeader } from "providers/AreasProvider";
import MyConferenceHeader from "features/myConference/list/components/MyConferenceHeader";
import { reducer } from "features/myConference/edit/conferenceState";
import { initialConference } from 'features/myConference/edit/conferenceState'
import { useQueryWithErrorHandling } from "hooks/errorHandling";
import { CONFERENCE_QUERY } from "features/myConference/gql/queries/conferenceQueries";
import CancelButton from "@bit/totalsoft_oss.react-mui.cancel-button";
import LoadingFakeText from "@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText";
import VideoCameraFrontSharpIcon from '@mui/icons-material/VideoCameraFrontSharp';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MicSharpIcon from '@mui/icons-material/MicSharp';
import PanToolSharpIcon from '@mui/icons-material/PanToolSharp';
import video1 from "../../../assets/img/video1.mp4";
import { Widget } from 'react-chat-widget';
import PersonIcon from '@mui/icons-material/Person';
import 'react-chat-widget/lib/styles.css';


const ConferenceJoin = () => {

    const [conference, dispatch] = useReducer(reducer, initialConference)
    const { name } = conference
    const match = useRouteMatch()
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const history = useHistory()

    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';
    const [value, setValue] = React.useState(0);
    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
  


    const { data, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
    })



    useEffect(() => () => setHeader(null), [])  // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setHeader(<MyConferenceHeader title={name} actions={<CancelButton title={t('General.Button.Close')} onClick={history.goBack} />} />)
    }, [history.goBack, t, setHeader, name])

    if (loadingConference)
        return <LoadingFakeText lines={10} />


    return (
        < >
            <Grid container alignItems="center" justifyContent="center">
                <Grid item >
                    <video src={video1} width="1200" height="600" controls="controls" autoPlay="true" />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
                        <Tab icon={<VideoCameraFrontSharpIcon />} aria-label="camera" />
                        <Tab icon={<MicSharpIcon />} aria-label="microphone" />
                        <Tab icon={<PanToolSharpIcon />} aria-label="raisehand" />
                    </Tabs>
                </Grid>
                <Grid item >
                    <Widget handleNewUserMessage={handleNewUserMessage} profileAvatar={PersonIcon}
                        title="Titlul conferintei "
                        subtitle="Live chat"
                    />

                </Grid>
            </Grid>
        </>)


}
export default ConferenceJoin