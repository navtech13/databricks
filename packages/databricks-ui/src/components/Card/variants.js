export const variantMap = {
  simple: {
    hover: "hover:shadow-card-hover-accent",
    wrapper:
      "shadow-card-normal group flex flex-col bg-white transition-shadow delay-75 duration-75 ease-linear",
    image: "min-w-12 flex items-center",
    imageStyles: "w-full",
    content:
      "flex w-full flex-col justify-between p-2.5 transition-all delay-75 ease-linear h-full",
    description: "text-nav-gray",
  },
  resource: {
    hover: "hover:no-underline hover:shadow-card-hover-accent",
    wrapper:
      "h-full flex flex-col shadow-card-normal bg-white border-gray-cool shadow-card-normal border-gray-cool flex cursor-pointer flex-col bg-white transition-shadow delay-75 duration-75 ease-linear ",
    description: "text-navy-06 flex-1",
    content: "p-2.5 md:p-2 lg:p-3 flex flex-col flex-1 bg-white",
  },
  tile: {
    hover: "hover:border-b-orange-02 hover:shadow-legacy-card-hover",
    wrapper:
      "shadow-card-normal group flex flex-row border-b-2 border-b-white  bg-white transition-all delay-75 duration-75 ease-linear",
    image: "flex flex-col justify-center",
    imageStyles: "border-r-gray-lines px-6 my-2.5 w-20 border-r",
    content: "b2 bold flex w-full flex-col justify-center py-2.5 px-2",
    description: "text-navy-06",
  },
  icon: {
    hover: "hover:shadow-card-hover-accent",
    wrapper:
      "flex flex-col bg-white p-3 shadow-card-normal transition-shadow ease-in-out duration-200",
    description: "text-nav-gray b4",
    content: "flex flex-col flex-1 justify-between",
    image: "mb-3 border-b-gray-lines border-b",
    imageStyles: "m-auto max-w-[180px] mb-3 mt-2.5",
	  imageOptions: {
      className: "h-10 max-h-10 object-contain",
      objectFit: "contain",
    },
    linkStyle: "mt-3",
  },
  iconSmall: {
    hover: "hover:shadow-card-hover-accent",
    wrapper:
      "flex bg-white shadow-card-normal transition-shadow ease-in-out duration-200 px-1 py-1 ",
    description: "text-nav-gray b5",
    content: "flex items-center px-1",
    image: "h-8 w-8",
    imageStyles: "min-w-[60px]",
  },
  assetPromo: {
    hover: "hover:border-b-orange-02 hover:shadow-legacy-card-hover",
    wrapper:
      "py-4 px-3 md:py-2 md:pr-4 lg:py-3 lg:pl-3 md:pl-2 gap-3 lg:gap-3 shadow-card-normal group flex flex-col items-center border-b-2 border-b-white bg-white transition-all delay-75  duration-75 ease-linear md:flex-row md:gap-2.5 lg:pr-6",
    image: "flex aspect-square flex-col justify-center",
    imageStyles: "w-16 md:w-12",
    content:
      "h4 bold gap-3 lg:gap-3 flex w-full flex-col items-center justify-center text-center md:text-start md:flex-row md:justify-between md:gap-2.5",
    description: "text-nav-gray",
    ctaType: "button",
    linkStyle: "shrink-0",
  },
  iconLeft: {
    hover: "hover:shadow-card-hover-accent",
    wrapper:
      "flex flex-col bg-white p-3 shadow-card-normal transition-shadow ease-in-out duration-200",
    description: "text-nav-gray b4",
    content: "flex flex-col flex-1 justify-between",
    imageStyles: "max-w-[77.5px] mt-2.5 mb-4",
  },
  wt: {
    hover: "hover:shadow-card-hover-accent",
    wrapper:
      "shadow-card-normal group flex flex-col bg-white transition-shadow delay-75 duration-75 ease-linear md:min-h-[400px] grow",
    image:
      "min-w-[108px] md:h-[186px] flex items-center justify-center bg-oat-light",

    content:
      "flex w-full flex-col justify-between p-2.5 transition-all delay-75 ease-linear grow",
    description: "text-nav-gray",
  },
  spotlight: {
    hover: "hover:md:shadow-shadow-2",
    wrapper:
      "group flex flex-col transition-shadow delay-75 duration-75 ease-linear",
    image: "min-w-[108px] flex items-center relative pb-[56.25%] flex-shrink-0",
    imageStyles: "w-full absolute top-0 h-full",
    imageOptions: { className: "h-full object-cover" },
    content:
      "w-full p-2 transition-all delay-75 ease-linear h-full md:flex flex-col justify-between",
    description: "text-navy-800 font-medium",
    linkStyle: "!mt-2",
  },
  trustCenter: {
    hover: "hover:shadow-card-hover-accent",
    wrapper:
      "flex flex-col bg-white p-3 shadow-card-normal transition-shadow ease-in-out duration-200",
    description: "text-nav-gray b4",
    content: "flex flex-col flex-1 justify-between",
    image: "mb-2.4 border-b-gray-lines border-b",
    imageStyles: "m-auto max-w-[180px] mb-2.4 mt-2",
    imageOptions: {
      className: "h-[90px] max-h-full object-contain",
      objectFit: "contain",
    },
  },
}
