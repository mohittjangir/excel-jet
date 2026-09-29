import { NextRequest, NextResponse } from 'next/server';
import { WMSDB } from '@/lib/wms-db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    const quantity = Number(body.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      return NextResponse.json({ error: 'Quantity must be a positive number greater than 0' }, { status: 400 });
    }

    const result = WMSDB.stockOut({
      productId: body.productId,
      quantity,
      sourceDestination: body.sourceDestination || body.customer || body.destination,
      referenceNo: body.referenceNo,
      notes: body.notes,
      user: body.user,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to process Stock Out' }, { status: 400 });
  }
}
