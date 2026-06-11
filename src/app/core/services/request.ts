import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  where,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Modelo de solicitud de contacto
export interface ContactRequest {
  id?: string;
  userId: string;
  userEmail: string;
  // Nombre del solicitante (opcional si se obtiene desde Auth)
  userName?: string;
  developerSlug: string;
  projectDescription: string;
  status: 'Pendiente' | 'En proceso' | 'Respondida';
  response?: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class RequestService {
  private firestore = inject(Firestore);
  private readonly collectionPath = 'requests';

  // Crea una nueva solicitud y devuelve el id del documento
  async createRequest(
    payload: Omit<ContactRequest, 'id' | 'status' | 'createdAt' | 'response'>,
  ): Promise<string> {
    const data: ContactRequest = {
      ...payload,
      status: 'Pendiente',
      createdAt: new Date(),
    } as ContactRequest;

    const ref = await addDoc(collection(this.firestore, this.collectionPath), data);
    return ref.id;
  }

  // Obtiene solicitudes por usuario (observable con id incluido)
  getRequestsByUser(userId: string): Observable<ContactRequest[]> {
    const q = query(collection(this.firestore, this.collectionPath), where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<ContactRequest[]>;
  }

  // Obtiene solicitudes dirigidas a un desarrollador
  getRequestsByDeveloper(developerSlug: string): Observable<ContactRequest[]> {
    const q = query(
      collection(this.firestore, this.collectionPath),
      where('developerSlug', '==', developerSlug),
    );
    return collectionData(q, { idField: 'id' }) as Observable<ContactRequest[]>;
  }

  // Actualiza campos de una solicitud (status y/o response)
  updateRequest(
    requestId: string,
    updates: Partial<Pick<ContactRequest, 'status' | 'response'>>,
  ): Promise<void> {
    const ref = doc(this.firestore, this.collectionPath, requestId);
    return updateDoc(ref, updates as Partial<ContactRequest>);
  }

  // Método conveniencia para responder (marca Respondida y añade respuesta)
  respondRequest(requestId: string, response: string): Promise<void> {
    return this.updateRequest(requestId, { status: 'Respondida', response });
  }

  updateStatus(
    requestId: string,
    status: 'Pendiente' | 'En proceso' | 'Respondida',
  ): Promise<void> {
    const ref = doc(this.firestore, this.collectionPath, requestId);

    return updateDoc(ref, {
      status,
    });
  }
  getAllRequests(): Observable<ContactRequest[]> {
    const ref = collection(this.firestore, 'requests');
    return collectionData(ref, { idField: 'id' }) as Observable<ContactRequest[]>;
  }
}
