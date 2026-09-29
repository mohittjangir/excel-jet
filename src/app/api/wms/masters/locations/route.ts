import { NextRequest, NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function GET() {
  try {
    const locations = WMSDB.getLocations();
    return NextResponse.json(locations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    const userName = request.headers.get('x-user-name') || 'Admin';

    const body = await request.json();

    const newLocation = WMSDB.addLocation(body, userName, userRole as any);
    return NextResponse.json(newLocation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create location' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole === 'STAFF') {
      return NextResponse.json({ error: 'Forbidden: Admin access required to delete locations.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const success = WMSDB.deleteLocation(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete location' }, { status: 500 });
  }
}
