import { getSelectedKey } from "../../commons/dataStore/getSelectedKey"

export const useTransferConst = () => {
    const { getDataStoreData } = getSelectedKey()

    function transferConst(key: "pending" | "approved" | "reproved") {
        return getDataStoreData.transfer.statusOptions.find((option) => option.key === key)?.code
    }

    return {
        transferConst
    }
}