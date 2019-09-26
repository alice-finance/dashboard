import React from "react";

interface FontAwesomeProps {
    name: string;
}

const FontAwesome = ({ name }: FontAwesomeProps) => {
    // noinspection CheckTagEmptyBody
    return <i className={`fa fa-${name}`}></i>;
};

export default FontAwesome;
