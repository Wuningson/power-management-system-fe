import React from 'react';
import { Link } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { Active } from '../layout/DashLayout';
import { Link as RLink } from 'react-router-dom';
import { AttachmentIcon, CopyIcon, InfoIcon } from '@chakra-ui/icons';

export interface NavBarProps {
  active: Active;
  handleClick: (active: Active) => (e: any) => void;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const { active, handleClick } = props;
  const { type, _id } = useSelector((state: RootState) => state.auth);
  const dashboardLink = type === 'customer' ? '/customer' : '/employee';

  return (
    <div
      className='nav fltitleex-column nav-pills'
      id='v-pills-tab'
      role='tablist'
      aria-orientation='vertical'
    >
      <Link as={RLink} to={dashboardLink}>
        <button
          className={active === 'Dashboard' ? 'nav-link active' : 'nav-link'}
          id='v-pills-home-tab'
          data-bs-toggle='pill'
          data-bs-target='#v-pills-home'
          type='button'
          role='tab'
          aria-controls='v-pills-home'
          aria-selected='true'
          onClick={handleClick('Dashboard')}
        >
          <InfoIcon w={6} h={6} className='me-2' /> Dashboard
        </button>
      </Link>
      {type === 'employee' ? (
        <Link as={RLink} to='/employee/customers'>
          <button
            className={active === 'Customers' ? 'nav-link active' : 'nav-link'}
            id='v-pills-home-tab'
            data-bs-toggle='pill'
            data-bs-target='#v-pills-home'
            type='button'
            role='tab'
            aria-controls='v-pills-home'
            aria-selected='true'
            onClick={handleClick('Customers')}
          >
            <CopyIcon w={6} h={6} className='me-2' /> Customers
          </button>
        </Link>
      ) : type === 'customer' ? (
        <>
          <Link as={RLink} to={`/customer/bills/${_id}`}>
            <button
              className={active === 'Bills' ? 'nav-link active' : 'nav-link'}
              id='v-pills-home-tab'
              data-bs-toggle='pill'
              data-bs-target='#v-pills-home'
              type='button'
              role='tab'
              aria-controls='v-pills-home'
              aria-selected='true'
              onClick={handleClick('Bills')}
            >
              <CopyIcon w={6} h={6} className='me-2' /> Bills
            </button>
          </Link>

          <Link as={RLink} to={`/customer/payments/${_id}`}>
            <button
              className={active === 'Payments' ? 'nav-link active' : 'nav-link'}
              id='v-pills-profile-tab'
              data-bs-toggle='pill'
              data-bs-target='#v-pills-profile'
              type='button'
              role='tab'
              aria-controls='v-pills-profile'
              aria-selected='false'
              onClick={handleClick('Payments')}
            >
              <AttachmentIcon w={6} h={6} className='me-2' /> Payments
            </button>
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default NavBar;
