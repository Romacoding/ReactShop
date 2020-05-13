import React from 'react';
import { Checkbox } from 'semantic-ui-react';

function ToggleSlider() {
    const [showPics, setShowPics] = React.useState(true);
    function handleToggleChange() {
        setShowPics(!showPics);
    }

    return (
        <Checkbox
        toggle
        label="Показувати фото товарів"
        checked={showPics}
        onClick={handleToggleChange}
    />)
}
export default ToggleSlider;