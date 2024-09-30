"use server"
import { db } from "@/prisma/db";

export async function createDocument(data:any) {
    console.log(data)
     const {title,description,documentLink,hodStatus,         
      secretaryStatus, userId,documentStatus} = data
     const document = await db.document.create({
        data:{
            title,
            description,
            documentLink,
            hodStatus,         
            secretaryStatus, 
            documentStatus,   
            userId
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

