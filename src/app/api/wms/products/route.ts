import { NextRequest, NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const sortBy = searchParams.get('sortBy') || undefined;
    const order = (searchParams.get('order') as 'asc' | 'desc') || undefined;

    const products = WMSDB.getProducts({ search, category, status, sortBy, order });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole === 'STAFF') {
      return NextResponse.json({ error: 'Forbidden: Admin access required to create new product SKUs.' }, { status: 403 });
    }

    const body = await request.json();

    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }
    if (body.quantity === undefined || body.quantity < 0) {
      return NextResponse.json({ error: 'Valid initial quantity is required (>= 0)' }, { status: 400 });
    }

    const newProduct = WMSDB.addProduct({
      sku: body.sku || `SKU-${Date.now().toString().slice(-6)}`,
      name: body.name,
      category: body.category || 'General',
      unit: body.unit || 'Pieces',
      warehouse: body.warehouse || 'Central Metro Distribution Hub',
      quantity: Number(body.quantity),
      minStock: Number(body.minStock) || 10,
      price: Number(body.price) || 0,
      location: body.location || 'Main Storage',
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const updated = WMSDB.updateProduct(body.id, body);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole === 'STAFF') {
      return NextResponse.json({ error: 'Forbidden: Admin access required to delete inventory SKUs.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const success = WMSDB.deleteProduct(id);
    if (!success) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
