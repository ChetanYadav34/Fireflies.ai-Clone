import { redirect } from 'next/navigation'

export default function MeetingBasePage() {
  // Redirect to the meetings list since this route requires an ID
  redirect('/dashboard/notebook/mine-shared')
}
