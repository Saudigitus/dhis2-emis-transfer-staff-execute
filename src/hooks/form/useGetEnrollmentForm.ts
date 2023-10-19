import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { DataStoreState } from '../../schema/dataStoreSchema';
import { formatResponseEvents } from '../../utils/events/formatResponseEvents';

export default function useGetEnrollmentForm() {
    const [enrollmentsData, setEnrollmentsData] = useState<any[]>([])
    const getProgram = useRecoilValue(ProgramConfigState);
    const getDataStoreData = useRecoilValue(DataStoreState);

    const buildForm = () => {
        if (getDataStoreData != null && getProgram !== undefined) {
            const { transfer: { programStage, status, originSchool } } = getDataStoreData
            const { programStages } = getProgram
            const transferProgramStage = programStages.filter(elemnt => elemnt.id === programStage)[0]
            setEnrollmentsData([formatResponseEvents(transferProgramStage).filter(x => x.id !== status && x.id !== originSchool)])
        }
    }
    useEffect(() => {
        buildForm()
    }, [])

    return { enrollmentsData }
}
