import RegularCard from "@bit/totalsoft_oss.react-mui.regular-card"
//import { props } from "ramda"
import React from "react"
import { PropTypes } from 'prop-types'
import { props } from "ramda"
import ConferenceSubtitle from './ConferenceSubtitle';
import ConferenceContent from './ConferenceContent';


const ConferenceItem=props=> {
    const {conference} = props
    const { name,location, speakers } = conference
    const speaker = speakers.find(speaker => speaker.isMainSpeaker)

    return (< RegularCard cardTitle={name} cardSubtitle={
    <ConferenceSubtitle 
        speaker={speaker} 
        location={location}/>
    }  
    content={
        <ConferenceContent
            conference={conference}
        />
    }
/>)
}
ConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired
}
export default ConferenceItem