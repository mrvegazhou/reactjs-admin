import Loadable from 'react-loadable'
import ContentLoading from '@/redux/components/common/Loading';

const Error404 = Loadable({
    loader: () => import('../components/error/404'),
    loading: ContentLoading
});

const Calendars = Loadable({
    loader: () => import('../components/calender'),
    loading: ContentLoading
});

const BasicTableComp = Loadable({
    loader: () => import('../components/tables/basicTable'),
    loading: ContentLoading
});

const Home = Loadable({
    loader: () => import('../components/home'),
    loading: ContentLoading
});

const TableDemo = Loadable({
    loader: () => import('../views/example/tableDemo'),
    loading: ContentLoading
});

const UserProfile = Loadable({
    loader: () => import('../views/ucenter/user/userProfile'),
    loading: ContentLoading
});

const UserSetting = Loadable({
    loader: () => import('../views/ucenter/user/userSetting'),
    loading: ContentLoading
});

export default {
    "error404": Error404,
    "calendars": Calendars,
    "basicTableComp": BasicTableComp,
    "home": Home,
    "tableDemo": TableDemo,
    "userProfile": UserProfile,
    "userSetting": UserSetting
};