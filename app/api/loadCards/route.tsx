import { readdir, readdirSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

function calculateCardAngle(index: number){
    const total = 78;
    const maxAngle = 90;
    
    const spacing = index * (1200 / total);
    return {
        xOffset: spacing,
    }
}

export async function GET(){
    try{
        const imagesDir = join(process.cwd(), 'public/cards');
        const imageFiles = readdirSync(imagesDir);
        // const imagePaths = imageFiles.map(file => join('/cards', file));
        const images = imageFiles.map((img, index) => {
            const imgPath = join('/cards', img);
            const values = calculateCardAngle(index);
            const css = {
                left: `${values.xOffset}px`
            };

            return {
                img: imgPath,
                css,
            };
        });
        // console.log(images);


        return NextResponse.json({ images: images }, { status: 200 });
    } catch (err){
        return NextResponse.json({ message: "Internal error" }, {status: 500});
    }

}