import {useEffect, useRef} from "react";

function useOutsideClick(handler, listeningCapturing = true) {
    const ref = useRef();
    useEffect(
        function () {
            function handleClick(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    handler();
                }
            }

            document.addEventListener("click", handleClick, true);

            return () => {
                document.removeEventListener(
                    "click",
                    handleClick,
                    listeningCapturing
                );
            };
        },
        [handler]
    );

    return ref;
}

export default useOutsideClick;
