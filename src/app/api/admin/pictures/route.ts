import { NextRequest, NextResponse } from 'next/server';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, app } from '@/lib/firebase/firebase'; // Assuming 'app' is exported from your firebase config
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    // Ensure user is authenticated (optional, but recommended for admin actions)
    // const user = auth.currentUser;
    // if (!user) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const storage = getStorage(app);
    const fileName = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `images/${fileName}`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const snapshot = await uploadBytes(storageRef, buffer, { contentType: file.type });
    const downloadURL = await getDownloadURL(snapshot.ref);

    return NextResponse.json({ url: downloadURL });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ message: 'Image upload failed', error: error.message }, { status: 500 });
  }
}
