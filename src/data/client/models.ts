import { EncryptedAttachmentDTO, PatientDTO, PatientRecordDTO } from "../dto";
import { getCurrentTS } from "../utils";
import { z } from "zod";


export enum DataLoadingStatus {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

export enum DataLinkStatus {
    Empty = 'Empty',
    NotAuthorized = 'NotAuthorized',
    AuthorizationError = 'AuthorizationError',
    Authorized = 'Success',
    InProgress = 'InProgress'
}

export class ServerDataLinkStatus {
    status: DataLinkStatus;
    message: string;
    constructor(status: DataLinkStatus, message: string) {
        this.status = status;
        this.message = message;
    }

    isReady(): boolean {
        return this.status === DataLinkStatus.Authorized;
    }

    isInProgress(): boolean {
        return this.status === DataLinkStatus.InProgress;
    }

    isError(): boolean {
        return this.status === DataLinkStatus.AuthorizationError;
    }

    isEmpty(): boolean {
        return this.status === DataLinkStatus.Empty;
    }    

}

export class Patient {
    id?: number;
    firstName: string;
    lastName: string;
    email?: string;
    dateOfBirth?: string;
    updatedAt?: string;

    constructor(patientDTO: PatientDTO) {
        this.id = patientDTO.id;
        this.firstName = patientDTO.firstName;
        this.lastName = patientDTO.lastName;
        this.email = patientDTO.email;
        this.dateOfBirth = patientDTO.dateOfBirth;
        this.updatedAt = patientDTO.updatedAt;
    }

    static fromDTO(patientDTO: PatientDTO): Patient {
        return new Patient(patientDTO);
    }    

    toDTO(): PatientDTO {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            dateOfBirth: this.dateOfBirth,
            updatedAt: this.updatedAt ? this.updatedAt : new Date().toISOString(),
        };
    }

    displayName(): string {
        return this.firstName + " " + this.lastName;
    }
    displatDateOfBirth(): string {
        return this.dateOfBirth ? new Date(this.dateOfBirth).toLocaleDateString() : '';
    }
    avatarFallback(): string {
        return (this.firstName[0] + this.lastName[0]).toUpperCase();
    }    
}

export type AttachmentAssigment = {
    id: number;
    type: string;
}

export class EncryptedAttachment {
    id?: number;
    assignedTo?: AttachmentAssigment[];
    displayName: string;
    description?: string;
    mimeType?: string;
    type?: string;
    json?: string;
    extra?: string;
    size: number;
    storageKey: string;
    createdAt: string;
    updatedAt: string;

    constructor(attachmentDTO: EncryptedAttachmentDTO) {
        this.id = attachmentDTO.id;
        this.assignedTo = attachmentDTO.assignedTo ? ( typeof attachmentDTO.assignedTo == 'string' ? JSON.parse(attachmentDTO.assignedTo) : attachmentDTO.assignedTo ): [];
        this.displayName = attachmentDTO.displayName;
        this.description = attachmentDTO.description;
        this.mimeType = attachmentDTO.mimeType;
        this.type = attachmentDTO.type;
        this.json = attachmentDTO.json;
        this.extra = attachmentDTO.extra;
        this.size = attachmentDTO.size;
        this.storageKey = attachmentDTO.storageKey;
        this.createdAt = attachmentDTO.createdAt;
        this.updatedAt = attachmentDTO.updatedAt;
    }

    static fromDTO(fileDTO: EncryptedAttachmentDTO): EncryptedAttachment {
        return new EncryptedAttachment(fileDTO);
    }

    toDTO(): EncryptedAttachmentDTO {
        return {
            id: this.id,
            assignedTo: JSON.stringify(this.assignedTo),
            displayName: this.displayName,
            description: this.description,
            mimeType: this.mimeType,
            type: this.type,
            json: this.json,
            extra: this.extra,
            size: this.size,
            storageKey: this.storageKey,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

export class PatientRecord {
    id?: number;
    patientId: number;
    description?: string;
    type: string;
    json?: any;
    text?: string;
    extra?: string;
    createdAt: string;
    updatedAt: string;
    attachments: EncryptedAttachment[] = [];
  
    constructor(patientRecordSource: PatientRecordDTO | PatientRecord) {
      this.id = patientRecordSource.id;
      this.patientId = patientRecordSource.patientId;
      this.description = patientRecordSource.description;
      this.type = patientRecordSource.type;
      this.text = patientRecordSource.text;
      if(patientRecordSource instanceof PatientRecord) {
        this.json = patientRecordSource.json
     } else {
        this.json = patientRecordSource.json ? (typeof patientRecordSource.json === 'string' ? JSON.parse(patientRecordSource.json) : patientRecordSource.json) : null;
     }

      this.extra = patientRecordSource.extra;
      this.createdAt = patientRecordSource.createdAt;
      this.updatedAt = patientRecordSource.updatedAt;
      if(patientRecordSource instanceof PatientRecord) {
         this.attachments = patientRecordSource.attachments
      } else {
         this.attachments = patientRecordSource.attachments ? (typeof patientRecordSource.attachments === 'string' ? JSON.parse(patientRecordSource.attachments) : patientRecordSource.attachments).map(EncryptedAttachment.fromDTO) : [];
      }
    }
  
    static fromDTO(patientRecordDTO: PatientRecordDTO): PatientRecord {
      return new PatientRecord(patientRecordDTO);
    }
  
    toDTO(): PatientRecordDTO {
      return {
        id: this.id,
        patientId: this.patientId,
        description: this.description,
        type: this.type,
        json: JSON.stringify(this.json),
        text: this.text,
        extra: this.extra,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        attachments: JSON.stringify(this.attachments.map(attachment => attachment.toDTO()))
      };
    }  
  }