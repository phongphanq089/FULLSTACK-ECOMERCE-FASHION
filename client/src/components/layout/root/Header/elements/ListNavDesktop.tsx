import { cn } from '~/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/components/ui/navigation-menu'
import { navigationLinks } from '~/setting/menu/root/menu'

// Navigation links array to be used in both desktop and mobile menus

export default function ListNavDesktop() {
  return (
    <nav className='px-6 max-xl:hidden'>
      <div className='flex h-16 items-center justify-between gap-4'>
        <div className='flex items-center gap-2'>
          {/* Mobile menu trigger */}
          {/* Main nav */}
          <div className='flex items-center'>
            {/* Navigation menu */}
            <NavigationMenu viewport={false} className='max-md:hidden'>
              <NavigationMenuList className='gap-2'>
                {navigationLinks.map((link, index) => {
                  return (
                    <NavigationMenuItem key={index}>
                      {link.submenu ? (
                        <>
                          <div className='flex items-center'>
                            <NavigationMenuTrigger className='text-black text-lg bg-white  hover:text-white  hover:bg-primary-color px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5 rounded-lg'>
                              {link.label}
                            </NavigationMenuTrigger>
                          </div>
                          <NavigationMenuContent className='data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1'>
                            <ul
                              className={cn(
                                link.type === 'description'
                                  ? 'min-w-64'
                                  : 'min-w-60'
                              )}
                            >
                              {link.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <NavigationMenuLink
                                    href={item.href}
                                    className='py-1.5 text-lg'
                                  >
                                    <span>{item.label}</span>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <div className='flex items-center'>
                          <NavigationMenuLink
                            href={link.href}
                            className='text-black rounded-lg text-lg bg-white hover:text-white py-1.5 font-medium hover:bg-primary-color'
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </div>
                      )}
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
