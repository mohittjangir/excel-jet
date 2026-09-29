import { NextRequest, NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function GET() {
  try {
    const categories = WMSDB.getCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    const userName = request.headers.get('x-user-name') || 'Admin';

    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const newCategory = WMSDB.addCategory(body, userName, userRole as any);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole === 'STAFF') {
      return NextResponse.json({ error: 'Forbidden: Admin access required to delete categories.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const success = WMSDB.deleteCategory(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete category' }, { status: 500 });
  }
}
