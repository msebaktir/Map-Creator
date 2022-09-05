import { Ratios } from "./Constant";
import {
    CalculateContinentsCenterCoordinates,
    GetCornersOfAllContinents,
    GetConflictContinents,
    hexToRgbA,
    CreateNewObjectFromConflictedContinents,
    getIntersectionPointsOfContinents,
    checkCoordinateInsideOfContinent,
    getConflictedDots,
} from "./Utils";

export default function MapGenerator() {
    const canvas = document.querySelector("#map");
    const ctx = canvas.getContext("2d");

    const CanvasWidth = canvas.width;
    const CanvasHeight = canvas.height;

    const TotalLandWidth = CanvasWidth * Ratios.LandOceanRatio;
    const TotalLandHeight = CanvasHeight * Ratios.LandOceanRatio;

    const Continents = CalculateContinentsCenterCoordinates(
        Ratios.TotalContinent,
        TotalLandWidth,
        TotalLandHeight,
        1 - Ratios.MinContinentWidth,
        Ratios.MinContinentWidth
    );

    Continents.forEach((continent) => {
        ctx.fillStyle = hexToRgbA(continent.Color, 0.5);
        ctx.fillRect(
            continent.x,
            continent.y,
            continent.width,
            continent.height
        );
        //write continent name
        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.fillText(
            continent.Name,
            continent.x + continent.width / 2,
            continent.y + continent.height / 2
        );
    });

    const checkCoordinateInsideOfAnyContinent = (coordinate) => {
        for (let index = 0; index < Continents.length; index++) {
            const element = Continents[index];
            if(coordinate.Name === element.Name){
                continue;
            }
            if (checkCoordinateInsideOfContinent(coordinate, element)) {
                return true;
            }
        }
        return false;
            
       
    };

    const ConflicterContinents = GetConflictContinents(
        Continents,
        GetCornersOfAllContinents(Continents)
    );

    ConflicterContinents.forEach((conflicterContinent) => {
        const conflicttedDots = getConflictedDots(
            Continents.find(
                (continent) => continent.Name === conflicterContinent.Name
            ),
            Continents.find(
                (continent) =>
                    continent.Name === conflicterContinent.ConflictName
            )
        );
        conflicttedDots.forEach((dot) => {
            if(!checkCoordinateInsideOfAnyContinent(dot)){

                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
    });

    const conflicetedCoordinatesDots = [];

    const conflicts =
        CreateNewObjectFromConflictedContinents(ConflicterContinents);


    const insidesDots = [];
    conflicts.forEach((conflict) => {
        const conflictContinents = conflict.Contninets.map((continent) =>
            Continents.find((c) => c.Name === continent)
        );

        var coordinates = getIntersectionPointsOfContinents(conflictContinents);
        coordinates.forEach((coordinate) => {
        
            if (!checkCoordinateInsideOfAnyContinent(coordinate)) {
                insidesDots.push(coordinate);
                ctx.fillStyle = "#ff0000";
                ctx.beginPath();
                ctx.arc(coordinate.x, coordinate.y, 5, 0, 2 * Math.PI);
                ctx.fill();
             }
            });
    });

    // const big = GetCornersOfAllContinents(Continents);
    // ctx.fillStyle = "#ff0000";

    return Continents;
}
