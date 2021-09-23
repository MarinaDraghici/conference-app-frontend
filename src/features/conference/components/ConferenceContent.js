import React from 'react'
import state from 'constants/attendeeStatus'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
import Button from '@bit/totalsoft_oss.react-mui.button'
 
const ConferenceContent = (props) => {
    const { conference } = props
    const { status, startDate, endDate, type, category } = conference
    const { t } = useTranslation()
    const noStatusSet = t('Conferences.StatusNotSet')
 
    const showJoin = status.id===state.Attended
    const showWithdraw= status.id === state.Attended || status.id===state.Joined
    const showAttend = status.id === state.Withdrawn

    const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
    const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } })


    return (
    <Grid container>
    <Grid item xs={12}>
        <Typography variant="subtitle1" color="error">{status?.name || noStatusSet}</Typography>
    </Grid>
    <Grid item xs={12}>
        <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
    </Grid>
    <Grid item xs={12}>
        <Typography>{`${type?.name}, ${category?.name}`}</Typography>
    </Grid>
    <Grid container spacing={2}>
        <Grid item xs={12}>
            {showJoin && <Button right color="success" size={"sm"}>{t('Conferences.Join')}</Button>}
            {showWithdraw && <Button right color="danger" size={"sm"}>{t('Conferences.Withdraw')}</Button>}
            {showAttend && <Button right color="info" size={"sm"}>{t('Conferences.Attend')}</Button>}
        </Grid>
    </Grid>
</Grid>
)
}

 
ConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired
    // shape({a: PropTypes.func, t: PropTypes.string, s:PropTypes.object}) varianta pentru forma obiectului
}
 
export default ConferenceContent;