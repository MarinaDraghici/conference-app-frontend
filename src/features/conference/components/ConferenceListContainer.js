import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from 'features/conference/components/ConferenceFilters'
//import conferences from 'utils/mocks/attendeeList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import { useFooter } from 'providers/AreasProvider'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
import { useError } from 'hooks/errorHandling'
import ATTEND_CONFERENCE from '../gql/mutations/AttendConference'
import { useMutation } from '@apollo/client'
import DialogDisplay from '@bit/totalsoft_oss.react-mui.dialog-display'
import ConferenceCodeModal from './ConferenceCodeModal'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import { emptyString } from 'utils/constants'
import WITHDRAW_CONFERENCE_MUTATION from '../gql/mutations/WithdrawConference'
import JOIN_CONFERENCE_MUTATION from '../gql/mutations/JoinConference'
import { useHistory } from 'react-router'



function ConferenceListContainer() {
    const { t } = useTranslation()
    const [code, setCode] = useState()
    const [open, setOpen] = useState(false)
    const [suggestedConferences, setSuggestedConferences] = useState(emptyString)
    const showError = useError()
    const addToast = useToast()
    const history = useHistory()
    const [filters, setFilters] = useState(generateDefaultFilters())
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
    const [email] = useEmail()
    const [, setFooter] = useFooter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setFooter(null), [])
    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
        variables:
        {
            pager: extractPager(pager),
            filters,
            email
        },

        onCompleted: (result) => {
            const totalCount = result?.conferenceList.pagination?.totalCount
            setPager(state => ({ ...state, totalCount }))
        }
    })
    const [attend] = useMutation(ATTEND_CONFERENCE, {
        onError: showError,
        onCompleted: result => {
            if (result?.attend) {
                setCode(result?.attend.code)
                setSuggestedConferences(result?.attend?.suggestedConferences)
                setOpen(true)
                addToast(t('Conferences.SuccessfullyAttended'), 'success!')
            }
        }
    })
    const [withdraw] = useMutation(WITHDRAW_CONFERENCE_MUTATION, {
        onCompleted: () => {
            addToast(t("Conferences.SuccessfullyWithdrawn"), 'success')
            refetch()
        },
        onError: showError
    })
    const [join] = useMutation(JOIN_CONFERENCE_MUTATION, {
        onCompleted: () => {
            refetch()
            addToast(t("Conferences.SuccessfullyJoined"), 'success')
           
        },
        onError: showError
    })
    const handleAttend = useCallback(conferenceId => () => {
        attend({
            variables: {
                input: {
                    conferenceId,
                    attendeeEmail: email
                }
            }
        })
    }, [attend, email])

    const handleWithdraw = useCallback(conferenceId => () => {
        withdraw({
            variables: {
                input: {
                    attendeeEmail: email,
                    conferenceId
                }
            }
        })
    }, [withdraw, email]);

    const handleJoin = useCallback(conferenceId => () => {
        join({
            variables: {
                input: {
                    conferenceId,
                    attendeeEmail: email
                }
            }
        })
        refetch()
        history.push(`/conferences/${conferenceId}`)
    }, [join, email, refetch, history]);

    const handleRowsPerPageChange = useCallback((pageSize) => {
        setPager((state) => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])
    const handlePageChange = useCallback((page) => {
        setPager(state => ({ ...state, page }))
    }, [])

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
    const handleClose = useCallback(() => {
        setOpen(false)
        setCode(emptyString)
        refetch()
    }, [refetch])
    if (loading || !data) { return <LoadingFakeText lines={10} /> }
    return (
        <>
            <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
            <ConferenceList conferences={data?.conferenceList?.values} onAttend={handleAttend} onWithdraw={handleWithdraw} onJoin={handleJoin} />
            <DialogDisplay id="showQRCode" title={t('General.Congratulations')} open={open} onClose={handleClose} content={<ConferenceCodeModal code={code} suggestedConferences={suggestedConferences} onAttend={handleAttend} />} />
        </>
    )
}
export default ConferenceListContainer;