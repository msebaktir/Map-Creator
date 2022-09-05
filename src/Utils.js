import { ContientColors } from "./Constant";

const CalculateContinentsCenterCoordinates = (
    coninentsCount,
    width,
    height,
    maxContinentWidth,
    minContinentWidth
) => {
    const names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const continentsCenterCoordinates = [];
    let currentContinentWidth = minContinentWidth;
    let currentContinentHeight = height;
    let currentContinentX = 0;
    let currentContinentY = 0;
    let currentContinentIndex = 0;
    while (currentContinentIndex < coninentsCount) {
        const currentContinentWidth = Math.floor(
            Math.random() * (width - minContinentWidth) + minContinentWidth
        );
        const currentContinentHeight = Math.floor(
            Math.random() * (height - minContinentWidth) + minContinentWidth
        );
        const currentContinentX = Math.floor(
            Math.random() * (width - currentContinentWidth) +
                currentContinentWidth
        );
        const currentContinentY = Math.floor(
            Math.random() * (height - currentContinentHeight) +
                currentContinentHeight
        );
        if (currentContinentX < width && currentContinentY < height) {
            continentsCenterCoordinates.push({
                x: currentContinentX,
                y: currentContinentY,
                width: currentContinentWidth,
                height: currentContinentHeight,
                Name: names[currentContinentIndex],
                Color: ContientColors[currentContinentIndex],
            });
            currentContinentIndex++;
        }
    }
    return continentsCenterCoordinates;
};

const getCornerOfContinent = (continent) => {
    const corners = [];
    corners.push({
        x: continent.x,
        y: continent.y,
        Name: continent.Name,
        width: continent.width,
        height: continent.height,
        Defination: "TopLeft",
        VerticalDirection: "+",
        HorizontalDirection: "+",
    });
    corners.push({
        x: continent.x + continent.width,
        y: continent.y,
        Name: continent.Name,
        width: continent.width,
        height: continent.height,
        Defination: "TopRight",
        VerticalDirection: "+",
        HorizontalDirection: "-",
    });
    corners.push({
        x: continent.x + continent.width,
        y: continent.y + continent.height,
        Name: continent.Name,
        width: continent.width,
        height: continent.height,
        Defination: "BottomRight",
        VerticalDirection: "-",
        HorizontalDirection: "-",
    });
    corners.push({
        x: continent.x,
        y: continent.y + continent.height,
        width: continent.width,
        height: continent.height,
        Name: continent.Name,
        Defination: "BottomLeft",
        VerticalDirection: "-",
        HorizontalDirection: "+",
    });
    return corners;
};

const GetCornersOfAllContinents = (continents) => {
    const corners = [];
    continents.forEach((continent) => {
        corners.push(...getCornerOfContinent(continent));
    });
    return corners;
};

const GetConflictContinents = (continents, corners) => {
    const conflictContinents = [];
    continents.forEach((continent) => {
        corners.forEach((corner) => {
            if (
                corner.x >= continent.x &&
                corner.x <= continent.x + continent.width &&
                corner.y >= continent.y &&
                corner.y <= continent.y + continent.height
            ) {
                var test = {
                    x: continent.x,
                    y: corner.y,
                };
                conflictContinents.push({
                    ...continent,
                    ConflictName: corner.Name,
                    conflictPoint: test,
                });
            }
        });
    });

    return conflictContinents.filter(
        (continent) => continent.ConflictName !== continent.Name
    );
};

const CreateNewObjectFromConflictedContinents = (conflictContinents) => {
    const conflicts = [];
    conflictContinents.forEach((conflictContinent) => {
        if (conflicts.length === 0) {
            conflicts.push({
                Name: "Conflict" + conflicts.length + 1,
                Contninets: [
                    conflictContinent.Name,
                    conflictContinent.ConflictName,
                ],
            });
        } else {
            const isContinentExist = conflicts.find((conflict) =>
                conflict.Contninets.includes(conflictContinent.Name)
            );
            if (isContinentExist) {
                const index = conflicts.findIndex((conflict) =>
                    conflict.Contninets.includes(conflictContinent.Name)
                );
                conflicts[index].Contninets.push(
                    conflictContinent.ConflictName
                );
            } else {
                conflicts.push({
                    Name: "Conflict" + conflicts.length + 1,
                    Contninets: [
                        conflictContinent.Name,
                        conflictContinent.ConflictName,
                    ],
                });
            }
        }
    });

    return conflicts.map((conflict) => {
        return {
            Name: conflict.Name,
            Contninets: conflict.Contninets.filter(
                (value, index, self) => self.indexOf(value) === index
            ),
        };
    });
};

const hexToRgbA = (hex, opacity) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return (
            "rgba(" +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
            "," +
            opacity +
            ")"
        );
    }
    throw new Error("Bad Hex");
};

const getIntersectionPointsOfContinents = (continents) => {
    const intersectionPoints = [];
    continents.forEach((continent) => {
        const continentCorners = GetCornersOfAllContinents([continent]);
        continentCorners.forEach((corner) => {
            const isIntersectionPointExist = intersectionPoints.find(
                (intersectionPoint) =>
                    intersectionPoint.x === corner.x &&
                    intersectionPoint.y === corner.y
            );
            if (!isIntersectionPointExist) {
                intersectionPoints.push({ x: corner.x, y: corner.y, Name: continent.Name });
            }
        });
    });
    return intersectionPoints;
};

const getConflictDot = (first,second) =>{
    const Dots = [];
   // Sagabak
    if(first.x1 <= second.x1 && first.x2 >= second.x1 && first.y1 >= second.y1 && first.y1 <= second.y2 ){
        Dots.push({
            x: second.x1,
            y: first.y1,
        });
        // Dots.push({
        //     x:first.x1,
        //     y:first.y1,
        // });
    }
   // aşağı bak
   if(first.y1 <= second.y1 && first.y2 >= second.y1 && first.x1 >= second.x1 && first.x1 <= second.x2 ){
        Dots.push({
            x: first.x1,
            y: second.y1,
        });
        // Dots.push({
        //     x:first.x1,
        //     y:first.y1,
        // });
    }
   
    return Dots;

}

const getConflictedDots = (firstElem, secondElem) => {
    const firstCoordinates = getCornerOfContinent(firstElem);
    const secondCoordinates = getCornerOfContinent(secondElem);
    let conflicttedDots = [];
    firstCoordinates.forEach((firstCorner) => {
        secondCoordinates.forEach((secondCorner) => {
  

                const first = {
                    x1: firstCorner.x,
                    y1: firstCorner.y,
                    x2: eval(firstCorner.x + firstCorner.HorizontalDirection + firstCorner.width),
                    y2: eval(firstCorner.y + firstCorner.VerticalDirection + firstCorner.height),
                };
                const second = {
                    x1: secondCorner.x,
                    y1: secondCorner.y,
                    x2: eval(secondCorner.x + secondCorner.HorizontalDirection + secondCorner.width),
                    y2: eval(secondCorner.y + secondCorner.VerticalDirection + secondCorner.height),
                };
                conflicttedDots.push(...getConflictDot(first,second));

     
        });
    });
            

   
 


    return conflicttedDots;
};

const checkCoordinateInsideOfContinent = (coordinate, continent) => {
    const x1 = continent.x;
    const y1 = continent.y;
    const x2 = continent.x + continent.width;
    const y2 = continent.y + continent.height;
    if(
        x1 < coordinate.x &&
        x2 > coordinate.x &&
        y1 < coordinate.y &&
        y2 > coordinate.y
    ){
        return true;
    }
    return false;
};

export {
    CalculateContinentsCenterCoordinates,
    GetCornersOfAllContinents,
    GetConflictContinents,
    CreateNewObjectFromConflictedContinents,
    getIntersectionPointsOfContinents,
    getConflictedDots,
    checkCoordinateInsideOfContinent,
    hexToRgbA,
};
