import React from "react";
import NavBar from "../components/NavBar";
import {Button, Icon} from "@chakra-ui/react";
import {GrLogout} from "react-icons/gr";
import ReduxStore, {RootState} from "../utils/store";
import {useSelector} from "react-redux";
import Utils from "../utils/Utils";
import {AttachmentIcon, CopyIcon, InfoIcon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";

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

    const history = useHistory();
    const handleBack = () => {
        history.goBack();
    };

    return(
        <section className="h-100 p-4 bg-purple_transparent">

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
                <div className="col-lg-10 d-flex align-items-stretch">
                    <div className="bg-white main_area w-100">

                        <div className="border_bottom pb-3 mb-3">
                            {
                                props.title !== 'Dashboard' ? (
                            <Button className="float-end" onClick={handleBack}>Back</Button>
                                ):null
                            }
                        <h1 className="font-lg-3 text-primary text-capitalize font-weight-700">{props.title}</h1>
                        </div>


                        {props.children}

                    </div>
                </div>
            </div>





        </section>
    )
}
