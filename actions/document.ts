"use server"
import { db } from "@/prisma/db";

export async function createDocument(data:any) {
    console.log(data)
     const {title,description,documentLink,currentStep} = data
     const document = await db.document.create({
        data:{
            title,
            description,
            documentLink,
            // userId,
            currentStep : "INDIVIDUAL",
            // status:DocumentStatus.PENDING   
        }
     }) 
     console.log(document)
     return document
}

export async function getAllDocuments(){
   try {
    const document = await db.document.findMany()
    return document
   } catch (error) {
    console.log(error)
   }
}

