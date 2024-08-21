import { readdir, readdirSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const imagesDir = join(process.cwd(), 'public/cards');
        const imageFiles = readdirSync(imagesDir);
        const imagePaths = imageFiles.map(file => join('/cards', file));

        return NextResponse.json({ images: imagePaths }, { status: 200 });
    } catch (err){
        return NextResponse.json({ message: "Internal error" }, {status: 500});
    }

}