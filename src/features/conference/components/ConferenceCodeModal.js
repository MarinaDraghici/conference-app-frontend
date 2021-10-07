import React from "react"
import { useTranslation } from "react-i18next"
import PropTypes from 'prop-types'
import { Grid, Typography } from "@material-ui/core"
import qrCode from "assets/img/QRCode.png";
import { isEmpty } from "ramda";
import ConferenceItem from "./ConferenceItem";

const ConferenceCodeModal = ({ code, suggestedConferences, onAttend }) => {
  const { t } = useTranslation()
  return (
    <>
      <Grid container>
        <Grid item lg={12}>
          <img src={qrCode} style={{ maxHeight: '400px' }} alt='QR' />
        </Grid>
        <Grid item lg={12}>
          <Typography>{t("Conferences.QRCodeMessage", { code })}</Typography>
        </Grid>
      </Grid>
      {!isEmpty(suggestedConferences) && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{t('General.SuggestedConferences')}</Typography>
          </Grid>
          {suggestedConferences?.map(conference => (
            <Grid item xs={12} lg={4} key={conference?.id}>
              <ConferenceItem conference={conference} onAttend={onAttend} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}


ConferenceCodeModal.propTypes = {
  code: PropTypes.string,
  suggestedConferences: PropTypes.array,
  onAttend: PropTypes.func
}

export default ConferenceCodeModal