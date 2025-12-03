import React from 'react'
import {Stack, Button} from '@sanity/ui'
import {UploadIcon} from '@sanity/icons'

export function GameListActions(props) {
  const handleImportClick = () => {
    // Navigate to the import tool
    window.location.href = '/tool/schedule-import'
  }

  return (
    <Stack>
      {props.renderDefault(props)}
      <Button
        text="📊 Import from Excel"
        icon={UploadIcon}
        tone="primary"
        onClick={handleImportClick}
        style={{marginLeft: '8px'}}
      />
    </Stack>
  )
}
