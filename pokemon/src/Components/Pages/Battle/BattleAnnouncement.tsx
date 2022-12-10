import React from "react";

export type BattleAnnounceMentProps = {
    victory: boolean;
}

export const BattleAnnouncement: React.FC<BattleAnnounceMentProps> = ({victory}) => {
    return (<div className="result fade-out">{victory ? 'You Won' : 'You Lost'}</div>);
}
export default BattleAnnouncement;