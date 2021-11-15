import Utils from '../utils/Utils';
import React, { Fragment } from 'react';
import { GrLogout } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import ReduxStore, { RootState } from '../utils/store';
import { Link as RLink } from 'react-router-dom';
import { Box, Button, Text, Flex } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import {AttachmentIcon, CopyIcon, InfoIcon} from "@chakra-ui/icons";

interface Props {
    active : String,
}

const NavBar = (props:Props) => {
  const { firstName, lastName, type, _id } = useSelector(
    (state: RootState) => state.auth
  );

  const fullName = Utils.capitalize(`${firstName} ${lastName}`);

  const logout = () => {
    ReduxStore.dispatch({
      type: 'UNAUTHENTICATED'
    });
  };

  return (
      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
           aria-orientation="vertical">
          <Link as={RLink} to='/customer'>
        <button className={props.active === 'Dashboard' ? "nav-link active" : "nav-link"} id="v-pills-home-tab" data-bs-toggle="pill"
                data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home"
                aria-selected="true">
          <InfoIcon w={6} h={6} className="me-2" />  Dashboard
        </button>
          </Link>
          {type === 'employee' ? (
              <Link as={RLink} to='/employee/customers'>
              <button className={props.active === 'Bills' ? "nav-link active" : "nav-link"} id="v-pills-home-tab" data-bs-toggle="pill"
                      data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home"
                      aria-selected="true">
                  <CopyIcon w={6} h={6} className="me-2" /> Customers
              </button>
              </Link>

          ): type === 'customer' ? (
            <>
            <Link as={RLink} to={`/customer/bills/${_id}`}>
            <button className={props.active === 'Bills' ? "nav-link active" : "nav-link"} id="v-pills-home-tab" data-bs-toggle="pill"
              data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home"
              aria-selected="true">
              <CopyIcon w={6} h={6} className="me-2" /> Bills
              </button>
            </Link>

            <Link as={RLink} to={`/customer/payments/${_id}`}>
            <button className={props.active === 'Payments' ? "nav-link active" : "nav-link"} id="v-pills-profile-tab" data-bs-toggle="pill"
              data-bs-target="#v-pills-profile" type="button" role="tab"
              aria-controls="v-pills-profile" aria-selected="false">
              <AttachmentIcon w={6} h={6} className="me-2" /> Payments
              </button>
            </Link>
              </>
              ):null
          }


      </div>
  );
};

export default NavBar;
