import {definePlugin} from 'sanity'
import {UploadIcon, RocketIcon} from '@sanity/icons'
import ScheduleImportTool from './ScheduleImportTool'
import ManualDeployTool from './ManualDeployTool'

export const scheduleImportTool = definePlugin({
  name: 'schedule-import-tool',
  tools: [
    {
      name: 'schedule-import',
      title: 'Import Schedule',
      icon: UploadIcon,
      component: ScheduleImportTool,
    },
    {
      name: 'manual-deploy',
      title: 'Deploy Now',
      icon: RocketIcon,
      component: ManualDeployTool,
    },
  ],
})

export default scheduleImportTool
