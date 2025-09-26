import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const socialMediaFilePath = path.join(process.cwd(), 'src/data/socialMedia.json');

export async function GET() {
  try {
    const socialMediaData = fs.readFileSync(socialMediaFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(socialMediaData));
  } catch (error: any) {
    console.error('Error reading social media data:', error);
    return NextResponse.json({ message: 'Failed to load social media data', error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const updatedLinks = await request.json();

    // Basic validation
    if (!updatedLinks || typeof updatedLinks !== 'object') {
      return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
    }

    // In a production environment, consider using a database instead of direct file system writes
    // as file systems can be read-only or ephemeral in serverless deployments.
    fs.writeFileSync(socialMediaFilePath, JSON.stringify(updatedLinks, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Social media links updated successfully' });
  } catch (error: any) {
    console.error('Error updating social media links:', error);
    return NextResponse.json({ message: 'Failed to update social media links', error: error.message }, { status: 500 });
  }
}
