import { NextRequest, NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function GET() {
  try {
    const units = WMSDB.getUnits();
    return NextResponse.json(units);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch units' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    const userName = request.headers.get('x-user-name') || 'Admin';

    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Unit name is required' }, { status: 400 });
    }

    const newUnit = WMSDB.addUnit(body, userName, userRole as any);
    return NextResponse.json(newUnit, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create unit' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole === 'STAFF') {
      return NextResponse.json({ error: 'Forbidden: Admin access required to delete units.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const success = WMSDB.deleteUnit(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete unit' }, { status: 500 });
  }
}
