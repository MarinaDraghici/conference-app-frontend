import {gql} from '@apollo/client'
import ConferenceFragments from 'features/conference/gql/queries/fragments'
import CommonFragments from 'features/common/fragments'
export const CONFERENCE_QUERY = gql`
query conferenceData($id: ID!, $isNew: Boolean!) {
  conference(id: $id) @skip(if: $isNew){
    ...conference
    type {
      ...type
    }
    category {
      ...category
    }
    location {
      ...location
      city {
        ...city
      }
      county{
        ...county
      }
      country{
        ...country
      }
    }
    speakers {
      ...speaker
    }
  }
  typeList {
    ...type
  }
  categoryList {
    ...category
  }
  cityList {
    ...city
  }
  countyList {
    ...county
  }
  countryList {
    ...country
  }
  typeList{
    ...type
  }
  categoryList{
    ...category
  }
  countryList{
    ...country
  }
  countyList{
    ...county
  }
  cityList{
    ...city
  }
}

${ConferenceFragments.conference}
${ConferenceFragments.location}
${ConferenceFragments.speaker}
${CommonFragments.country}
${CommonFragments.county}
${CommonFragments.city}
${CommonFragments.type}
${CommonFragments.category}


`