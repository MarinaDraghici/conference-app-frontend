import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import MyConference from 'features/myConference/edit/components/MyConference'
import { useHeader } from 'providers/AreasProvider'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { initialConference, reducer } from '../conferenceState'
import { useRouteMatch } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_QUERY } from 'features/myConference/gql/queries/conferenceQueries'
import { useMutation } from '@apollo/client'
import { UPDATE_CONFERENCE } from 'features/myConference/gql/queries/mutations/UpdateConference'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useHistory } from 'react-router-dom'
import { useError } from 'hooks/errorHandling'
import { useEmail } from 'hooks/useEmail'

const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const [conference, dispatch] = useReducer(reducer, initialConference)
    const match = useRouteMatch()
    const history=useHistory()
    const showError=useError()
    const [email]=useEmail()
    const conferenceId = match.params.id;
    const addToast=useToast()
    const isNew = conferenceId === 'new';
    const {data, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
        variables: { id: conferenceId, isNew },
        onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
    })
    const[updateConference, {loading: saving}]=useMutation(UPDATE_CONFERENCE, {
        onCompleted: result => {
            addToast(t('MyConferences.SavingSucceeded'), 'success')
            if (isNew) {
                history.push(`/myConferences/${result?.saveConference?.id}`)
            }
            result?.saveConference && dispatch({type: "resetConference", payload:result?.saveConference})
        },
        onError: showError
    })

    const handleSave = useCallback(()=> {
        const {id, name, startDate, endDate, deletedSpeakers, type, location, category, speakers} = conference
        const {city, county, country, ...locationData}=location
        const input ={
            id, name, startDate, endDate, organizerEmail: email, deletedSpeakers, type, category, location:{
                ...locationData, cityId: city?.id, countryId: country?.id, countyId: county?.id
            },
            speakers
        }
        updateConference({variables: {input}})
    }, [conference, email, updateConference])

    useEffect(() => ()=> setHeader(null), [])  // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => { setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Button.Save')} onClick={handleSave}/>} />) 
}, [conference.name, handleSave, setHeader, t])
    if (loadingConference || saving) return <LoadingFakeText lines={10} />
    
    return <MyConference
        conference={conference}
        dispatch={dispatch}
        types={data?.typeList}
        categories={data?.categoryList}
        countries={data?.countryList}
        counties={data?.countyList}
        cities={data?.cityList}
        onSave={handleSave}
    />
}
export default MyConferenceContainer