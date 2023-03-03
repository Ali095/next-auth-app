
import { ReactNode } from 'react';
import Dashboard from '../../../public/icons/icon-dashboard.svg';
import Store from '../../../public/icons/icon-store.svg';
import Recipes from '../../../public/icons/icon-recipes.svg';
import Help from '../../../public/icons/icon-help.svg';
import Plus from '../../../public/icons/icon-plus.svg';
import Inspector from '../../../public/icons/icon-inspector.svg';
import Settings from '../../../public/icons/icon-settings.svg';
import Logout from '../../../public/icons/icon-logout.svg';
import Profile from '../../../public/icons/icon-profile.svg';
import Notification from '../../../public/icons/icon-notification.svg';
import Advanced from '../../../public/icons/icon-advanced.svg';
import Billing from '../../../public/icons/icon-billing.svg';
import Card from '../../../public/icons/icon-card.svg';
import Visa from '../../../public/icons/icon-visa.svg';
import MasterCard from '../../../public/icons/icon-mastercard.svg';
import UnionPay from '../../../public/icons/icon-unionpay.svg';
import Maestro from '../../../public/icons/icon-maestro.svg';
import Discover from '../../../public/icons/icon-discover.svg';
import Jcb from '../../../public/icons/icon-jcb.svg';
import Diners from '../../../public/icons/icon-diners.svg';
import AmericanExpress from '../../../public/icons/icon-american-express.svg';
import Plan from '../../../public/icons/icon-plan.svg';
import Info from '../../../public/icons/icon-info.svg';
import Cross from '../../../public/icons/icon-cross.svg';
import Search from '../../../public/icons/icon-search.svg';
import Filter from '../../../public/icons/icon-filter.svg';
import Back from '../../../public/icons/icon-back.svg';
import Toggle from '../../../public/icons/icon-toggle.svg';
import Users from '../../../public/icons/icon-users.svg';
import Team from '../../../public/icons/icon-team.svg';
import Google from '../../../public/icons/icon-google.svg';
import Delete from '../../../public/icons/icon-delete.svg';
import Apple from '../../../public/icons/icon-apple.svg';
import PassView from '../../../public/icons/icon-pass-view.svg';
import PassHide from '../../../public/icons/icon-pass-hide.svg';
import Success from '../../../public/icons/icon-alert-success.svg';
import Warning from '../../../public/icons/icon-alert-warning.svg';
import AlertInfo from '../../../public/icons/icon-alert-info.svg';
import AlertError from '../../../public/icons/icon-alert-error.svg';


type IconsList = {
    [key: string]: ReactNode
}

export const Icon = ({ name }: { name: string }) => {
    const getIcon = () => {
        const icons: IconsList = {
            dashboard: <Dashboard />,
            store: <Store />,
            recipes: <Recipes />,
            help: <Help />,
            plus: <Plus />,
            inspector: <Inspector />,
            settings: <Settings />,
            logout: <Logout />,
            profile: <Profile />,
            notification: <Notification />,
            advanced: <Advanced />,
            billing: <Billing />,
            card: <Card />,
            visa: <Visa />,
            americanExpress: <AmericanExpress />,
            mastercard: <MasterCard />,
            unionpay: <UnionPay />,
            maestro: <Maestro />,
            jcb: <Jcb />,
            diners: <Diners />,
            discover: <Discover />,
            plan: <Plan />,
            info: <Info />,
            cross: <Cross />,
            search: <Search />,
            filter: <Filter />,
            back: <Back />,
            toggle: <Toggle />,
            users: <Users />,
            team: <Team />,
            roles: <Team />,
            prices: <Team />,
            google: <Google />,
            apple: <Apple />,
            delete: <Delete />,
            passView: <PassView />,
            passHide: <PassHide />,
            success: <Success />,
            warning: <Warning />,
            danger: <AlertError />,
            alertInfo: <AlertInfo />,
        };

        return icons[name];
    };

    return (
        <i className="icon">{getIcon()}</i>
    );
};
