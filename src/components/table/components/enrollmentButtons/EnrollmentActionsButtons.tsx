import React, { useState } from 'react'
import { IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import ModalComponent from '../../../modal/Modal';
import ModalContentComponent from '../../../modal/ModalContent';
import { useParams } from '../../../../hooks/commons/useQueryParams';
import Tooltip from '@material-ui/core/Tooltip';
import { useRecoilState } from 'recoil';
import { RowSelectionState } from '../../../../schema/tableSelectedRowsSchema';

function EnrollmentActionsButtons() {
  const [open, setOpen] = useState<boolean>(false);
  const { useQuery } = useParams();
  const orgUnit = useQuery().get("school")
  const [selected] = useRecoilState(RowSelectionState);

  return (
    <div>
      <ButtonStrip>
        <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
          <span>
            <Button disabled={orgUnit == null || selected.selectedRows.length === 0} onClick={() => { setOpen(true); }} icon={<IconAddCircle24 />}>Execute transfer</Button>
          </span>
        </Tooltip>
      </ButtonStrip>

      {open && <ModalComponent title="Students Transfer" open={open} setOpen={setOpen}><ModalContentComponent setOpen={setOpen} /></ModalComponent>}
    </div>
  )
}

export default EnrollmentActionsButtons
