import { NextRequest, NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;

    const cartons = WMSDB.getCartons({ search });
    return NextResponse.json(cartons);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch cartons' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.productName || !body.quantity) {
      return NextResponse.json({ error: 'Product name and quantity are required' }, { status: 400 });
    }

    const newCarton = WMSDB.addCarton({
      cartonCode: body.cartonCode || `CTN-${Date.now().toString().slice(-6)}`,
      productName: body.productName,
      quantity: Number(body.quantity),
      supplier: body.supplier || 'Vendor Direct',
      status: body.status || 'In Storage',
      notes: body.notes || '',
    });

    return NextResponse.json(newCarton, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create carton' }, { status: 500 });
  }
}
