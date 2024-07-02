import {
  ListProps,
  UsersManpulates,
  WebsiteConfigs,
  WebsiteData,
  WebsiteSeo,
} from './HeaderChildrens';

export interface HeaderLinksProps {
  id: string;
  title: string;
  linkDir?: string;
  isDir: boolean;
  children?: ListProps[];
}
export const NavBarLinks: HeaderLinksProps[] = [
  {
    id: '01',
    title: 'Home',
    linkDir: '/',
    isDir: true,
  },
  {
    id: '02',
    title: 'About Me',
    linkDir: '/about-me',
    isDir: true,
  },
  {
    id: '04',
    title: 'Privacy And security',
    linkDir: '/privacy-security',
    isDir: true,
  },
  {
    id: '05',
    title: 'Contact Us',
    linkDir: '/contact-us',
    isDir: true,
  },
];

export const DashboardNavList: HeaderLinksProps[] = [
  {
    id: '01',
    title: 'Statistics',
    linkDir: '/admin/',
    isDir: true,
  },
  {
    id: '02',
    title: 'Users',
    isDir: false,
    children: UsersManpulates,
  },
  {
    id: '03',
    title: 'SEO',
    isDir: false,
    children: WebsiteSeo,
  },
  {
    id: '04',
    title: 'Services',
    isDir: false,
    children: WebsiteData,
  },
  {
    id: '05',
    title: 'Configurations',
    isDir: false,
    children: WebsiteConfigs,
  },
  {
    id: '06',
    title: 'Logs',
    isDir: true,
    linkDir: '/admin/logs',
  },
];
