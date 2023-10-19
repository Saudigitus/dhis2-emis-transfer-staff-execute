import { useRecoilState } from 'recoil';
import useShowAlerts from '../commons/useShowAlert';
import { useDataMutation } from "@dhis2/app-runtime";
import { teiRefetch } from '../tei/usePostTei';
import { RowSelectionState } from '../../schema/tableSelectedRowsSchema';

const POST_EVENT: any = {
    resource: 'tracker',
    type: 'create',
    data: ({ data }: any) => data,
    params: {
        async: false
    }
}

export function usePostEvent() {
    const { hide, show } = useShowAlerts()
    const [refetch, setRefetch] = useRecoilState<boolean>(teiRefetch)
    const [, setSelected] = useRecoilState(RowSelectionState);

    const [create, { loading, data }] = useDataMutation(POST_EVENT, {
        onComplete: () => {
            show({ message: "Final results updated successfully", type: { success: true } })
            setRefetch(!refetch)
            setSelected({
                isAllRowsSelected: false,
                selectedRows: [],
                rows: []
            })
        },
        onError: (error) => {
            show({
                message: `Could not save the enrollment details: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    });

    return {
        loadUpdateEvent: loading,
        updateEvent: create,
        data
    }
}
