import React, { useState, useCallback } from 'react'
import { Typography, Grid, InputAdornment } from '@material-ui/core'
import { useTranslation } from 'react-i18next';
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import IconButton from '@bit/totalsoft_oss.react-mui.icon-button';
import { emptyString } from 'utils/constants';
import { useEmail } from 'hooks/useEmail';
import { validateEmail } from 'utils/functions';


function Welcome() {

  const { t } = useTranslation()
  //const [textFieldValue, setTextFieldValue] = useState(emptyString)
  const handleTextFieldValueChange = useCallback((event) => setTextFieldValue(event.target.value), [])
  const [email, setEmail] = useEmail()
  const [isValid, setIsValid] = useState(true)
  const [textFieldValue, setTextFieldValue] = useState(email)
  const handleButtonClick = useCallback(() => {
    const isEmailValid = validateEmail(textFieldValue)
    setEmail(isEmailValid ? textFieldValue : emptyString)
    setIsValid(isEmailValid)
  }, [setEmail, textFieldValue])


  // the handler for key down
  const handleKeyDown = useCallback((event) => {
    if (event.keyCode === 13) {
      handleButtonClick()
    }
  }, [handleButtonClick])

  return (
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={10}>
      <Grid item xs={12}>
        <Typography variant="h5">{t("LandingPage.Title")}</Typography>
      </Grid>
      <Grid item container justifyContent="center" alignItems="center" direction="column">
        <Grid item xs={12}  >
          <Typography variant="caption">{t("LandingPage.Subtitle")}</Typography>
        </Grid>
        <Grid item>

          <CustomTextField
            debounceBy={0}
            value={textFieldValue}
            onChange={handleTextFieldValueChange}
            endAdornment={<InputAdornment position='end'><IconButton size='small' color='theme' aria-label='go' onClick={handleButtonClick} >
              <KeyboardReturnIcon fontSize="small" />  </IconButton></InputAdornment>}
            onKeyDown={handleKeyDown}
            helperText={!isValid && t("LandingPage.BadEmail")}
            error={!isValid}
          />

        </Grid>
      </Grid>
    </Grid>
  )
}

export default Welcome
