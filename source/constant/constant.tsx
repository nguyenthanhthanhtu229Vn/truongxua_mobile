const screens = {
    home: 'Trang Chủ',
    profile: 'Cá Nhân',
    photo:'Ảnh ',
    video:'Videos',
    group: 'Nhóm',
    pages: 'Pages',
    notification: 'Thông Báo ',
    messages: 'Messages',
    blog: 'Bài Đăng ',
    event: 'Sự Kiện ',
    setting: 'Cài Đặt',
  };
  
  const menu = [
    {
      id: 0,
      label: screens.home,
    },
    {
      id: 1,
      label: screens.profile,
    },
    {
      id: 2,
      label: screens.event,
    },
    {
      id: 3,
      label: screens.photo,
    },
    {
      id: 4,
      label: screens.video,
    },
    {
      id: 5,
      label: screens.group,
    },
    {
      id: 6,
      label: screens.pages,
    },
    {
      id: 7,
      label: screens.notification,
    },
    {
      id: 8,
      label: screens.setting,
    },
    {
      id: 9,
      label: screens.blog,
    },
  ];
  
  export default {
    screens,
    menu,
  };
  