import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Info, LocationOn, Face } from '@material-ui/icons'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import CardTitle from '@bit/totalsoft_oss.react-mui.card-title'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import MyConferenceLocation from './MyConferenceLocation';
import MyConferenceSpeakers from './MyConferenceSpeakers';
import MyConferenceInfo from './MyConferenceInfo'

const MyConference = (props) => {
    const { types, categories, countries, counties, cities, conference, dispatch } = props
    const {location, speakers } = conference
    const { t } = useTranslation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleAddSpeaker = useCallback(()=>{dispatch({type: 'addSpeaker'})})
 
    return <>
        <IconCard
            icon={Info}
            title={t("Conference.Info")}
            content={
                <MyConferenceInfo
                    types={types}
                    categories={categories}
                    conference={conference}
                    dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={LocationOn}
            title={t("Conference.Location")}
            content={
                <MyConferenceLocation
                    countries={countries}
                    counties={counties}
                    cities={cities}
                    location={location}
                    dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={Face}
            title={
                <CardTitle
                    title={t("Conference.Speakers")}
                    actions={[<AddButton key='addButton' title={t("General.Buttons.AddSpeaker")} onClick={handleAddSpeaker}/>]}
                />
            }
            content={
                <MyConferenceSpeakers speakers= {speakers} dispatch={dispatch}
                />
            }
        />
    </>
}

MyConference.propTypes = {
    types: PropTypes.array,
    categories: PropTypes.array,
    countries: PropTypes.array,
    counties: PropTypes.array,
    cities: PropTypes.array,
    conference: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default MyConference