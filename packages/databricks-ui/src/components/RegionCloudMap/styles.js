export default {
  wrapper: ["flex", "flex-col"].join(" "),
  sectionTitle: ["text-center", "mb-4"].join(" "),
  tabsBar: [
    "scroll-bar-transparent",
    "flex",
    "flex-row",
    "justify-center",
    "gap-4",
    "overflow-x-scroll",
  ].join(" "),
  tabButton: ({ activeTabLabel, label }) =>
    [
      "b4",
      "text-navy-06 min-w-max",
      "cursor-pointer",
      "text-center",
      "font-bold",
      "hover:text-orange-04",
      activeTabLabel === label ? "text-navy-06 border-orange-04 border-b-2" : "",
    ].join(" "),
  tabButtonVignette: (color) =>
    [
      "opacity-1",
      "mr-0.5",
      "inline-block",
      "min-h-[14px]",
      "min-w-[14px]",
      "rounded-full",
      `bg-${color}`,
    ].join(" "),
  tabContentWrapper: ["animate-tab-to-right-active", "mt-2.4", "md:mt-1.6"].join(
    " "
  ),
  tabContent: ({ activeTab, currentTab, hasLink }) =>
    [
      "animate-tab-to-right-active",
      "flex",
      "flex-col",
      "justify-center",
      "md:flex-col",
      activeTab === currentTab ? "block" : "hidden",
      hasLink ? "gap-2" : "mt-3",
    ].join(" "),
  image: ["h-full", "w-full", "cursor-zoom-in"].join(" "),
  supportedLink: [
    "text-[14px]",
    "arrow-icon-tertiary",
    "flex-row",
    "items-center",
    "justify-center",
    "text-blue-700",
    "hover:text-blue-700",
  ].join(" "),
}
