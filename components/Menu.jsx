import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { getMenuItems } from "@/lib/menu";

export default async function Menu({ menuSlug = "main-menu" }) {
  const menuItems = await getMenuItems(menuSlug);

  const renderMenu = (items, parentId = "0") => {
    const filteredItems = items.filter((item) => item.parent === parentId);

    if (filteredItems.length === 0) {
      return null;
    }

    return (
      <NavigationMenuList>
        {filteredItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            {items.some((child) => child.parent === item.id.toString()) ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[1000px] bg-white shadow-md rounded-lg">
                    <ul className="grid grid-cols-5">
                      {items
                        .filter((child) => child.parent === item.id.toString())
                        .map((subItem) => (
                          <li key={subItem.id} className="mb-2">
                            <Link href={subItem.url} legacyBehavior passHref>
                              <NavigationMenuLink className="font-semibold hover:text-black">
                                {subItem.title}
                              </NavigationMenuLink>
                            </Link>
                            <ul className="ml-4 mt-1 space-y-1">
                              {items
                                .filter(
                                  (child) =>
                                    child.parent === subItem.id.toString()
                                )
                                .map((subSubItem) => (
                                  <li key={subSubItem.id}>
                                    <Link
                                      href={subSubItem.url}
                                      legacyBehavior
                                      passHref
                                    >
                                      <NavigationMenuLink className="text-sm text-gray-700 hover:text-black">
                                        {subSubItem.title}
                                      </NavigationMenuLink>
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.url} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    );
  };

  return (
    <NavigationMenu dir="rtl">
      {menuItems.length > 0 ? renderMenu(menuItems) : <p>Loading menu...</p>}
    </NavigationMenu>
  );
}
