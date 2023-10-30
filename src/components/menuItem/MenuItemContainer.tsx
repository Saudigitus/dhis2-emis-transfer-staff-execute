import React from 'react'
import Item from './Item';
import { useRecoilValue } from 'recoil';
import { ProgramConfigState } from '../../schema/programSchema';
import { formatResponse } from '../../utils/table/header/formatResponse';
import { getSelectedKey } from '../../utils/commons/dataStore/getSelectedKey';

function MenuItemContainer({ dataElementId, onToggle }: { dataElementId: string, onToggle: () => void }): React.ReactElement {
    const { getDataStoreData } = getSelectedKey()
    const programConfigState = useRecoilValue(ProgramConfigState);
    const options = formatResponse(programConfigState, getDataStoreData)?.find(element => element.id === dataElementId)?.options.optionSet.options ?? [];

    console.log("options", options);
    console.log("formatResponse", formatResponse(programConfigState));
    return (
        <Item onToggle={onToggle} dataElementId={dataElementId} menuItems={options} />
    )
}
export default MenuItemContainer
