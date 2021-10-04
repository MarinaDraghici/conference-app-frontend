import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
//import conferences from 'utils/mocks/attendeeList'
import MyConferenceList from './MyConferenceList'
//import MyConferenceItem from './MyConferenceItem'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useFooter, useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import { useTranslation } from 'react-i18next'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'
import { useEmail } from 'hooks/useEmail'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries/ConferenceListQuery'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'


const MyConferenceListContainer = () => {

    const { t } = useTranslation()
    const [, setHeader] = useHeader();
    const [filters, setFilters] = useState(generateDefaultFilters())
    const history = useHistory()
    const [email] = useEmail()
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
    const [, setFooter] = useFooter()

    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: extractPager(pager),
            filters: { ...filters, organizerEmail: email },
            email
        },
        onCompleted: (result) => {
            const totalCount = result?.conferenceList.pagination?.totalCount
            setPager(state => ({ ...state, totalCount }))
        }
    })


    const handleAddClick = useCallback(() => {
        history.push("myConferences/new")
    }, [history])

    const handleRowsPerPageChange = useCallback((pageSize) => {
        setPager((state) => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])
    const handlePageChange = useCallback((page) => {
        setPager(state => ({ ...state, page }))
    }, [])
    useEffect(() => {
        //did mount
        return () => {
            //will unmount
            setHeader(null)
            setFooter(null)
        }

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setHeader(
            <MyConferenceHeader
                title={t('NavBar.MyConferences')}
                actions={<AddButton key='addButton' title={t("General.Buttons.AddConference")} onClick={handleAddClick} />}
            />
        )
    }, [handleAddClick, setHeader, t])

    useEffect(() => {
        setFooter(<Pagination
            totalCount={pager.totalCount}
            page={pager.page}
            pageSize={pager.pageSize}
            rowsPerPageOptions={[3, 6, 12, 24, 100]}
            onRowsPerPageChange={handleRowsPerPageChange}
            onPageChange={handlePageChange}
            onRefresh={refetch}
        />)
    }, [handlePageChange, handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])
    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])


    if (loading || !data)
        return <LoadingFakeText lines={10} />
    return (
        <>
            <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
            <MyConferenceList conferences={data?.conferenceList?.values} />
        </>
    )

}

export default MyConferenceListContainer