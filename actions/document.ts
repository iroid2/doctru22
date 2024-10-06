'use server'

import { db } from "@/prisma/db";
import { DocumentStatus } from "@prisma/client";


// / Define the type for the incoming data
interface CreateDocumentData {
  title: string;
  description: string;
  qrCode?: string;  // Make qrCode optional if it's not always present
  documentLink: string;
  userId: string;
}

// Create a new document
export async function createDocument(data: CreateDocumentData) {
    const { title, description, qrCode, documentLink, userId } = data;
    const document = await db.document.create({
        data: {
            title,
            description,
            documentLink,
            // Remove or comment out the qrCode line
            qrCode: qrCode as unknown as string,
            userId,
            hodStatus: false,
            secretaryStatus: false,
            documentStatus: DocumentStatus.PENDING,
        },
    });
    return document;
}

// Fetch all documents
export async function getAllDocuments() {
    try {
        const documents = await db.document.findMany({
            include: {
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return documents;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Secretary approves the document and forwards to HOD
export async function approveBySecretary(documentId: string) {
    try {
        // Update the document's status as approved by secretary
        const updatedDocument = await db.document.update({
            where: {
                id: documentId,
            },
            data: {
                secretaryStatus: true,
                documentStatus: DocumentStatus.PENDING, // Still pending, HOD needs to approve
            },
        });
        return updatedDocument;
    } catch (error) {
        console.log("Error approving document by Secretary:", error);
        throw new Error("Approval failed.");
    }
}
// hod approves
export async function approveByHod(documentId: string) {
    try {
        // Update the document's status as approved by secretary
        const updatedDocument = await db.document.update({
            where: {
                id: documentId,
            },
            data: {
                hodStatus: true,
                documentStatus: DocumentStatus.APPROVED, // Still pending, HOD needs to approve
            },
        });
        return updatedDocument;
    } catch (error) {
        console.log("Error approving document by Secretary:", error);
        throw new Error("Approval failed.");
    }
}
// secretary rejects the documents
export async function rejectBySecretary(documentId: string) {
    try {
        // Update the document's status as approved by secretary
        const updatedDocument = await db.document.update({
            where: {
                id: documentId,
            },
            data: {
                secretaryStatus: false,
                documentStatus: DocumentStatus.REJECTED, 
            },
        });
        return updatedDocument;
    } catch (error) {
        console.log("Error rejecting document by Secretary:", error);
        throw new Error("Reject failed.");
    }
}



export async function getDocumentById(documentId: string) {
    try {
        const document = await db.document.findUnique({
            where: {
                id: documentId,
            },
            include: {
                user: true, // Include the user related to the document
            },
        });

        if (!document) {
            console.log(`Document with ID ${documentId} not found.`);
            throw new Error("Document not found");
        }

        return document;
    } catch (error:any) {
        console.log("Error fetching document:", error.message, error.stack);
        throw new Error(`Failed to fetch document: ${error.message}`);
    }
}


