import React, {SFC} from 'react';

interface Props {
   xp: number,
}

const XP = ({xp}: Props) => (
    <span>{xp.toLocaleString()}</span>
)

export default XP;
