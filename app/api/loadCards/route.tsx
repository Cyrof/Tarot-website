// // import { readdir, readdirSync } from "fs";
// import { promises as fs} from 'fs';
// import { join } from "path";
// import { NextRequest, NextResponse } from "next/server";

import { readdirSync, readdir } from "fs";
import { promises as fs} from 'fs';
import { join } from "path";
import { NextResponse } from "next/server";

function setPath(images: string[], dir_name: string){
    const newImg = images.map((img, index) => {
        const imgPath = join(dir_name, img);
        return imgPath;
    })
    return newImg;
}

async function getImages(){
    const imagesDir = join(process.cwd(), 'public/cards');
    const frontDir = join(imagesDir, '/front');
    const backDir = join(imagesDir, '/back');

    // get images
    var frontImg = await fs.readdir(frontDir);
    frontImg = setPath(frontImg, '/cards/front');

    var backImg = await fs.readdir(backDir);
    backImg = setPath(backImg, '/cards/back');

    return {
        front: frontImg,
        back: backImg,
    }
}

export async function GET(){
    try{
        const images = await getImages();

        return NextResponse.json({img: images}, {status: 200});
    } catch(err){
        console.error('Error reading image files:', err);
        return NextResponse.json({ message: "Internal error" }, {status: 500});
    }
}

// function calculateCardAngle(index: number){
//     const total = 78;
//     const maxAngle = 90;
//     const angle = maxAngle * (index / (total -1)) - maxAngle / 2;
    
//     const spacing = index * (1200 / total);

//     // arc calculation
//     const radius = 300;
//     const arcVal = Math.pow((index - (total - 1) / 2) / ((total - 1) / 2), 2) * radius;
//     return {
//         angle: angle,
//         xOffset: spacing,
//         yOffset: arcVal,
//     }
// }

// export async function GET(){
//     try{
//         const imagesDir = join(process.cwd(), 'public/cards');
//         const imageFiles = await fs.readdir(imagesDir);

//         let maxXOffset = 0;
//         let maxYOffset = 0;

//         const images = imageFiles.map((img, index) => {
//             const imgPath = join('/cards', img);
//             const values = calculateCardAngle(index);

//             if (values.xOffset > maxXOffset) maxXOffset = values.xOffset;
//             if (values.yOffset > maxYOffset) maxYOffset = values.yOffset;

//             const css = {
//                 transform: `rotate(${values.angle}deg)`,
//                 left: `${values.xOffset}px`,
//                 top: `${values.yOffset}px`,
//                 // top: `calc(50% + ${values.yOffset}px)`,
//             };

//             return {
//                 img: imgPath,
//                 css,
//             };
//         });
//         // console.log(images);


//         return NextResponse.json({ 
//             images: images,
//             maxXOffset,
//             maxYOffset,
//          }, { status: 200 });
//     } catch (err){
//         console.error('Error reading image files:', err);
//         return NextResponse.json({ message: "Internal error" }, {status: 500});
//     }

// }