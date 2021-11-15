import React from "react";
import NavBar from "../components/NavBar";
import {Button, Icon} from "@chakra-ui/react";
import {GrLogout} from "react-icons/gr";
import ReduxStore, {RootState} from "../utils/store";
import {useSelector} from "react-redux";
import Utils from "../utils/Utils";
import {AttachmentIcon, CopyIcon, InfoIcon} from "@chakra-ui/icons";

interface Props {
    children: React.ReactNode,
    title : String,
}

// @ts-ignore
export default function Dash_Layout(props:Props)
{
    const { firstName, lastName, type, _id } = useSelector(
        (state: RootState) => state.auth
    );

    const fullName = Utils.capitalize(`${firstName} ${lastName}`);

    const logout = () => {
        ReduxStore.dispatch({
            type: 'UNAUTHENTICATED'
        });
    };

    return(
        <section className="h-100 p-4 overflow-hidden bg-purple_transparent">

            <div className="bg-primary clearfix border_radius mb-3 p-2">

                <div className="float-end">
                    <Button onClick={logout} rightIcon={<GrLogout color="#fff" />} className="bg-transparent_black_6 font-white w-100" type='submit'>Logout</Button>
                </div>

                <div className="d-flex align-items-center">
                    <div className="bg-white p-2 font-weight-800 rounded-circle float-start me-3">
                        {firstName.charAt(0)}{lastName.charAt(0)}
                    </div>
                    <h4 className="font-white font-sm-2">{fullName}</h4>
                </div>

            </div>

            <div className="row g-0 main_body">
                <div className="col-lg-2">
                    <NavBar active={props.title} />

                </div>
                <div className="col-lg-10">
                    <div className="main_area">
                        {props.children}
                    </div>
                </div>
            </div>





        </section>
    )
}
