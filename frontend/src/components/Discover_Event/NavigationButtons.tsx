

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   // NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   // NavigationMenuViewport,
// } from "@/components/ui/navigation-menu"



// interface NavigationButtonsProps {}

// const NavigationButtons: React.FC<NavigationButtonsProps> = () => {
//   return (
//     <div style={{ padding: '20px', paddingTop: '40px' }}> 
//     <NavigationMenu>
//   <NavigationMenuList>
//     <NavigationMenuItem>
//       <NavigationMenuTrigger>Category</NavigationMenuTrigger>
//       <NavigationMenuContent>
//         <NavigationMenuLink>Anime</NavigationMenuLink>
//       </NavigationMenuContent>
//       <NavigationMenuContent>
//         <NavigationMenuLink>Sport</NavigationMenuLink>
//       </NavigationMenuContent>
//       <NavigationMenuContent>
//         <NavigationMenuLink>K-pop</NavigationMenuLink>
//       </NavigationMenuContent>
//     </NavigationMenuItem>
//   </NavigationMenuList>
// </NavigationMenu>

//     </div> 
//   );
// };

// export default NavigationButtons;


import React, { useState } from 'react';

// Define the type for a category
type Category = {
  name: string;
  // Add any other properties you might need for a category
};

const categories: Category[] = [
  { name: "K-pop" },
  { name: "J-pop" },
  { name: "Golden State Warriors" },
  { name: "Sports" },
  { name: "Anime" },
  { name: "Games" },
  { name: "Webinar" }
];

const CategoryBar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].name);

  return (
    <nav className="flex justify-center items-center p-4">
      <div className="flex overflow-auto">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`${
              activeCategory === category.name
                ? 'bg-custom-green text-white'
                : 'bg-dark-green text-white'
            } hover:bg-custom-green rounded-full  text-lg px-6 py-2 focus:outline-none transition-colors duration-300`}
            
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategoryBar;
