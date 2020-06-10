import React from "react";
import Button from '@material-ui/core/Button';

function refreshWindow() {
    window.location.reload(false);
}

const Refresh = () => {
    return (
        <div className="text-center">
            <h1>To many attempts for public API</h1>
            <h3>Please try again</h3>
            <Button onClick={refreshWindow} variant="contained">Try again</Button>
        </div>
    )
};

export default Refresh