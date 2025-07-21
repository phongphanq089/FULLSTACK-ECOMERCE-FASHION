'use client'
import { Sidebar, SidebarContent, SidebarRail } from '~/components/ui/sidebar'
import { sidebarData } from '~/setting/menu/admin/sidebar-data'
import { NavGroup } from './NavGroup'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
