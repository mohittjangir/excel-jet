import { NextRequest, NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function GET() {
  try {
    const users = WMSDB.getUsers();
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole === 'STAFF') {
      return NextResponse.json({ error: 'Forbidden: Admin access required to create operator accounts.' }, { status: 403 });
    }

    const body = await request.json();
    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const newUser = WMSDB.addUser({
      name: body.name,
      email: body.email,
      role: body.role === 'STAFF' ? 'STAFF' : 'ADMIN',
      status: body.status === 'DISABLED' ? 'DISABLED' : 'ACTIVE',
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole === 'STAFF') {
      return NextResponse.json({ error: 'Forbidden: Admin access required to modify user roles and statuses.' }, { status: 403 });
    }

    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updated = WMSDB.updateUser(body.id, body);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update user' }, { status: 500 });
  }
}
