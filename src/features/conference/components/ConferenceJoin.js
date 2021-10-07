
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

// const ConferenceJoin = ({ code, suggestedConferences, onAttend }) => {
//   const { t } = useTranslation()
//   const [, setHeader] = useHeader()
//   const [conference, dispatch] = useReducer(reducer, initialConference)
//   const { name } = conference
//   const match = useRouteMatch();
//   const conferenceId = match.params.id;
//   const isNew = conferenceId === 'new';

//   const { data, loading } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
//     variables: { id: conferenceId, isNew },
//     onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
//   })

//   useEffect(() => () => setHeader(null), [])  // eslint-disable-line react-hooks/exhaustive-deps
//   useEffect(() => { setHeader(<MyConferenceHeader title={name} />) }, [setHeader, t, name])
//   return (
//     <>
//       <Grid container>
//         <Grid item lg={12}>
//           <img src={qrCode} style={{ maxHeight: '400px' }} alt='QR' />
//         </Grid>
//         <Grid item lg={12}>
//           <Typography>{t("Conferences.QRCodeMessage", { code })}</Typography>
//         </Grid>
//       </Grid>
//     </>
//   )
// }


// ConferenceJoin.propTypes = {
//   code: PropTypes.string,
//   suggestedConferences: PropTypes.array,
//   onAttend: PropTypes.func
// }

// export default ConferenceJoin

const ConferenceJoin = () => {

  const [conference, dispatch] = useReducer(reducer, initialConference)
  const {name} = conference
  const match = useRouteMatch()
  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  const history = useHistory()

  const conferenceId = match.params.id;
  const isNew = conferenceId === 'new';

  const { data, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
      variables: { id: conferenceId, isNew },
      onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
  })

  

  useEffect(() => () => setHeader(null), [])  // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
      setHeader(<MyConferenceHeader title={name} actions={<CancelButton title={t('General.Button.Close')} onClick={history.goBack} />} />)
  }, [ history.goBack, t, setHeader, name])

  if (loadingConference)
  return <LoadingFakeText lines={10} />


  return(
      < >OK</> )
     
  
}
export default ConferenceJoin