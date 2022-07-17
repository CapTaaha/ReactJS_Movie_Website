import { Toast } from "react-bootstrap";
import { useState, useEffect } from "react";

type Props ={
    toastString : string,
    toastBgType : string
}

const ToastItem = ({toastString,toastBgType} : Props) => {
    const [show, setShow] = useState(true);

    return (
        <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide bg={toastBgType}>
            <Toast.Body>{toastString}</Toast.Body>
        </Toast>
    )

}

export default ToastItem;