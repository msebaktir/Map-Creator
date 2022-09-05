const firstElem = [];
const secondElem = [];

const getConflictedDots = (firstElem, secondElem) => {
    const conflicttedDots = [];
    firstElem.coordinates.forEach((ffcoordinate) => {
        secondElem.coordinates.forEach((sscoordinate) => {
            if (
                sscordinate.x <= ffcoordinate.x &&
                sscordinate.x + sscordinate.width >= ffcoordinate.x &&
                ffcoordinate.y <= sscordinate.y &&
                ffcoordinate.y + ffcoordinate.height >= sscordinate.y
            ) {
                conflicttedDots.push({
                    x: ffcoordinate.x,
                    y: sscordinate.y,
                });
            }
        });
    });
    return conflicttedDots;
};
