export const adminPanelSidebarLinks = [
  {
    icon: "/assets/images/dashboard/dashboard.png",
    selectedIcon:
      "/assets/images/dashboard/sidebar-white-icon/dashboard_white.png",
    link: "/admin-panel",
    text: "Dashboard",
  },
  {
    icon: "/assets/images/dashboard/school-management.png",
    selectedIcon:
      "/assets/images/dashboard/sidebar-white-icon/school_management_white.png",
    link: "/admin-panel/school-management",
    text: "School Management",
  },
  {
    icon: "/assets/images/dashboard/power-classes.png",
    selectedIcon:
      "/assets/images/dashboard/sidebar-white-icon/power_classes_white.png",
    link: "#",
    text: "Power Classes",
    children: [
      {
        icon: "/assets/images/dashboard/camera.png",
        selectedIcon: "/assets/images/dashboard/camera.png",
        link: "/admin-panel/all-power-classes",
        text: "All Power Classes",
      },
      {
        icon: "/assets/images/dashboard/camera.png",
        selectedIcon: "/assets/images/dashboard/camera.png",
        link: "/admin-panel/active-power-classes",
        text: "Active Power Classes",
      },
      {
        icon: "/assets/images/dashboard/power-classes.png",
        selectedIcon: "/assets/images/dashboard/power-classes.png",
        link: "/admin-panel/application",
        text: "Applications",
      },
      {
        icon: "/assets/images/dashboard/camera.png",
        selectedIcon: "/assets/images/dashboard/camera.png",
        link: "/admin-panel/power-teachers",
        text: "All Power Teachers",
      },
      {
        icon: "/assets/images/dashboard/camera.png",
        selectedIcon: "/assets/images/dashboard/camera.png",
        link: "/admin-panel/power-subjects",
        text: "All Power Subjects",
      },
      {
        icon: "/assets/images/dashboard/group.png",
        selectedIcon: "/assets/images/dashboard/group.png",
        link: "/admin-panel/add-faculty",
        text: "Add Faculty",
      },
    ],
  },
  {
    icon: "/assets/images/dashboard/content-upload.png",
    selectedIcon:
      "/assets/images/dashboard/sidebar-white-icon/class_content_white.png",
    link: "/admin-panel/content-upload",
    text: "Content Upload",
    children: [
      {
        icon: "/assets/images/dashboard/power-classes.png",
        selectedIcon: "/assets/images/dashboard/power-classes.png",
        link: "/admin-panel/content-material",
        text: "Content Materials",
      },
    ],
  },
  {
    icon: "/assets/images/dashboard/user-management.png",
    selectedIcon:
      "/assets/images/dashboard/sidebar-white-icon/payments_white.png",
    link: "/admin-panel/payment",
    text: "Payments",
  },
  {
    icon: "/assets/images/dashboard/settings.png",
    selectedIcon:
      "/assets/images/dashboard/sidebar-white-icon/settings_white.png",
    link: "/admin-panel/settings",
    text: "Settings",
  },
  {
    icon: "/assets/images/dashboard/feedback.png",
    selectedIcon:
      "/assets/images/dashboard/sidebar-white-icon/feedback_white.png",
    link: "/admin-panel/feedback",
    text: "Feedback",
  },
];
