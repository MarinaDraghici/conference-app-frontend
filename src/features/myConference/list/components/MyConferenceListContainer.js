import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
import conferences from 'utils/mocks/attendeeList'
import MyConferenceList from './MyConferenceList'
//import MyConferenceItem from './MyConferenceItem'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import { useTranslation } from 'react-i18next'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'


const MyConferenceListContainer = () => {
const {data, loading}={data: conferences, loading: false}
const {t}=useTranslation()
const [, setHeader]=useHeader();
const [filters, setFilters]= useState(generateDefaultFilters())
const history = useHistory()

const handleAddClick = useCallback(() => {
    history.push("myConferences/new")
}, [history])


useEffect(()=> {
//did mount
return ()=> {
    //will unmount
    setHeader(null)
}
// eslint-disable-line react-hooks/exhaustive-deps
}, [])

useEffect(() => {
    setHeader(
        <MyConferenceHeader
            title={t('NavBar.MyConferences')}
            actions={<AddButton key='addButton' title={t("General.Buttons.AddConference")} onClick={handleAddClick} />}
        />
        )
}, [setHeader, t])

const handleApplyFilters = useCallback((value)=>{
    setFilters(value)}, [])


if (loading) return <LoadingFakeText lines={10}/>
     return      (
    <>
    <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
    <MyConferenceList conferences={data}/>
    </>
    )
    
}

export default MyConferenceListContainer