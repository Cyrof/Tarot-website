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

