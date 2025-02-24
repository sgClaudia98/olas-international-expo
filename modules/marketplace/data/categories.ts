import { DropdownItem } from "@/components/Dropdown/MultilevelDropdown";


export const data: DropdownItem[] = [
    {
      title: 'Categories',
      value: 'cat',
      items: [
        {
          title: 'Food',
          value: 'food',
          items: [
            {title: 'Fruits', value: 'fruits'},
            {title: 'Vegetables', value: 'vegetables'},
          ],
        },
        {
          title: 'Hardware tools',
          value: 'hardware_tools',
          items: [
            {
              title: 'Electric Vehicles',
              value: 'electric_vehicles',
              items: [
                {title: 'Chargers', value: 'chargers'},
                {title: 'Batteries', value: 'batteries'},
              ],
            },
            {title: 'Car Supplies', value: 'car_supplies'},
            {title: 'Tools', value: 'tools'},
          ],
        },
        {
          title: 'Personal care & Home',
          value: 'personal_care_home',
          items: [
            {
              title: 'Bedroom',
              value: 'bedroom',
            },
          ],
        },
        {
          title: 'Home appliances',
          value: 'home_appliances',
          items: [
            {
              title: 'Powerbank',
              value: 'powerbank',
            },
          ],
        },
      ],
    },
  ];