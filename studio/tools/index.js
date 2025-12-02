import {definePlugin} from 'sanity'
import {UploadIcon} from '@sanity/icons'
import ScheduleImportTool from './ScheduleImportTool'

export const scheduleImportTool = definePlugin({
  name: 'schedule-import-tool',
  tools: [
    {
      name: 'schedule-import',
      title: 'Import Schedule',
      icon: UploadIcon,
      component: ScheduleImportTool,
    },
  ],
})

export default scheduleImportTool
