import { pistonClient } from "@/lib/services/piston-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { sourceCode, language, input } = await request.json();
    try {
        // TODO: VALIDATE THE USER
        // STORE THE USER CODE IN DB

        // now to check the code is running on piston 
        const results = await pistonClient.runCode(language, sourceCode, input);

        console.log(results)

        return NextResponse.json({ success: true, output: results.output })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}